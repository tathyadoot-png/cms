import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ================= LOGIN =================
  async login(email: string, password: string) {
 const user = await this.prisma.user.findFirst({
  where: {
    email,
  },
  include: {
    roles: {
      include: {
        role: true,
      },
    },
  },
})

    if (!user) throw new UnauthorizedException('Invalid credentials')

    // 🔐 Account Lock Check
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException('Account temporarily locked')
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      // ❌ Increment failed attempts
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedAttempts: { increment: 1 },
        },
      })

      // Lock account if too many attempts
      if (user.failedAttempts + 1 >= 5) {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            lockUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 min
            failedAttempts: 0,
          },
        })
      }

      throw new UnauthorizedException('Invalid credentials')
    }

    // ✅ Reset failed attempts on success
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedAttempts: 0,
        lockUntil: null,
      },
    })

    const roles = user.roles.map((r) => r.role.name)

    const payload = {
      sub: user.id,
      email: user.email,
      roles,
    }

    // 🔑 Access Token
    const accessToken = this.jwtService.sign(payload)

    // 🔑 Refresh Token (Separate Secret)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
expiresIn: (process.env.JWT_REFRESH_EXPIRES as any) || '7d',
    })

    // 💾 Store Refresh Token in DB
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000,
        ),
      },
    })

    return { accessToken, refreshToken }
  }

  // ================= REFRESH =================
  async refreshToken(token: string) {
    if (!token) throw new UnauthorizedException()

    try {
      // Verify using refresh secret
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      })

      // Check token exists in DB
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token },
      })

      if (!storedToken) {
        throw new UnauthorizedException('Invalid refresh token')
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          roles: { include: { role: true } },
        },
      })

      if (!user) throw new UnauthorizedException()

      const roles = user.roles.map((r) => r.role.name)

      const newPayload = {
        sub: user.id,
        email: user.email,
        roles,
      }

      const accessToken = this.jwtService.sign(newPayload)

      return { accessToken }
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  // ================= LOGOUT =================
  async logout(refreshToken: string) {
    if (!refreshToken) return

    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    })

    return true
  }
}

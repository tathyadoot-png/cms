import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // 1️⃣ Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        organizationId: data.organizationId,
      },
    })

    // 2️⃣ Find role
    const role = await this.prisma.role.findUnique({
      where: { name: data.role }, // SUPER_ADMIN / ADMIN / USER
    })

    // 3️⃣ Assign role
    if (role) {
      await this.prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: role.id,
        },
      })
    }

    // 4️⃣ Return without password
    return {
      id: user.id,
      email: user.email,
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    })
  }
}

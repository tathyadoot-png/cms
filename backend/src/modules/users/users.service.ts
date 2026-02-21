import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE USER
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // 1️⃣ Find organization by shortCode
    const organization = await this.prisma.organization.findUnique({
      where: { shortCode: Number(data.shortCode) },
    })

    if (!organization) {
      throw new BadRequestException('Invalid organization short code')
    }

    // 2️⃣ Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        organizationId: organization.id,
      },
    })

    // 3️⃣ Assign multiple roles
    for (const roleName of data.roles) {
      const role = await this.prisma.role.findUnique({
        where: {
          name_organizationId: {
            name: roleName,
            organizationId: organization.id,
          },
        },
      })

      if (role) {
        await this.prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: role.id,
          },
        })
      }
    }

    return { id: user.id, email: user.email }
  }

  // ✅ UPDATE USER (Roles Edit)
  async update(id: string, data: any) {
    // 1️⃣ Remove old roles
    await this.prisma.userRole.deleteMany({
      where: { userId: id },
    })

    // 2️⃣ Find organization
    const organization = await this.prisma.organization.findUnique({
      where: { shortCode: Number(data.shortCode) },
    })

    if (!organization) {
      throw new BadRequestException('Invalid organization short code')
    }

    // 3️⃣ Reassign roles
    for (const roleName of data.roles) {
      const role = await this.prisma.role.findUnique({
        where: {
          name_organizationId: {
            name: roleName,
            organizationId: organization.id,
          },
        },
      })

      if (role) {
        await this.prisma.userRole.create({
          data: {
            userId: id,
            roleId: role.id,
          },
        })
      }
    }

    return { message: 'User updated successfully' }
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        organization: true,
        roles: {
          include: { role: true },
        },
      },
    })
  }

  async getWriters() {
    return this.prisma.user.findMany({
      where: {
        roles: {
          some: {
            role: { name: 'WRITER' },
          },
        },
      },
      select: { id: true, email: true },
    })
  }
}
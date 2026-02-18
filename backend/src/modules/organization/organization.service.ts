import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

 async create(data: any) {
  const shortCode = Math.floor(100000 + Math.random() * 900000)

  const organization = await this.prisma.organization.create({
    data: {
      name: data.name,
      shortCode,
    },
  })

  return organization
}

  async findAll() {
    return this.prisma.organization.findMany({
      include: {
        users: true,
        roles: true,
      },
    })
  }

  async update(id: string, data: any) {
    return this.prisma.organization.update({
      where: { id },
      data: {
        name: data.name,
      },
    })
  }

  async delete(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    })
  }
}

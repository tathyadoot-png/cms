import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  // CREATE ROLE
async create(data: any) {
  // 1️⃣ Find organization by shortCode
  const organization = await this.prisma.organization.findUnique({
    where: {
      shortCode: Number(data.shortCode),
    },
  })

  if (!organization) {
    throw new Error('Organization not found')
  }

  // 2️⃣ Create role using real UUID
  return this.prisma.role.create({
    data: {
      name: data.name,
      organizationId: organization.id,
    },
  })
}

  // GET ALL ROLES
  async findAll() {
    return this.prisma.role.findMany({
      include: {
        organization: true,
      },
    })
  }

  // UPDATE ROLE
  async update(id: string, data: any) {
    return this.prisma.role.update({
      where: { id },
      data: {
        name: data.name,
      },
    })
  }

  // DELETE ROLE
async remove(id: string) {
  // 1️⃣ Delete user-role mappings first
  await this.prisma.userRole.deleteMany({
    where: { roleId: id },
  })

  // 2️⃣ Then delete role
  return this.prisma.role.delete({
    where: { id },
  })
}


}

import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1️⃣ Create Organization
  const organization = await prisma.organization.create({
    data: {
      name: 'CMS',
      shortCode: 1001,
    },
  })

  // 2️⃣ Create Roles
  const superAdminRole = await prisma.role.create({
    data: {
      name: 'SUPER_ADMIN',
      organizationId: organization.id,
    },
  })

  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      organizationId: organization.id,
    },
  })

  const userRole = await prisma.role.create({
    data: {
      name: 'USER',
      organizationId: organization.id,
    },
  })

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // 4️⃣ Create Admin User
  const user = await prisma.user.create({
    data: {
      email: 'admin@cms.com',
      password: hashedPassword,
      organizationId: organization.id,
    },
  })

  // 5️⃣ Assign SUPER_ADMIN role
  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: superAdminRole.id,
    },
  })

  console.log('🔥 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    action: string
    entity: string
    entityId: string
    performedById: string
    description?: string
  }) {
    return this.prisma.auditLog.create({
      data,
    })
  }
}

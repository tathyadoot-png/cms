import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { PrismaService } from '../prisma/prisma.service'
import { AuditModule } from '../audit/audit.module'

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService],
  imports: [AuditModule],
})
export class TasksModule {}
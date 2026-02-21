import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuditService } from './audit.service'

@Controller('audit')
@UseGuards(AuthGuard('jwt'))
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('task/:taskId')
  getTaskLogs(@Param('taskId') taskId: string) {
    return this.auditService.getTaskLogs(taskId)
  }
}
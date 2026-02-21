import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  Get,
  Patch,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '@nestjs/passport'
import { TaskStatus } from '@prisma/client'

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ✅ Create Task
  @Post()
  create(@Body() body: any, @Req() req: any) {
    return this.tasksService.create(body, req.user.sub)
  }

  // ✅ Strict Workflow Status Update
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: TaskStatus },
    @Req() req: any,
  ) {
    return this.tasksService.updateStatus(
      id,
      body.status,
      req.user, // send full user (contains roles)
    )
  }

  // ✅ Get All Tasks
@Get()
findAll(@Req() req: any) {
  return this.tasksService.findAll(req.user)
}

  // ✅ Writer Dashboard
  @Get('my-dashboard')
  getMyDashboard(@Req() req: any) {
    return this.tasksService.getMyDashboard(req.user.sub)
  }
}
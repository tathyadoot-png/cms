import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CommentsService } from './comments.service'

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':taskId')
  create(
    @Param('taskId') taskId: string,
    @Body() body: { content: string },
    @Req() req: any,
  ) {
    return this.commentsService.create(
      taskId,
      body.content,
      req.user.sub,
    )
  }

  @Get(':taskId')
  getByTask(@Param('taskId') taskId: string) {
    return this.commentsService.getByTask(taskId)
  }
}
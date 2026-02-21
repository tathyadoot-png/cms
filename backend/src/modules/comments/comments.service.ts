import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(taskId: string, content: string, userId: string) {
    return this.prisma.taskComment.create({
      data: {
        content,
        taskId,
        userId,
      },
      include: {
        user: {
          select: { email: true },
        },
      },
    })
  }

  async getByTask(taskId: string) {
    return this.prisma.taskComment.findMany({
      where: { taskId },
      include: {
        user: {
          select: { email: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    })
  }
}
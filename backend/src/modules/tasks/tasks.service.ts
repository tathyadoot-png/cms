import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuditService } from '../audit/audit.service'
import { TaskStatus } from '@prisma/client'

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  // ================= CREATE TASK =================
  async create(data: any, userId: string) {
    const task = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: TaskStatus.PENDING,
        dueDate: data.dueDate,
        assignedToId: data.assignedToId,
        assignedById: userId,
      },
    })

    await this.auditService.log({
      action: 'TASK_CREATE',
      entity: 'Task',
      entityId: task.id,
      performedById: userId,
      description: `Task "${task.title}" created`,
    })

    return task
  }

  // ================= STRICT WORKFLOW =================
  async updateStatus(taskId: string, newStatus: string, user: any) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    const currentStatus = task.status
    const userRoles = user.roles || []

    // ================= WRITER RULES =================
    if (userRoles.includes('WRITER')) {
      const allowed =
        (currentStatus === 'PENDING' &&
          newStatus === 'IN_PROGRESS') ||
        (currentStatus === 'IN_PROGRESS' &&
          newStatus === 'SUBMITTED')

      if (!allowed) {
        throw new ForbiddenException(
          'Writers can only move PENDING → IN_PROGRESS → SUBMITTED',
        )
      }
    }

    // ================= EDITOR RULES =================
    else if (userRoles.includes('EDITOR')) {
      const allowed =
        currentStatus === 'SUBMITTED' &&
        (newStatus === 'REVISION_REQUESTED' ||
          newStatus === 'COMPLETED')

      if (!allowed) {
        throw new ForbiddenException(
          'Editors can only review submitted tasks',
        )
      }
    }

    // ================= SUPER ADMIN =================
    else if (userRoles.includes('SUPER_ADMIN')) {
      // Optional: Allow everything
      // Or remove this block to enforce strict workflow for everyone
    }

    else {
      throw new ForbiddenException(
        'You are not allowed to update this task',
      )
    }

    // ================= UPDATE =================
    const updatedTask = await this.prisma.task.update({
      where: { id: taskId },
      data: {
        status: newStatus as TaskStatus,
        revisionCount:
          newStatus === 'REVISION_REQUESTED'
            ? { increment: 1 }
            : task.revisionCount,
      },
    })

    // ================= AUDIT =================
    await this.auditService.log({
      action: 'STATUS_UPDATED',
      entity: 'Task',
      entityId: taskId,
      performedById: user.sub,
      description: `Status changed from ${currentStatus} to ${newStatus}`,
    })

    return updatedTask
  }

  // ================= ROLE BASED VISIBILITY =================
  async findAll(user: any) {
    const roles = user.roles || []

    if (roles.includes('SUPER_ADMIN')) {
      return this.prisma.task.findMany({
        include: {
          assignedTo: true,
          assignedBy: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    if (roles.includes('EDITOR')) {
      return this.prisma.task.findMany({
        where: {
          status: {
            in: ['SUBMITTED', 'REVISION_REQUESTED'],
          },
        },
        include: {
          assignedTo: true,
          assignedBy: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    if (roles.includes('WRITER')) {
      return this.prisma.task.findMany({
        where: {
          assignedToId: user.sub,
        },
        include: {
          assignedTo: true,
          assignedBy: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    return []
  }

  // ================= DASHBOARD =================
  async getMyDashboard(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { assignedToId: userId },
    })

    const total = tasks.length

    const completed = tasks.filter(
      t => t.status === 'COMPLETED',
    ).length

    const inProgress = tasks.filter(
      t => t.status === 'IN_PROGRESS',
    ).length

    const pending = tasks.filter(
      t => t.status === 'PENDING',
    ).length

    const revisionRequested = tasks.filter(
      t => t.status === 'REVISION_REQUESTED',
    ).length

    const overdue = tasks.filter(
      t =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== 'COMPLETED',
    ).length

    const completionRate = total
      ? Math.round((completed / total) * 100)
      : 0

    const revisionRate = total
      ? Math.round((revisionRequested / total) * 100)
      : 0

    return {
      totalTasks: total,
      completed,
      inProgress,
      pending,
      revisionRequested,
      overdue,
      completionRate,
      revisionRate,
    }
  }
}
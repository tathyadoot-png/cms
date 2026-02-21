import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RolesModule } from './modules/roles/roles.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { AuditModule } from './modules/audit/audit.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
imports: [
  PrismaModule,
  AuthModule,
  UsersModule,
  RolesModule,
  OrganizationModule,
  AuditModule,
  TasksModule,
  CommentsModule
  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

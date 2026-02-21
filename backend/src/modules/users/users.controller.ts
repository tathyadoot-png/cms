import { Controller, Get, Post, Body, Put, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() body: any) {
    return this.usersService.create(body)
  }

  @Roles('SUPER_ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body)
  }

  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get('writers')
  getWriters() {
    return this.usersService.getWriters()
  }
}
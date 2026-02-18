import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Delete ,
} from '@nestjs/common'
import { RolesService } from './roles.service'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  // CREATE ROLE
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
  @Post()
  create(@Body() body: any) {
    return this.rolesService.create(body)
  }

  // GET ROLES
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.rolesService.findAll()
  }

  // UPDATE ROLE
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.rolesService.update(id, body)
  }


  // DELETE ROLE
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('SUPER_ADMIN')
@Delete(':id')
remove(@Param('id') id: string) {
  return this.rolesService.remove(id)
}

}

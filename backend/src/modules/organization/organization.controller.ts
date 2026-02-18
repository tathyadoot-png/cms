import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'

@Controller('organizations')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
 @Post()
create(@Body() body: any) {
  return this.organizationService.create(body)
}


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get()
  findAll() {
    return this.organizationService.findAll()
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.organizationService.update(id, body)
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.delete(id)
  }
}

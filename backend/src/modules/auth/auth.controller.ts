import {
  Body,
  Controller,
  Post,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common'
import type { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ================= LOGIN =================
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      body.email,
      body.password,
    )

    const isProduction = process.env.NODE_ENV === 'production'

    // 🔐 Access Token Cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    })

    // 🔐 Refresh Token Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return { message: 'Login successful' }
  }

  // ================= ME =================
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user
  }

  // ================= REFRESH =================
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies.refreshToken

    const { accessToken } = await this.authService.refreshToken(token)

    const isProduction = process.env.NODE_ENV === 'production'

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
    })

    return { message: 'Token refreshed' }
  }

  // ================= LOGOUT =================
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = req.cookies.refreshToken

    await this.authService.logout(token)

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    return { message: 'Logged out successfully' }
  }
}

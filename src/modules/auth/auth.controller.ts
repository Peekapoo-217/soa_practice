import { Body, Controller, Get, Post, Request, RequestMapping, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('register')
  register(@Body() userData: any) {
    return this.usersService.create(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request: any) {
    return this.authService.login(request.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() request: any) {
    return request.user;
  }

}

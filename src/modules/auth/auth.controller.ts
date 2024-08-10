import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';

@Controller('auth') // 컨트롤러 생성
export class AuthController {
  // AuthService를 주입받음.
  constructor(private readonly authService: AuthService) {}

  // register 주소로 POST로 온 요청 처리
  // class-validator가 자동으로 유효성 검증
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    // authService를 사용해 user 정보 저장
    return await this.authService.register(userDto);
  }

  // Request, Response를 둘 다 사용
  @Post('login')
  async login(@Request() req, @Response() res) {
    // validateUser를 호출해 유저 정보 획득
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    // 유저 정보가 있으면 쿠키 정보를 Response에 저장
    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7day 단위는 밀리초
      });
    }
    return res.send({ message: 'login success' });
  }
}

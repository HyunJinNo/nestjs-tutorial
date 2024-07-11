import { Body, Controller, Post } from '@nestjs/common';
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
}

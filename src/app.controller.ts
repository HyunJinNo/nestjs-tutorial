import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller() // 컨트롤러 데코레이터
export class AppController {
  // 외부에서 사용하므로 export를 붙임.

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get() // GET 요청 처리 데코레이터
  getHello(): string {
    const message = this.configService.get('MESSAGE'); // configService.get() 호출
    return `${message}. ${this.appService.getHello()}`;
  }
}

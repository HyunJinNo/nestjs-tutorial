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

  @Get('service-url') // http://localhost:3000/service-url의 경로 진입 시 실행
  getServiceUrl(): string {
    return this.configService.get('SERVICE_URL'); // SERVICE_URL 환경 변수 반환
  }

  @Get('db-info') // 라우팅 정보
  getTest(): string {
    console.log(this.configService.get('logLevel')); // logLevel 터미널에 출력
    console.log(this.configService.get('apiVersion')); // apiVersion 터미널에 출력
    return this.configService.get('dbInfo'); // 웹 브라우저에 dbInfo 표시
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL'); // 확장 변숫값 읽기
  }
}

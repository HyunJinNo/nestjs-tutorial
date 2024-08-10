import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

// Nest.js를 실행시키는 함수
// Nest.js에서는 진입점을 bootstrap()으로 이름 짓는 것이 관례이다.
async function bootstrap() {
  // NestFactory를 사용해서 NestApplication 객체 생성
  const app = await NestFactory.create(AppModule);

  // 전역 파이프에 validationPipe 객체 추가
  app.useGlobalPipes(new ValidationPipe());

  // ConfigService를 app.get()에 추가
  const configService = app.get(ConfigService);

  // cookie-parser 설정
  app.use(cookieParser());

  // 3000번 포트로 서버 기동
  await app.listen(configService.get('SERVER_PORT'));
}

bootstrap();

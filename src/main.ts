import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// NestJS를 실행시키는 함수
// NestJS에서는 진입점을 bootstrap()으로 이름 짓는 것이 관례이다.
async function bootstrap() {
  // NestFactory를 사용해서 NestApplication 객체 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 전역 파이프에 validationPipe 객체 추가
  app.useGlobalPipes(new ValidationPipe());

  // ConfigService를 app.get()에 추가
  const configService = app.get(ConfigService);

  // cookie-parser 설정
  app.use(cookieParser());

  // 세션 사용
  app.use(
    session({
      secret: 'very-important-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션을 항상 저장할 지 여부
      saveUninitialized: false, // 세션이 저장되기 전에는 초기화되지 않은 상태로 세션을 미리 만들어 저장
      cookie: { maxAge: 1000 * 60 * 60, httpOnly: true }, // 쿠키 유효기간: 1시간
    }),
  );

  // passport 초기화 및 세션 저장소 초기화
  app.use(passport.initialize());
  app.use(passport.session());

  // 정적 파일 경로 지정
  app.useStaticAssets(join(__dirname, '..', 'static'));

  // 3000번 포트로 서버 기동
  await app.listen(configService.get('SERVER_PORT'));
}

bootstrap();

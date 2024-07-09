import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Nest.js를 실행시키는 함수
// Nest.js에서는 진입점을 bootstrap()으로 이름 짓는 것이 관례이다.
async function bootstrap() {
  // NestFactory를 사용해서 NestApplication 객체 생성
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // ConfigService를 app.get()에 추가

  // 3000번 포트로 서버 기동
  await app.listen(configService.get('SERVER_PORT'));
}

bootstrap();

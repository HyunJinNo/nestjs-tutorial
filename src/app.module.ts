import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';
import config from './configs/config';

console.log(`env: ${process.env.NODE_ENV}`); // 기동 시 환경 변수 출력

// 모듈 데코레이터
@Module({
  // ConfigModule 설정
  // 1. 전역 모듈 설정 추가
  // 2. 환경 변수 파일 경로 저장
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config], // 커스텀 설정 파일 설정
      cache: true, // 캐시하기, ConfigService의 get() 함수를 사용할 때 캐시에서 먼저 불러오게 되므로 성능상의 이점이 있음.
      expandVariables: true, // 확장 변수 옵션 추가
    }),
    BlogModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

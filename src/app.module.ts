import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './modules/weather/weather.module';
import config from './configs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway, RoomGateway } from './app.gateway';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
      logging: true,
      dropSchema: false,
    }),
    ServeStaticModule.forRoot({
      // 초기화 함수 실행
      rootPath: join(__dirname, '..', 'uploads'), // 실제 파일이 있는 디렉토리 경로
      serveRoot: '/uploads', // url 뒤에 붙을 경로를 지정
    }),
    BlogModule,
    WeatherModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RoomGateway],
})
export class AppModule {}

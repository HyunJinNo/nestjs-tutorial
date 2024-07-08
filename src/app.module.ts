import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';
import { ConfigModule } from '@nestjs/config';

// 모듈 데코레이터
@Module({
  // ConfigModule 설정
  // 전역 모듈 설정 추가
  imports: [ConfigModule.forRoot({ isGlobal: true }), BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user') // 컨트롤러 설정 데코레이터
export class UserController {
  constructor(private readonly userService: UserService) {} // 유저 서비스 주입

  // 유저 생성
  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  // 모든 유저 찾기
  @Get('/getUsers')
  async getUsers() {
    const users = await this.userService.getUsers();
    console.log(users);
    return users;
  }

  // 한 명의 유저 찾기
  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  }

  // 유저 정보 업데이트
  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    console.log(user);
    return this.userService.updateUser(email, user);
  }

  // 유저 삭제
  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}

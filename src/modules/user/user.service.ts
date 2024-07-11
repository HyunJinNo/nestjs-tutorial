import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Repository 주입 데코레이저
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm'; // Repository 임포트
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable() // 의존성 주입을 위한 데코레이터
export class UserService {
  // Repository 주입
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 유저 생성
  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  // 모든 유저 정보 찾기
  getUsers() {
    return this.userRepository.find();
  }

  // 한 명의 유저 정보 찾기
  async getUser(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
    });

    return result;
  }

  // 유저 정보 업데이트.
  // username과 password만 변경
  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // 유저 정보 삭제
  deleteUser(email: string) {
    return this.userRepository.delete({ email: email });
  }
}

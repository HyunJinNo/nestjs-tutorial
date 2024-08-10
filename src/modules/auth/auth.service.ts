import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable() // 프로바이더로 사용
export class AuthService {
  // 생성자에서 UserService를 주입받음.
  constructor(private readonly userSerice: UserService) {}

  // 메서드 내부에서 await 구문이 있으므로 async 필요함.
  async register(userDto: CreateUserDto) {
    // 이미 가입된 유저가 있는지 체크
    const user = await this.userSerice.getUser(userDto.email);
    if (user) {
      // 이미 가입된 유저가 있다면 에러 발생
      throw new HttpException(
        '해당 유저가 이미 있습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 비밀번호 암호화
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    // 데이터베이스에 저장.
    // 저장 중 에러가 나면 서버 에러 발생
    try {
      const user = await this.userSerice.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      // 회원가입 후 반환하는 값에는 password를 주지 않음.
      user.password = undefined;
      return user;
    } catch (e) {
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(email: string, password: string) {
    // 이메일로 유저 정보를 가져옵니다.
    const user = await this.userSerice.getUser(email);

    // 유저가 없으면 검증 실패
    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;

    // 패스워드를 따로 뽑아냅니다.
    if (bcrypt.compareSync(password, hashedPassword)) {
      // 패스워드가 일치하면 성공
      return userInfo;
    }
    return null;
  }
}

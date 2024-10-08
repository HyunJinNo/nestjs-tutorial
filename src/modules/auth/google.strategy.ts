import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserService } from '../user/user.service';
import { User } from 'src/entities/user.entity';

// PassportStrategy(Strategy) 상속
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID, // 클라이언트 ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // 시크릿
      callbackURL: 'http://localhost:3000/auth/google', // 콜백 URL
      scope: ['email', 'profile'], // scope
    });
  }

  // OAuth 인증이 끝나고 콜백으로 실행되는 메서드
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log(accessToken);
    console.log(refreshToken);

    const providerId = id;
    const email = emails[0].value;

    // 유저 정보 저장 또는 가져오기
    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name.givenName,
      providerId,
    );

    // 유저 정보 반환
    return user;
  }
}

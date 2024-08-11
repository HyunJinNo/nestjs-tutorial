import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

// Injectable이 있으니 프로바이더
// CanActivate 인터페이스 구현
@Injectable()
export class LoginGuard implements CanActivate {
  // authService를 주입받음
  constructor(private authService: AuthService) {}

  // CanActivate 인터페이스의 메서드
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // context에서 request 정보를 가져옴.
    const request = context.switchToHttp().getRequest();

    // 쿠키가 있으면 인증된 것
    if (request.cookies['login']) {
      return true;
    }

    // 쿠키가 없으면 request의 body 정보 확인
    if (!request.body.email || !request.body.password) {
      return false;
    }

    // 인증 로직은 기존의 authService.validateUser 사용
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    // 유저 정보가 없으면 false 반환
    if (!user) {
      return false;
    }

    // 유저 정보가 있으면 request에 user 정보를 추가하고 true 반환
    request.user = user;
    return true;
  }
}

// AuthGuard 상속
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    // 로컬 스트래티지 실행
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // 세션 저장
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated(); // 세션에서 정보를 읽어서 인증 확인
  }
}

// google 스트래티지 사용
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 부모 클래스의 메서드 사용
    const result = (await super.canActivate(context)) as boolean;

    // context에서 request 객체를 가져온다.
    //const request = context.switchToHttp().getRequest();

    return result;
  }
}

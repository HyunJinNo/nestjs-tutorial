import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// 웹소켓 서버 설정 데코레이터
@WebSocketGateway({ namespace: 'chat' }) // 네임스페이스 추가
export class ChatGateway {
  @WebSocketServer() server: Server; // 웹소켓 서버 인스턴스 선언

  @SubscribeMessage('message') // message 이벤트 구독
  handleMessage(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    const { message, nickname } = data; // 메세지와 닉네임을 데이터에서 추출

    // 접속한 모든 클라이언트들에게 메세지 전송
    // this.server.emit('message', `client-${socket.id.substring(0, 4)}: ${data}`);

    // 닉네임을 포함한 메세지 전송
    socket.broadcast.emit('message', `${nickname}: ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' }) // room 네임스페이스를 사용하는 게이트웨이
export class RoomGateway {
  // 채팅 게이트웨이 의존성 주입
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];

  // 서버 인스턴스 접근을 위한 변수 선언
  @WebSocketServer() server: Server;

  @SubscribeMessage('createRoom') // createRoom 핸들러 메서드
  handleMessage(@MessageBody() data: any) {
    // 소켓없이 데이터만 받음.
    const { room, nickname } = data;

    // 방 생성 시 이벤트를 발생시켜 클라이언트에 송신
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다.`,
    });

    this.rooms.push(room); // 채팅방 정보를 받아서 추가
    this.server.emit('rooms', this.rooms); // rooms 이벤트로 채팅방 리스트 전송
  }

  @SubscribeMessage('joinRoom') // 방 입장 시 실행되는 핸들러 메서드
  handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: any) {
    const { room, nickname, toLeaveRoom } = data;
    socket.leave(toLeaveRoom); // 기존의 방에서 먼저 나간다.
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다.`,
    });
    socket.join(room); // 새로운 방에 입장합니다.
  }
}

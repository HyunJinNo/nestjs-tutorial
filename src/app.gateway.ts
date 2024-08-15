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

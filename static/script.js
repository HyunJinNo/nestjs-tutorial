// socket.io 인스턴스 생성
const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const nickname = prompt('닉네임을 입력해 주세요.'); // 닉네임 입력받기

// [전송] 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendMessage() {
  const message = $('#message').val();
  $('#chat').append(`<div>나: ${message}</div>`); // 내가 보낸 메세지 바로 추가
  socket.emit('message', { message, nickname }); // 메세지를 보낼 때 닉네임을 같이 전송
}

// 서버 접속을 확인을 위한 이벤트
socket.on('content', () => {
  console.log('connected');
});

// 서버에서 message 이벤트 발생 시 처리
socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

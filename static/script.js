// socket.io 인스턴스 생성
const socket = io('http://localhost:3000/chat'); // 네임스페이스 추가
const roomSocket = io('http://localhost:3000/room'); // 채팅방용 네임스페이스 생성
const nickname = prompt('닉네임을 입력해 주세요.'); // 닉네임 입력받기
let currentRoom = ''; // 채팅방 초깃값

// [전송] 버튼 클릭 시 입력된 글을 message 이벤트로 보냄
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sendMessage() {
  // 선택된 방이 없는 경우 에러
  if (currentRoom === '') {
    alert('방을 선택해 주세요.');
    return;
  }

  const message = $('#message').val();
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나: ${message}</div>`); // 내가 보낸 메세지 바로 추가
  // socket.emit('message', { message, nickname }); // 메세지를 보낼 때 닉네임을 같이 전송
  roomSocket.emit('message', data);
  return false;
}

// [방 만들기] 버튼 클릭 시 실행하는 함수
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해 주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

// 방에 들어갈 때 기존에 있던 방에서는 나가기
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function joinRoom(room) {
  // 서버 측의 joinRoom 이벤트를 발생시킴
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html(''); // 채팅방 이동 시 기존 메세지 삭제
  currentRoom = room; // 현재 들어 있는 방의 값을 변경
}

// 채팅방 내에서 대화를 나눌 때 사용하는 이벤트
roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
});

// 클라이언트 측에서 채팅방을 추가하는 함수
roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty(); // 채팅방 갱신 시 일단 리스트를 비움.
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onClick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

// 서버 접속을 확인을 위한 이벤트
socket.on('connect', () => {
  console.log('connected');
});

// 서버에서 message 이벤트 발생 시 처리
socket.on('message', (message) => {
  $('#chat').append(`<div>${message}</div>`);
});

// notice 이벤트를 받아서 처리
socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

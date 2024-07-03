// 게시글의 타입을 인터페이스로 정의
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date; // 수정 일시는 필수가 아님.
}

import { Injectable } from '@nestjs/common';
import { PostDto } from './dtos/blog.dto';

@Injectable()
export class BlogService {
  posts: PostDto[] = []; // 게시글 배열 선언

  // 모든 게시글 가져오기
  getAllPosts() {
    return this.posts;
  }

  // 게시글 작성
  createPost(postDto: PostDto) {
    const id = this.posts.length + 1;
    this.posts.push({
      id: id.toString(),
      ...postDto,
      createdAt: new Date(),
    });
  }

  // 게시글 하나 가져오기
  getPost(id: string) {
    const post = this.posts.find((post) => post.id === id);
    console.log(post);
    return post;
  }

  // 게시글 삭제
  delete(id: string) {
    const filteredPosts = this.posts.filter((post) => post.id !== id);
    this.posts = [...filteredPosts];
  }

  // 게시글 업데이트
  updatePost(id: string, postDto: PostDto) {
    const updateIdx = this.posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedAt: new Date() };
    this.posts[updateIdx] = updatePost;
    return updatePost;
  }
}

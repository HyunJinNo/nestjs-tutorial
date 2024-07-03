import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostDto } from './dtos/blog.dto';

@Controller('blog') // 클래스에 붙이는 Controller 데코레이터
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get() // GET 요청 처리하기
  getAllPost() {
    console.log('모든 게시글 가져오기');
    return this.blogService.getAllPosts();
  }

  @Post() // POST 요청 처리하기
  createPost(@Body() postDto: PostDto) {
    // HTTP 요청의 body 내용을 post에 할당
    console.log('게시글 작성');
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id') // GET 요청에 URL 매개변수에 id가 있는 요청 처리
  getPost(@Param('id') id: string) {
    console.log('게시글 하나 가져오기');
    return this.blogService.getPost(id);
  }

  @Delete('/:id') // DELETE 방식에 URL 매개변수로 id가 있는 요청 처리
  deletePost(@Param('id') id: string) {
    console.log('게시글 삭제');
    this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id') // PUT 방식에 URL 매개변수로 전달된 id가 있는 요청 처리
  updatePost(@Param('id') id: string, @Body() postDto: PostDto) {
    console.log('게시글 업데이트', id, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}

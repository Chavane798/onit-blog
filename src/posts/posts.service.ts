import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto, authorId: number): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: authorId,
    });
    return await this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ 
      where: { id }, 
      relations: ['author'] 
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    await this.postsRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async findByAuthor(authorId: number): Promise<Post[]> {
    return await this.postsRepository.find({
      where: { authorId },
      relations: ['author'],
      order: { createdAt: 'DESC' }
    });
  }
}
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) { }

  async create(CreateDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(CreatePostDto);
    return this.postsRepository.save(post);
  }

  async findAll(): promise<post> {
    return await this.postsRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): promise<Post> {
    return await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async update(id: number, updatePostDto: UpdatePostDto): promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async remove(id: number): promise< void> {
      await this.postsRepository.delete(id);
    }
  }

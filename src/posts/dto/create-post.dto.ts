import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    @MinLength(3, { message: 'Title must be at least 3 characters' })
    @MaxLength(200, { message: 'Title must not exceed 200 characters' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Content is required' })
    @MinLength(10, { message: 'Content must be at least 10 characters' })
    content: string;
}
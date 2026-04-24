import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async create(userData: Partial<User>):Promise<User>{
        const hashePassword = await bcrypt.hash(userData.password, 10);
        const user = this.usersRepository.create({
            ..userData,
            password: hashePassword
        });
        return await this.usersRepository.save(user);
    }

    async findAll(): Promise<User[]>{
        return await this.usersRepository.find()
    }

    async findOne(id: number): Promise<User>{
        return await this.usersRepository.findOne({where: {id}});
    }

    async finfByEmail(email: string): Promise<User>{
        return await this.usersRepository.findOne({where: {email}});
    }

    async update(id: number, updateData: Partial<User>): Promise<User>{
        if(userData.password){
            userData.password = await bcrypt.hash(userData.password, 10);
        }
        await this.usersRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void>{
        await this.usersRepository.delete(id);
    }
}



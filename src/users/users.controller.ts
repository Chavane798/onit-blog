import { Controller, Delete, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly userSevice: UsersService) { }

    @Post()
    create(@Body() userData: Partial<User>) {
        return this.userSevice.create(userData);
    }

    @Get()
    findAll() {
        return this.userSevice.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userSevice.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: Partial<User>) {
        return this.userSevice.update(+id, userData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userSevice.remove(+id);
        
    }
}

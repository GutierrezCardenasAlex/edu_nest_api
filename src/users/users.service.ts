import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {

  constructor(

     @InjectRepository(User) // Assuming User is the entity you are working with
     private readonly userRepository: Repository<User>,

  ) {}

  create(createUserDto: RegisterDto) {
    return this.userRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'], // ← ASEGÚRATE DE INCLUIR password
    });
  }


  findOneByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password','role'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

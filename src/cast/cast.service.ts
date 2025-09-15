import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from './entities/cast.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class CastService {

  constructor(

    @InjectRepository(Cast)
    private readonly castRepository: Repository<Cast>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  //api create 
  async create(createCastDto: CreateCastDto, user: UserActiveInterface) {
    const breed = await this.validateBreed(createCastDto.breed);

    return await this.castRepository.save({
      ...createCastDto,
      breed: breed,
      userEmail: user.email,
    });

  }

  async findAll( user: UserActiveInterface) {
    if(user.role === Role.ADMIN) {
      return await this.castRepository.find();
    }
    return await this.castRepository.find({
      where: {
        userEmail: user.email
      }
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.castRepository.findOneBy({ id });
    if(!cat) {
      throw new BadRequestException(`Cast not found`);
    }
    //if(user.role !== Role.ADMIN && cat.userEmail !== user.email ) {
    //  throw new UnauthorizedException(`You do not have permission to access this cast`);
    //}

    this.validateOwnership(cat, user);
    return cat;
  }

  async update(id: number, updateCastDto: UpdateCastDto, user: UserActiveInterface) {
    
    await this.findOne(id,user);
    return await this.castRepository.update(id, {
      ...updateCastDto,
      breed: updateCastDto.breed ? await this.validateBreed(updateCastDto.breed) : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id,user);
    return await this.castRepository.softDelete(id); //eliminaciones logicas // se le pasa el id
    //return await this.castRepository.softRemove({id}); //se le pasa la instancia
  }

  private validateOwnership(cast: Cast, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cast.userEmail !== user.email) {
      throw new UnauthorizedException(`You do not have permission to access this cast`);
    }
  }
  private async validateBreed(breed?: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });
    if (!breedEntity) {
      throw new BadRequestException(`Breed ${breed} not found`);
    }
    return breedEntity;
  }

}

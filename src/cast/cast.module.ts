import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cast } from './entities/cast.entity';
import { Breed } from 'src/breeds/entities/breed.entity';
import { BreedsModule } from 'src/breeds/breeds.module';
import { BreedsService } from 'src/breeds/breeds.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cast]),BreedsModule,AuthModule],
  controllers: [CastController],
  providers: [CastService, BreedsService],
})
export class CastModule {}

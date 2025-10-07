import { Module } from '@nestjs/common';
import { CastModule } from './cast/cast.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CursosModule } from './Modul_cursos/cursos/cursos.module';
import { CategoriasModule } from './Modul_cursos/categorias/categorias.module';
import { TemariosModule } from './Modul_cursos/temarios/temarios.module';
import { LeccionesModule } from './Modul_cursos/lecciones/lecciones.module';
import { InscripcionesModule } from './Modul_cursos/inscripciones/inscripciones.module';
import { ProgresoLeccionesModule } from './Modul_cursos/progreso-lecciones/progreso-lecciones.module';
import { CertificadosModule } from './Modul_cursos/certificados/certificados.module';


@Module({
  imports: [
    CastModule,
    BreedsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : null,
      },
    }),
    UsersModule,
    AuthModule,
    CursosModule,
    CategoriasModule,
    TemariosModule,
    LeccionesModule,
    InscripcionesModule,
    ProgresoLeccionesModule,
    CertificadosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

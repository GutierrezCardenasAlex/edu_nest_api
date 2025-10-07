import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, } from 'typeorm';
import { Temario } from '../../temarios/entities/temario.entity';
import { OneToMany } from 'typeorm';

export enum TipoLeccion {
    VIDEO = 'video',
    DOCUMENTO = 'documento',
    ENLACE = 'enlace',
    QUIZ = 'quiz',
}

@Entity('lecciones')
export class Leccion {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => Temario, (temario) => temario.lecciones, { onDelete: 'CASCADE' })
    temario: Temario;

    @Column({ type: 'varchar', length: 255 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'enum', enum: TipoLeccion,
        default: TipoLeccion.VIDEO })
    tipo: TipoLeccion;

    @Column({ type: 'varchar', length: 500, nullable: true })
    urlRecurso?: string;

    @Column({type: 'varchar', length: 255, nullable: true})
    archivo?: string;

    @Column({ type: 'int', default: 0 })
    duracion: number;

    @Column({ type: 'int', default: 0 })
    orden: number;

    @CreateDateColumn({ name: 'create_at' })
    createAt: Date;

}
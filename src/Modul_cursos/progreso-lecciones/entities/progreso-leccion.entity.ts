import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, CreateDateColumn,} from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';
import { Leccion } from '../../lecciones/entities/leccion.entity';

@Entity('progreso_lecciones')
@Unique(['inscripcion', 'leccion'])
export class ProgresoLeccion {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.id, { onDelete: 'CASCADE' })
    inscripcion: Inscripcion;

    @ManyToOne(() => Leccion, (leccion) => leccion.id, { onDelete: 'CASCADE' })
    leccion: Leccion;

    @Column({ type: 'boolean', default: false })
    completado: boolean;

    @CreateDateColumn({ name: 'fecha_completado', nullable: true })
    fechaCompletado: Date; 
}   
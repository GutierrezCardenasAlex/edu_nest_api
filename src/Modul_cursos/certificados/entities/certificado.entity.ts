import { Entity, PrimaryGeneratedColumn, Column, 
    CreateDateColumn, ManyToOne, JoinColumn, Unique, } from 'typeorm';
import { Inscripcion } from '../../inscripciones/entities/inscripcion.entity';

@Entity('certificados')
@Unique(['codigo_certificado'])
export class Certificado {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.certificados, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'inscripcion_id' })
    inscripcion: Inscripcion;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
    codigo_certificado: string;

    @CreateDateColumn({ name: 'timestamp'})
    fecha_emision: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    url_pdf: string;
}
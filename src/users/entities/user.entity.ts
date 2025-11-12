//import { Appointment } from "src/appointments/entities/appointment.entity";
import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "../../Modul_cursos/inscripciones/entities/inscripcion.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role; // ← ¡Importante! Tipo correcto

   // @OneToMany(()=>Appointment,(appointement)=>appointement.user)
    //appointments:Appointment[];
    
    @DeleteDateColumn()
    deletedAt: Date;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.usuario)
  inscripciones: Inscripcion[];
}

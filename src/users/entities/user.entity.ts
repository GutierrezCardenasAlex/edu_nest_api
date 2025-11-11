//import { Appointment } from "src/appointments/entities/appointment.entity";
import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inscripcion } from "../../Modul_cursos/inscripciones/entities/inscripcion.entity";

@Entity()
export class User {

    //@Column({primary: true, generated: true})
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column({unique: true, nullable: false})
    email: string;
    
    @Column({nullable: false, select: false})
    password: string;
    
    @Column({type:'enum',default: Role.USER, enum: Role})
    role: string;

   // @OneToMany(()=>Appointment,(appointement)=>appointement.user)
    //appointments:Appointment[];
    
    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.usuario)
    inscripciones: Inscripcion[];
    
}

import { Cast } from "src/cast/entities/cast.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({length: 500})
    name: string;

    @OneToMany(() => Cast, (cast) => cast.breed)
    casts: Cast[];
}

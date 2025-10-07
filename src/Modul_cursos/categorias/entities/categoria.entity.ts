
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'bigint', nullable: true })
  parent_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // Relación subcategorías
  @ManyToOne(() => Categoria, (categoria) => categoria.subcategorias, { nullable: true })
  parent: Categoria;

  @OneToMany(() => Categoria, (categoria) => categoria.parent)
  subcategorias: Categoria[];
}

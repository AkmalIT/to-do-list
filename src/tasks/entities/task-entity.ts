import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: "tasks"})
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  compleated: string;
}

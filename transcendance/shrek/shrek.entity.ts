import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShrekEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  victory: number;

  @Column({ default: true })
  defeat: number;

  @Column({ default: true })
  ratio: number;

  @Column({ default: true })
  accessCode: string;
}

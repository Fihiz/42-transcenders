import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

export enum role {
  "Owner",
  "Admin",
  "User"
};

@Entity('t_webapp_user')
export class WebAppUser {
  @PrimaryColumn({
    type: 'varchar',
  })
  login: string;

  @Column({
    type: "varchar",
  })
  pseudo: string;

  @Column({
    type: "bytea",
  })
  avatar: string;

  @Column({
    type: "varchar",
  })
  status: string;

  @Column({
    type: "varchar",
  })
  bio: string;

  @Column({
    type: "boolean",
  })
  pending_queue: boolean;

  @Column({
    type: "boolean",
  })
  banned: boolean;

  @Column({
    type: "int",
  })
  admonishement: number;

  @Column({
    type: "varchar",
  })
  app_role: role;

  @Column({
    type: "timestamp",
  })
  created: Date;

  @Column({
    type: "timestamp",
  })
  updated: Date;
  
}

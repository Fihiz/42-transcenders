import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum role {
  "Owner",
  "Admin",
  "User"
};

@Entity('t_webapp_user_data')
export class WebAppUserEntity {

  @PrimaryColumn({
    type: 'varchar'
  })
  login: string;

  @Column({
    type: "varchar"
  })
  pseudo: string;

  @Column({
    type: "bytea",
    nullable: true // Temporaire le temps de créer les images
  })
  avatar: string;

  @Column({
    type: "varchar",
    default: "offline"
  })
  status: string;

  @Column({
    type: "varchar"
  })
  bio: string;

  @Column({
    type: "boolean",
    default: false
  })
  pending_queue: boolean;

  @Column({
    type: "boolean",
    default: false
  })
  banned: boolean;

  @Column({
    type: "int",
    default: 0
  })
  admonishement: number;

  @Column({
    type: "varchar",
    default: "User"
  })
  app_role: role;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  created: Date;

  @Column({
    type: "timestamp",
    default: new Date()
  })
  updated: Date;
  
}

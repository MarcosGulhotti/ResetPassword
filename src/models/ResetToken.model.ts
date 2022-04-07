import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tokens")
class ResetToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  token!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

export { ResetToken };

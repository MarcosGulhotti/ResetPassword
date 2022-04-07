import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.model";

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

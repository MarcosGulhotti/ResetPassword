import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}

export { User };

import { Column, Entity } from 'typeorm';

@Entity({ name: 'Users' })
export class User {
  @Column({ name: 'User_no', primary: true })
  userNumber: number;

  @Column({ name: 'user_pwd' })
  password: string;

  @Column({ name: 'Sellerno' })
  driverNumber: number;
}

export type UserWithoutPassword = Omit<User, 'password'>;

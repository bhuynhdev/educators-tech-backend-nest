import { User } from 'modules/user';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'notes',
})
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  markdown: string;

  @ManyToOne(() => User, (user) => user.notes)
  owner: User;
}

export class NoteFillableFields {
  owner: number;
  markdown: string;
}

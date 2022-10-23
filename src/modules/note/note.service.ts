import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UsersService } from '../user';
import { Repository } from 'typeorm';

import { Note, NoteFillableFields } from './note.entity';
import { NoteUpdatePayload } from './note.payload';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly usersService: UsersService,
  ) {}

  async get(id: number) {
    return this.noteRepository.findOne({ id });
  }

  async getAll(ownerId: number) {
    const user = await this.usersService.get(ownerId);
    if (!user) {
      return [];
    }
    return await this.noteRepository.find({ owner: user });
  }

  async create(payload: NoteFillableFields) {
    const user = await this.usersService.get(payload.owner);

    if (!user) {
      throw new NotAcceptableException('Wrong user id data');
    }

    return await this.noteRepository.save({ ...payload, owner: user });
  }

  async update(payload: NoteUpdatePayload) {
    const note = await this.noteRepository.findOne({ id: payload.id });

    if (!note) {
      throw new NotAcceptableException('Wrong note id data');
    }

    return await this.noteRepository.save({
      ...note,
      markdown: payload.markdown,
      title: payload.title,
    });
  }
}

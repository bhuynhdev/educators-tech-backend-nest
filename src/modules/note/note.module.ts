import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserModule } from 'modules/user';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NotesService } from './note.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [NotesService],
  controllers: [NoteController],
  providers: [NotesService],
})
export class NoteModule {}

import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  NotesService,
  NoteCreatePayload,
  NoteGetAllPayload,
  NoteGetSinglePayload,
  NoteUpdatePayload,
} from './';
import { User, UsersService } from './../user';

@Controller('api/note')
@ApiTags('notes')
export class NoteController {
  constructor(private readonly noteService: NotesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post('')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() payload: NoteCreatePayload): Promise<any> {
    const createdNote = await this.noteService.create(payload);
    return createdNote;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put('')
  @ApiResponse({ status: 201, description: 'Successful Update' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(@Body() payload: NoteUpdatePayload): Promise<any> {
    const updatedNote = await this.noteService.update(payload);
    return updatedNote;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getSingle(@Body() payload: NoteGetSinglePayload): Promise<any> {
    const note = await this.noteService.get(payload.id);
    return note;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get('/all')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAll(@Body() payload: NoteGetAllPayload): Promise<any> {
    const note = await this.noteService.get(payload.owner);
    return note;
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  @Get('all')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAll(@Req() req): Promise<any> {
    const notes = await this.noteService.getAll(req.user.id);
    return notes;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getSingle(@Param() params): Promise<any> {
    const note = await this.noteService.get(params.id);
    return note;
  }
}

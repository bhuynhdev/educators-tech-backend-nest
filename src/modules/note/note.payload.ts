import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NoteCreatePayload {
  @ApiProperty({
    required: true,
  })
  markdown: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  owner: number;
}

export class NoteGetSinglePayload {
  @ApiProperty({
    required: true,
  })
  id: number;
}

export class NoteGetAllPayload {
  @ApiProperty({
    required: true,
  })
  owner: number;
}

export class NoteUpdatePayload {
  @ApiProperty({
    required: true,
  })
  markdown: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  id: number;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkLogDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsNumber()
  durations: number;
}

import { IsOptional, IsIn, IsString } from 'class-validator';

export class SortingDto {
  @IsOptional()
  @IsString()
  @IsIn(['name', 'type', 'created_at'])
  sortBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sortDirection?: 'asc' | 'desc' = 'asc';
}
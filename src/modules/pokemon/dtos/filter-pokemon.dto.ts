import { IsOptional, IsString } from 'class-validator';
import { IPokemonFilter } from '../interfaces/pokemon-filter.interface';

export class FilterPokemonDto implements IPokemonFilter {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
import { Pokemon } from '@prisma/client';
import { IPokemonFilter } from '../interfaces/pokemon-filter.interface';
import {
  IPaginationOptions,
  IPaginationResult,
} from '../../../common/interfaces/pagination.interface';
import { SortingDto } from 'src/common/dtos/sorting.dto';

export interface IPokemonRepository {
  create(data: { name: string; type: string }): Promise<Pokemon>;
  findAll(
    filter?: IPokemonFilter,
    pagination?: IPaginationOptions,
    sorting?: SortingDto
  ): Promise<IPaginationResult<Pokemon>>;
  findOne(id: number): Promise<Pokemon | null>;
  update(id: number, data: { name?: string; type?: string }): Promise<Pokemon>;
  remove(id: number): Promise<Pokemon>;
}

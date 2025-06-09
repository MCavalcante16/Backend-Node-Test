import { Pokemon } from '@prisma/client';
import { IPokemonFilter } from '../filters/pokemon-filter.interface';

export interface IPokemonRepository {
  create(data: { name: string; type: string }): Promise<Pokemon>;
  findAll(filter?: IPokemonFilter): Promise<Pokemon[]>;
  findOne(id: number): Promise<Pokemon | null>;
  update(id: number, data: { name?: string; type?: string }): Promise<Pokemon>;
  remove(id: number): Promise<Pokemon>;
}

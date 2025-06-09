import { Pokemon } from '@prisma/client';

export interface IPokemonRepository {
  create(data: { name: string; type: string }): Promise<Pokemon>;
  findAll(): Promise<Pokemon[]>;
  findOne(id: number): Promise<Pokemon | null>;
  update(id: number, data: { name?: string; type?: string }): Promise<Pokemon>;
  remove(id: number): Promise<Pokemon>;
}
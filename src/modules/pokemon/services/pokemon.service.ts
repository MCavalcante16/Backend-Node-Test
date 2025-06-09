import { Inject, Injectable } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { IPokemonRepository } from '../repository/pokemon.repository';
import { IPokemonFilter } from '../filters/pokemon-filter.interface';

@Injectable()
export class PokemonService {
  constructor(
    @Inject('IPokemonRepository')
    private pokemonRepository: IPokemonRepository,
  ) {}

  async create(data: { name: string; type: string }): Promise<Pokemon> {
    return this.pokemonRepository.create(data);
  }

  async findAll(filter: IPokemonFilter): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll(filter);
  }

  async findOne(id: number): Promise<Pokemon | null> {
    return this.pokemonRepository.findOne(id);
  }

  async update(
    id: number,
    data: { name?: string; type?: string },
  ): Promise<Pokemon> {
    return this.pokemonRepository.update(id, data);
  }

  async remove(id: number): Promise<Pokemon> {
    return this.pokemonRepository.remove(id);
  }
}

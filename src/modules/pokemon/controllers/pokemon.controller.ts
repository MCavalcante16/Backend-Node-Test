import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { Pokemon as PokemonModel } from '@prisma/client';
import { PokemonService } from '../services/pokemon.service';
import { UpdateOnePokemonDTO } from '../dto/UpdateOnePokemonDTO';
import { FilterPokemonDto } from '../dto/filter-pokemon.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(
    @Body() pokemonData: { name: string; type: string },
  ): Promise<PokemonModel> {
    return this.pokemonService.create(pokemonData);
  }

  @Get()
  async findAll(@Query() filter: FilterPokemonDto): Promise<PokemonModel[]> {
    return this.pokemonService.findAll(filter);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() pokemonData: UpdateOnePokemonDTO,
  ): Promise<PokemonModel> {
    return this.pokemonService.update(Number(id), pokemonData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PokemonModel> {
    return this.pokemonService.remove(Number(id));
  }
}

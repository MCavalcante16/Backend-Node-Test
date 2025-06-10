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
import { Pokemon, Pokemon as PokemonModel } from '@prisma/client';
import { PokemonService } from '../services/pokemon.service';
import { UpdateOnePokemonDTO } from '../dtos/update-pokemon.dto';
import { FilterPokemonDto } from '../dtos/filter-pokemon.dto';
import { CreateOnePokemonDTO } from '../dtos/create-pokemon.dto';
import { IPaginationResult } from '../../../common/interfaces/pagination.interface';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { SortingDto } from 'src/common/dtos/sorting.dto';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(
    @Body() pokemonData: CreateOnePokemonDTO,
  ): Promise<PokemonModel> {
    return this.pokemonService.create(pokemonData);
  }

  @Get()
  async findAll(
    @Query() filter: FilterPokemonDto,
    @Query() pagination: PaginationDto,
    @Query() sorting: SortingDto
  ): Promise<IPaginationResult<Pokemon>> {
    return this.pokemonService.findAll(filter, pagination, sorting);
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

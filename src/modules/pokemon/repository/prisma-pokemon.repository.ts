import { Injectable } from '@nestjs/common';
import { Pokemon, Prisma, PrismaClient } from '@prisma/client';
import { IPokemonRepository } from './pokemon.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { IPokemonFilter } from '../interfaces/pokemon-filter.interface';
import { IPaginationOptions, IPaginationResult } from '../../../common/interfaces/pagination.interface';
import { SortingDto } from 'src/common/dtos/sorting.dto';

@Injectable()
export class PrismaPokemonRepository implements IPokemonRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; type: string }): Promise<Pokemon> {
    return this.prisma.pokemon.create({
      data: {
        name: data.name,
        type: data.type,
      },
    });
  }

  async findAll(
    filter?: IPokemonFilter,
    pagination?: IPaginationOptions,
    sorting?: SortingDto
  ): Promise<IPaginationResult<Pokemon>> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;
    const where: Prisma.PokemonWhereInput = {};

    if (filter) {
      if (filter.name) {
        where.name = { contains: filter.name };
      }
      if (filter.type) {
        where.type = { equals: filter.type };
      }
    }

    const orderBy: Prisma.PokemonOrderByWithRelationInput = {};
    if (sorting?.sortBy) {
      orderBy[sorting.sortBy] = sorting.sortDirection;
    } else {
      orderBy.created_at = 'desc';
    }

    const [items, total] = await Promise.all([
      this.prisma.pokemon.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.pokemon.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findOne(id: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    data: { name?: string; type?: string },
  ): Promise<Pokemon> {
    return this.prisma.pokemon.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Pokemon> {
    return this.prisma.pokemon.delete({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Pokemon | null> {
    return this.prisma.pokemon.findFirst({
      where: { name },
    });
  }

  async findByType(type: string): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany({
      where: { type },
    });
  }
}

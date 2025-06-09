import { Injectable } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { IPokemonRepository } from './pokemon.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';

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

  async findAll(): Promise<Pokemon[]> {
    return this.prisma.pokemon.findMany();
  }

  async findOne(id: number): Promise<Pokemon | null> {
    return this.prisma.pokemon.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: { name?: string; type?: string }): Promise<Pokemon> {
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
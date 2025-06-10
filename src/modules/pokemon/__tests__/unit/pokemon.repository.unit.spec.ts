import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { PrismaPokemonRepository } from '../../repository/prisma-pokemon.repository';
import { SortingDto } from 'src/common/dtos/sorting.dto';

describe('PrismaPokemonRepository', () => {
  let repository: PrismaPokemonRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const mockPrisma = {
      pokemon: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaPokemonRepository,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    repository = module.get<PrismaPokemonRepository>(PrismaPokemonRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should apply filters correctly', async () => {
      const filter = { name: 'Pikachu', type: 'Electric' };
      const pagination = { page: 1, limit: 10 };
      const sorting = { sortBy: 'name', sortDirection: 'asc' } as SortingDto;

      await repository.findAll(filter, pagination, sorting);

      expect(prisma.pokemon.findMany).toHaveBeenCalledWith({
        where: {
          name: { contains: 'Pikachu' },
          type: { equals: 'Electric' },
        },
        skip: 0,
        take: 10,
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('create', () => {
    it('should create a new Pokemon', async () => {
      const data = { name: 'Pikachu', type: 'Electric' };
      await repository.create(data);

      expect(prisma.pokemon.create).toHaveBeenCalledWith({
        data: { name: 'Pikachu', type: 'Electric' },
      });
    });
  });

  describe('update', () => {
    it('should update an existing Pokemon', async () => {
      const id = 1;
      const data = { name: 'Pikachu', type: 'Electric' };
      await repository.update(id, data);

      expect(prisma.pokemon.update).toHaveBeenCalledWith({
        where: { id },
        data: { name: 'Pikachu', type: 'Electric' },
      });
    });
  });

  describe('remove', () => {
    it('should remove a Pokemon by ID', async () => {
      const id = 1;
      await repository.remove(id);

      expect(prisma.pokemon.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});

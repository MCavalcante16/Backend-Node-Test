import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from '../../controllers/pokemon.controller';
import { PokemonService } from '../../services/pokemon.service';
import { FilterPokemonDto } from '../../dtos/filter-pokemon.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { SortingDto } from '../../../../common/dtos/sorting.dto';
import { RedisCacheModule } from '../../../../cache/cache.module';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: mockService,
        },
      ],
      imports: [RedisCacheModule],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  describe('findAll', () => {
    it('should call service.findAll with correct parameters', async () => {
      const filter: FilterPokemonDto = { name: 'Pikachu' };
      const pagination: PaginationDto = { page: 1, limit: 10 };
      const sorting: SortingDto = { sortBy: 'name', sortDirection: 'asc' };

      await controller.findAll(filter, pagination, sorting);
      expect(service.findAll).toHaveBeenCalledWith(filter, pagination, sorting);
    });
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const pokemonData = { name: 'Pikachu', type: 'Electric' };

      await controller.create(pokemonData);
      expect(service.create).toHaveBeenCalledWith(pokemonData);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const id = '1';
      const pokemonData = { name: 'Pikachu', type: 'Electric' };

      await controller.update(id, pokemonData);
      expect(service.update).toHaveBeenCalledWith(Number(id), pokemonData);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct parameters', async () => {
        const id = '1';
    
        await controller.remove(id);
        expect(service.remove).toHaveBeenCalledWith(Number(id));
        }
    );
  });
});

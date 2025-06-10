import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from '../../services/pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: 'IPokemonRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  describe('findAll', () => {
    it('should fetch from repository', async () => {
      const mockData = { items: [], total: 0 };
      mockRepository.findAll.mockResolvedValue(mockData);

      const result = await service.findAll();
      expect(result).toEqual(mockData);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call repository.create', async () => {
      const mockPokemon = { name: 'Pikachu', type: 'Electric' };
      mockRepository.create.mockResolvedValue(mockPokemon);

      const result = await service.create(mockPokemon);
      expect(result).toEqual(mockPokemon);
      expect(mockRepository.create).toHaveBeenCalledWith(mockPokemon);
    });
  });

  describe('update', () => {
    it('should call repository.update', async () => {
      const id = 1;
      const updateData = { name: 'Pikachu', type: 'Electric' };
      mockRepository.update.mockResolvedValue(updateData);

      const result = await service.update(id, updateData);
      expect(result).toEqual(updateData);
      expect(mockRepository.update).toHaveBeenCalledWith(id, updateData);
    });
  });

  describe('remove', () => {
    it('should call repository.remove', async () => {
      const id = 1;
      const mockPokemon = { id, name: 'Pikachu', type: 'Electric' };
      mockRepository.remove.mockResolvedValue(mockPokemon);

      const result = await service.remove(id);
      expect(result).toEqual(mockPokemon);
      expect(mockRepository.remove).toHaveBeenCalledWith(id);
    });
  });
});

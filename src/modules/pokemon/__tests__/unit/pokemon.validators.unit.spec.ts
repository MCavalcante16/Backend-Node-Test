import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FilterPokemonDto } from '../../dtos/filter-pokemon.dto';
import { CreateOnePokemonDTO } from '../../dtos/create-pokemon.dto';
import { UpdateOnePokemonDTO } from '../../dtos/update-pokemon.dto';
import { PaginationDto } from '../../../../common/dtos/pagination.dto';
import { SortingDto } from '../../../../common/dtos/sorting.dto';

describe('FilterPokemonDto', () => {
  it('should allow empty filter', async () => {
    const dto = plainToInstance(FilterPokemonDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate name is string', async () => {
    const dto = plainToInstance(FilterPokemonDto, { name: 123 });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });

  it('should validate type is string', async () => {
    const dto = plainToInstance(FilterPokemonDto, { type: 123 });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });
});

describe('CreatePokemonDto', () => {
  it('should validate name and type are required', async () => {
    const dto = plainToInstance(CreateOnePokemonDTO, {
      name: 'Pikachu',
      type: 'Electric',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    const invalidDto = plainToInstance(CreateOnePokemonDTO, {
      name: '',
      type: '',
    });
    const invalidErrors = await validate(invalidDto);
    expect(invalidErrors.length).toBeGreaterThan(0);
  });

  it('should validate name is string', async () => {
    const dto = plainToInstance(CreateOnePokemonDTO, {
      name: 123,
      type: 'Electric',
    });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });

  it('should validate type is string', async () => {
    const dto = plainToInstance(CreateOnePokemonDTO, {
      name: 'Pikachu',
      type: 123,
    });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });
});

describe('UpdatePokemonDto', () => {
  it('should allow partial updates', async () => {
    const dto = plainToInstance(UpdateOnePokemonDTO, {
      name: 'Pikachu',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    const invalidDto = plainToInstance(UpdateOnePokemonDTO, {
      name: '',
    });
    const invalidErrors = await validate(invalidDto);
    expect(invalidErrors.length).toBeGreaterThan(0);
  });

  it('should validate name is string', async () => {
    const dto = plainToInstance(UpdateOnePokemonDTO, {
      name: 123,
    });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });

  it('should validate type is string', async () => {
    const dto = plainToInstance(UpdateOnePokemonDTO, {
      type: 123,
    });
    const errors = await validate(dto);
    expect(errors[0].constraints.isString).toBeDefined();
  });
});

describe('PaginationDTO', () => {
  it('should validate page and limit are numbers', async () => {
    const dto = plainToInstance(PaginationDto, { page: 1, limit: 10 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    const invalidDto = plainToInstance(PaginationDto, {
      page: 'one',
      limit: 'ten',
    });
    const invalidErrors = await validate(invalidDto);
    expect(invalidErrors.length).toBeGreaterThan(0);
  });

  it('should validate page is greater than or equal to 1', async () => {
    const dto = plainToInstance(PaginationDto, { page: 0, limit: 10 });
    const errors = await validate(dto);
    expect(errors[0].constraints.min).toBeDefined();
  });

  it('should validate limit is greater than or equal to 1 and less than or equal to 100', async () => {
    const dto = plainToInstance(PaginationDto, { page: 1, limit: 101 });
    const errors = await validate(dto);
    expect(errors[0].constraints.max).toBeDefined();
  });
});

describe('SortingDto', () => {
  it('should validate sortBy and sortDirection', async () => {
    const dto = plainToInstance(SortingDto, {
      sortBy: 'name',
      sortDirection: 'asc',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);

    const invalidDto = plainToInstance(SortingDto, {
      sortBy: 'invalid',
      sortDirection: 'invalid',
    });
    const invalidErrors = await validate(invalidDto);
    expect(invalidErrors.length).toBeGreaterThan(0);
  });

  it('should allow default values for sortDirection', async () => {
    const dto = plainToInstance(SortingDto, { sortBy: 'name' });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
    expect(dto.sortDirection).toBe('asc'); // Default value
  });

  it('should validate sortBy is one of the allowed values', async () => {
    const dto = plainToInstance(SortingDto, { sortBy: 'invalid' });
    const errors = await validate(dto);
    expect(errors[0].constraints.isIn).toBeDefined();
  });

  it('should validate sortDirection is either asc or desc', async () => {
    const dto = plainToInstance(SortingDto, { sortDirection: 'invalid' });
    const errors = await validate(dto);
    expect(errors[0].constraints.isIn).toBeDefined();
  });
});

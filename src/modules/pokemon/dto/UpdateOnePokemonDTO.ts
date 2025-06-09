import { PartialType } from '@nestjs/mapped-types';
import { CreateOnePokemonDTO } from './CreateOnePokemonDTO';

export class UpdateOnePokemonDTO extends PartialType(CreateOnePokemonDTO) {}
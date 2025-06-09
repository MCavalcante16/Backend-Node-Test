import { PartialType } from '@nestjs/mapped-types';
import { CreateOnePokemonDTO } from './create-pokemon.dto';

export class UpdateOnePokemonDTO extends PartialType(CreateOnePokemonDTO) {}
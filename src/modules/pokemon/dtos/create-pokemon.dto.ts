import { IsNotEmpty, IsString } from "class-validator";

export class CreateOnePokemonDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

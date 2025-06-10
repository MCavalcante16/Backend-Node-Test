import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { PrismaPokemonRepository } from './repository/prisma-pokemon.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisCacheModule } from '../../cache/cache.module';

@Module({
  controllers: [PokemonController],
  providers: [
    PrismaModule,
    {
      provide: 'IPokemonRepository',
      useClass: PrismaPokemonRepository,
    },
    PokemonService,
  ],
  imports: [PrismaModule, RedisCacheModule],
})
export class PokemonModule {}

import { Module, ValidationPipe } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { HelloModule } from "./modules/hello/hello.module";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PokemonModule } from "./modules/pokemon/pokemon.module";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { PrismaErrorInterceptor } from "./common/interceptors/prisma-error.interceptor";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
      },
    }),
    HelloModule,
    PrismaModule,
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "./database/database_orm.sqlite",
      autoLoadEntities: true,
      synchronize: true,
      migrations: ["../typeorm/migrations/*.ts"],
    }),
    PokemonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: PrismaErrorInterceptor
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    }
  ],
})
export class AppModule {}

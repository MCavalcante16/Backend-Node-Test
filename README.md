# Candidate Interview Project

## Project Overview

Welcome to the interview project! This project is designed to assess your skills in building a backend API using Node.

### Goals

- Understand your proficiency with Node.
- Assess your ability to design and implement a scalable API.
- Evaluate your coding practices and problem-solving approach.

## Implemented Features

- **CRUD Operations (REST endpoints) for the `pokemons` table:**
  - `createPokemon` (POST /pokemons)
  - `updatePokemon` (PUT /pokemons/:id)
  - `deletePokemon` (DELETE /pokemons/:id)
  - `findManyPokemon` (GET /pokemons?queryparams)
- **Query filters:**
  - Filter by type.
  - Filter by partial name.
- **Pagination.**
- **Sorting:**
  - By name (ascending or descending order).
- **Rate limiting** with `nestjs/throttler`.
- **Caching** for performance optimization with Redis.
- **Input validation** using `class-validator`.
- **Error handling** and appropriate response returns.
- **Unit tests** developed.

## Installation

```bash
$ npm install
or
$ yarn
```

## Generate prisma files

```bash
$ npm run prisma generate
or
$ yarn prisma generate

```

## Running the app

```bash
$ npm run start:dev
or
$ yarn start:dev
```

## Test

```bash
$ npm run test
or
$ yarn test
```


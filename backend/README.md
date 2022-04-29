## Watchout /!\

yarn needs to be run inside docker /!\ (`docker-compose run --rm backend yarn`)

## To generate migrations

```
docker-compose run --rm backend yarn typeorm migration:generate ./src/infrastructure/database/migrations/<migration-name> -d src/infrastructure/database/index.ts
```

## To update tables based on schema

```
docker-compose run --rm backend yarn typeorm schema:sync -d src/infrastructure/database/index.ts
```

## To drop all tables

```
docker-compose run --rm backend yarn typeorm schema:drop -d src/infrastructure/database/index.ts
```

## To run migrations

```
docker-compose run --rm backend yarn typeorm migration:run -d src/infrastructure/database/index.ts
```

## To take a look at the database

```
docker-compose exec postgres psql -d backend
```

then :

```
\d
```

then : any SQL query you want

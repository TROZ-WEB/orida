## Watchout /!\

yarn needs to be run inside docker /!\ (`docker-compose run --rm backend yarn`)

## To generate migrations

```
docker-compose run --rm backend yarn typeorm migration:generate -n <migration-name>
```

## To update tables based on schema

```
docker-compose run --rm backend yarn typeorm schema:sync
```

## To drop all tables

```
docker-compose run --rm backend yarn typeorm schema:drop
```

## To run migrations

```
docker-compose run --rm backend yarn migration:run
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

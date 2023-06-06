## Battery issue report

## 🗂 Monorepo structure

| Package                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| [`web`](./apps/web)       | Front end application created with Vite          |
| [`server`](./apps/server) | GraphQL Server API with Apollo Server and Prisma |

## 💥 Features

- Display a list of schools with the highest number of battery issues
- Display details for each school which devices are unhealthy and in need of battery replacement

## ⚒️ Stack

- Lerna with NPM
- React + Vite (typescript)
- Apollo Server API
- Prisma ORM
- Code first with `type-graphql`
- Prisma seed file
- Docker compose running a `postgres` database
- Github actions with Release
- Conventional commits
- Semantic releases

## ⚠️ Requirements

- Node >= `v18.12.1`
- NPM >= `v8.19.2`
- Docker Engine `23.x`
- Docker Compose `2.x`

Ready to go!

## 🚀 Start

Add an `.env` file in the root folder of the [`web`](./apps/web) with:

```
VITE_SERVER_ENDPOINT=http://localhost:4000/
```

Add an `.env` file in the root folder of the [`server`](./apps/server) with:

```
DATABASE_URL="postgresql://pguser:pgpass@localhost:5432/pgdb?schema=public"
SERVER_PORT="4000"
```

**Check the `.env.local` in each folder if you have any problems**

1. In the root folder install the dependencies

```bash
  npm i
```

2. Starting the PostgreSQL container

```sh
## battery-issue-tracker/apps/server
docker compose up -d
```

3. Prepare the database (migration and seed)

```sh
## battery-issue-tracker/apps/server
npm run seed
```

API ready to go!

In the root folder run the following command:

1. Running the project (Web + Server)

```bash
  npm dev
```

Front is running at: http://localhost:5173/

Server playground: http://localhost:4000/

## 🚦 Testing

In the root folder run the following command:

```bash
  npm test
```

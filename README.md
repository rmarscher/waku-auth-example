# Waku Auth Example

This is an example of implementing authentication in Waku using [better-auth](https://www.better-auth.com/docs/installation).

## Install Log

```sh
npm create waku@latest
cd waku-project
npm install --save --exact better-auth better-sqlite3
npm install --save-dev --exact @types/better-sqlite3
```

## Setup

Create `auth.ts`.

Generate the database schema:

```sh
npm exec @better-auth/cli generate
```

Run the database migrations:

```sh
npm exec @better-auth/cli migrate
```

# Waku "Better Auth" Example

This is an example of implementing authentication in Waku using [better-auth](https://www.better-auth.com/docs/installation).

## Install Log

```sh
npm create waku@latest
cd waku-project
npm install --save --exact better-auth better-sqlite3
npm install --save-dev --exact @types/better-sqlite3
```

## Setup

Copy `.env-example` to `.env` and create a `BETTER_AUTH_SECRET` 

Create [`auth.ts`](https://github.com/rmarscher/waku-better-auth-example/blob/main/src/auth.ts) with better-auth server config.

Generate the database schema:

```sh
npm exec @better-auth/cli generate
```

Run the database migrations:

```sh
npm exec @better-auth/cli migrate
```

Create [middleware](https://github.com/rmarscher/waku-better-auth-example/blob/main/src/middleware/auth.ts) for Waku to load the session from the request headers and store it in Waku's context data.

Add middleware to waku.config.ts:
```ts
import { defineConfig } from "waku/config";

export default defineConfig({
  middleware: [
    "waku/middleware/context",
    "waku/middleware/dev-server",
    "./src/middleware/auth.ts",
    "waku/middleware/handler",
  ],
});
```

Set up [auth API routes](https://github.com/rmarscher/waku-better-auth-example/blob/main/src/pages/api/auth/%5B...route%5D.ts) and forward them to better-auth.

Create a [better-auth client](https://github.com/rmarscher/waku-better-auth-example/blob/main/src/lib/auth-client.ts) and use it in [client components](https://github.com/rmarscher/waku-better-auth-example/blob/main/src/components/sign-in-form.tsx#L17).

Read the session from Waku context data in server components:
- <https://github.com/rmarscher/waku-better-auth-example/blob/main/src/pages/(protected)/_layout.tsx#L10>
- <https://github.com/rmarscher/waku-better-auth-example/blob/main/src/pages/(protected)/about.tsx#L5>



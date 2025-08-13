import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

// Other database adapters and options are available
// https://www.better-auth.com/docs/installation#configure-database
export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
});

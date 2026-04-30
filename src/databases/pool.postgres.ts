import path from "node:path";
// import { existsSync } from "node:fs";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

let pool: Pool | null = null;

export function getPostgresPool(): Pool {
  if (!pool) {
    // const configuredHost = process.env.POSTGRES_HOST;
    // const runningInDocker = existsSync("/.dockerenv");
    // const postgresHost =
    //   runningInDocker && configuredHost === "localhost"
    //     ? "host.docker.internal"
    //     : configuredHost;

    pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,

      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PG pool error", err);
      process.exit(1);
    });
  }

  return pool;
}

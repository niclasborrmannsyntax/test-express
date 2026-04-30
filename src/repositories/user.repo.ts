import { getPostgresPool } from "../databases/pool.postgres.js";
import type { User } from "../models/user.model.ts";

const pool = getPostgresPool();

export const createUser = async (username: string): Promise<User> => {
  const res = await pool.query(
    `
    INSERT INTO users (username)
    VALUES ($1)
    RETURNING id, username
    `,
    [username],
  );
  return res.rows[0];
};

export const findUserById = async (id: number): Promise<User | null> => {
  const res = await pool.query("SELECT id, username FROM users WHERE id = $1", [
    id,
  ]);
  return res.rows[0] ?? null;
};

export const findAllUsers = async (): Promise<User[]> => {
  const res = await pool.query("SELECT * FROM users");
  return res.rows;
};

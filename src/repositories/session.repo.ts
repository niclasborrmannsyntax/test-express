import { getPostgresPool } from "../databases/pool.postgres.ts";
import type { Session } from "../models/session.model.ts";

const pool = getPostgresPool();

export const createSession = async (
  sessionId: string,
  username: string,
): Promise<Session> => {
  const res = await pool.query(
    `
    INSERT INTO sessions (session_id, username)
    VALUES ($1, $2)
    RETURNING session_id, username
    `,
    [sessionId, username],
  );

  return {
    sessionId: res.rows[0].session_id,
    username: res.rows[0].username,
  };
};

export const findSessionById = async (
  sessionId: string,
): Promise<Session | null> => {
  const res = await pool.query(
    `SELECT session_id, username FROM sessions WHERE session_id = $1`,
    [sessionId],
  );

  if (!res.rows[0]) {
    return null;
  }

  return {
    sessionId: res.rows[0].session_id,
    username: res.rows[0].username,
  };
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await pool.query(`DELETE FROM sessions WHERE session_id = $1`, [sessionId]);
};

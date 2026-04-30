import { randomUUID } from "node:crypto";
import {
  createSession,
  deleteSession,
  findSessionById,
} from "../repositories/session.repo.js";

export async function getName(
  sessionId: string | undefined,
): Promise<string | null> {
  if (!sessionId) return null;

  const userSession = await findSessionById(sessionId);
  if (!userSession) return null;

  return userSession.username;
}

export async function login(username: string): Promise<string | null> {
  const sessionId = randomUUID();

  await createSession(sessionId, username);

  return sessionId;
}

export async function logout(sessionId: string | undefined): Promise<void> {
  if (!sessionId) return;

  await deleteSession(sessionId);
}

import { v4 as uuid } from "uuid";
import {
  createSession,
  deleteSession,
  findSessionById,
} from "../repositories/session.repo.ts";

export async function getName(
  sessionId: string | undefined,
): Promise<string | null> {
  if (!sessionId) return null;

  const userSession = await findSessionById(sessionId);
  if (!userSession) return null;

  return userSession.username;
}

export async function login(username: string): Promise<string | null> {
  const sessionId = uuid();

  await createSession(sessionId, username);

  return sessionId;
}

export async function logout(sessionId: string | undefined): Promise<void> {
  if (!sessionId) return;

  await deleteSession(sessionId);
}

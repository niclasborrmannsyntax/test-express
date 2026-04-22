import { v4 as uuid } from "uuid";
import { readSessions, writeSessions, type Session } from "./auth.storage.ts";

export async function getName(
  sessionId: string | undefined,
): Promise<string | null> {
  if (!sessionId) return null;

  const sessions = await readSessions();
  const userSession = sessions.find(
    (session) => session.sessionId === sessionId,
  );
  if (!userSession) return null;

  return userSession.username;
}

export async function login(username: string): Promise<string | null> {
  const sessions = await readSessions();
  const sessionId = uuid();
  const newSession: Session = {
    sessionId,
    username,
  };
  sessions.push(newSession);
  await writeSessions(sessions);
  return sessionId;
}

export async function logout(sessionId: string | undefined): Promise<void> {
  if (!sessionId) return;

  const sessions = await readSessions();
  const filteredSessions = sessions.filter(
    (session) => session.sessionId !== sessionId,
  );

  await writeSessions(filteredSessions);
}

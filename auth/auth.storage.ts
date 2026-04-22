import { readJsonArray, writeJsonArray } from "../helpers/json-file.ts";

export interface Session {
  sessionId: string;
  username: string;
}

const basePath = import.meta.url;
const fileName = "sessions.json";

export async function readSessions(): Promise<Session[]> {
  return readJsonArray<Session>(basePath, fileName);
}

export async function writeSessions(sessions: Session[]): Promise<void> {
  await writeJsonArray<Session>(basePath, fileName, sessions);
}

import { readJsonArray, writeJsonArray } from "../helpers/json-file.ts";

export interface User {
  id: number;
  username: string;
}

const basePath = import.meta.url;
const fileName = "users.json";

export async function readUsers(): Promise<User[]> {
  return readJsonArray<User>(basePath, fileName);
}

export async function writeUsers(users: User[]): Promise<void> {
  await writeJsonArray<User>(basePath, fileName, users);
}

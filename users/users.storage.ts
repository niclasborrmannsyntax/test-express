import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface User {
  id: number;
  username: string;
}

// Create path to users.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "users.json");

export async function readUsers(): Promise<User[]> {
  const fileContent = await fs.readFile(usersFilePath, "utf-8");
  const parsed = fileContent.trim() ? JSON.parse(fileContent) : [];

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid users.json format: expected an array");
  }

  return parsed as User[];
}

export async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

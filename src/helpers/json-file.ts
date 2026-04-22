import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function resolvePath(moduleUrl: string, fileName: string): string {
  const moduleFilePath = fileURLToPath(moduleUrl);
  const moduleDir = path.dirname(moduleFilePath);
  return path.join(moduleDir, fileName);
}

export async function readJsonArray<T>(
  moduleUrl: string,
  fileName: string,
): Promise<T[]> {
  const filePath = resolvePath(moduleUrl, fileName);
  const fileContent = await fs.readFile(filePath, "utf-8");
  const parsed = fileContent.trim() ? JSON.parse(fileContent) : [];

  if (!Array.isArray(parsed)) {
    throw new Error(`Invalid ${fileName} format: expected an array`);
  }

  return parsed as T[];
}

export async function writeJsonArray<T>(
  moduleUrl: string,
  fileName: string,
  data: T[],
): Promise<void> {
  const filePath = resolvePath(moduleUrl, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

import { readUsers, writeUsers, type User } from "./users.storage.ts";

export async function getUserById(userId: number) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) ?? null;
}

export async function getAllUsers() {
  return readUsers();
}

export async function createUser(username: string) {
  const users = await readUsers();
  const nextId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser: User = {
    id: nextId,
    username,
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

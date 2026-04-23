import {
  readUsers,
  writeUsers,
  type User,
} from "../databases/users.storage.ts";
import {
  InvalidUserDataError,
  UserNotFoundError,
} from "../middlewares/handleUserErrors.ts";

export async function getUserById(userId: number) {
  const users = await readUsers();
  const user = users.find((user) => user.id === userId) ?? null;
  if (!user) throw new UserNotFoundError(String(userId));
  return user;
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

  try {
    await writeUsers(users);
    return newUser;
  } catch (err) {
    throw new InvalidUserDataError(username);
  }
}

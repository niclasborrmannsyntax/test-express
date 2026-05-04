import {
  createUser,
  findUserById,
  findAllUsers,
} from "../repositories/user.repo.js";

export async function registerUser(username: string) {
  // Business-Regel
  if (username.length < 3) {
    throw new Error("Username must be at least 3 characters long");
  }

  return createUser(username);
}

export async function getUserById(id: number) {
  const user = await findUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getAllUsers() {
  return await findAllUsers();
}

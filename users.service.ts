interface SimpleUser {
  id: number;
  username: string;
}

const users: SimpleUser[] = [
  { id: 1, username: "mario93" },
  { id: 2, username: "till85" },
];

export async function getSimpleUserById(id: number) {
  return users.find((user) => user.id == id) ?? null;
}

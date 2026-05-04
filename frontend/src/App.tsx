import { useEffect, useState } from "react";
import "./App.css";

type User = { id: number; username: string };

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = "/api/users";
        const data = await fetch(url);
        const users = (await data.json()) as User[];
        setUsers(users);
        console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <div>
        <h1>Users</h1>
        <p>Total users: {users.length}</p>
      </div>
      <div>
        {users.length > 0
          ? users.map((user) => <div key={user.id}>{user.username}</div>)
          : "No users found"}
      </div>
    </>
  );
}

export default App;

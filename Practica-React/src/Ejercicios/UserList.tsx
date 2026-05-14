import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal 
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la información de los usuarios");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Ocurrió un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();
  }, []); 

  return (
    <div>
      <h2>Consumo de API</h2>

      {loading && <p>⏳ Cargando usuarios...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
              <br />
              <small>{user.address.city}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;

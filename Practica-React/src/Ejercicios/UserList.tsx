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
    <div className="exercise-container">
      <h2>5. Consumo de API (fetch)</h2>

      {loading && <p style={{ color: '#646cff', fontWeight: 'bold' }}>⏳ Cargando usuarios...</p>}

      {error && <p className="error-text">Error: {error}</p>}

      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
          {users.map((user) => (
            <li key={user.id} style={{ 
              padding: '12px', 
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.02)',
              marginBottom: '5px',
              borderRadius: '8px'
            }}>
              <strong style={{ display: 'block', color: '#646cff' }}>{user.name}</strong>
              <small style={{ opacity: 0.8 }}>{user.email}</small>
              <br />
              <small style={{ opacity: 0.6 }}>{user.address.city}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;

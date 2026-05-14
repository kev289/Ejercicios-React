import { useState, useMemo, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const UserDashboard = () => {
  // 1. Usamos nuestro custom hook para traer los 10 usuarios de la API
  const { data: users, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Foco automático al cargar (usando useRef)
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  // 3. Filtrado avanzado con useMemo
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    console.log("Filtrando dashboard...");
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div>
      <h2>Dashboard Integrador</h2>

      {loading && <p>⏳ Cargando base de datos de usuarios...</p>}
      {error && <p>❌ Error: {error}</p>}

      {!loading && !error && (
        <>
          <div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Filtrar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <p>
            Mostrando {filteredUsers.length} de {users?.length} usuarios
          </p>

          <div>
            {filteredUsers.map((user) => (
              <div key={user.id}>
                <h4>{user.name}</h4>
                <p>📧 {user.email}</p>
                <p>
                  🏢 {user.company.name}
                </p>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <p>No hay coincidencias en la base de datos.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;

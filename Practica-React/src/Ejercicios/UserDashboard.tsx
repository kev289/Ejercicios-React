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
    <div className="exercise-container" style={{ maxWidth: '800px' }}>
      <h2>15. Dashboard Integrador (Final)</h2>

      {loading && <p>⏳ Cargando base de datos de usuarios...</p>}
      {error && <p className="error-text">❌ Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="form-group">
            <input
              ref={inputRef}
              type="text"
              placeholder="Filtrar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <p style={{ textAlign: 'left', opacity: 0.6 }}>
            Mostrando {filteredUsers.length} de {users?.length} usuarios
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: '15px',
            marginTop: '20px'
          }}>
            {filteredUsers.map((user) => (
              <div key={user.id} style={{ 
                padding: '15px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '12px',
                textAlign: 'left',
                border: '1px solid rgba(100, 108, 255, 0.2)'
              }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#646cff' }}>{user.name}</h4>
                <p style={{ fontSize: '0.8rem', margin: '0', opacity: 0.8 }}>📧 {user.email}</p>
                <p style={{ fontSize: '0.7rem', margin: '5px 0 0 0', opacity: 0.5 }}>
                  🏢 {user.company.name}
                </p>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <p style={{ marginTop: '30px', opacity: 0.5 }}>No hay coincidencias en la base de datos.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: "Kevin", role: "Frontend" },
  { id: 2, name: "Miguel", role: "Backend" },
  { id: 3, name: "Paulina", role: "UI/UX" },
  { id: 4, name: "Juanda", role: "Frontend" },
  { id: 5, name: "Juan Jose", role: "DevOps" },
];

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    const results = initialUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredUsers(results);

    document.title = `${results.length} usuarios encontrados`;

    return () => {
      document.title = "Vite + React + TS";
    };
  }, [searchTerm]); 

  return (
    <div className="exercise-container">
      <h2>3. Buscador de Usuarios</h2>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Buscar por nombre o rol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <li key={user.id} style={{ marginBottom: '10px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <strong>{user.name}</strong> - <small>{user.role}</small>
            </li>
          ))
        ) : (
          <p className="error-text">No se encontraron usuarios que coincidan con "{searchTerm}"</p>
        )}
      </ul>
    </div>
  );
};

export default UserSearch;

import React, { createContext, useContext, useState } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => {
    setUser({ username: name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};

const LoginForm = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");

  return (
    <div>
      <h3>Inicia Sesión</h3>
      <div>
        <input 
          type="text" 
          placeholder="Tu nombre..." 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <button onClick={() => login(name)} disabled={!name}>
        Entrar
      </button>
    </div>
  );
};

const UserProfile = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h3>Bienvenido, {user?.username}! </h3>
      <p>Has iniciado sesión correctamente.</p>
      <button onClick={logout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

const AuthStatus = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <p>Estado: Conectado como <strong>{user.username}</strong></p>
      ) : (
        <p>Estado: No identificado</p>
      )}
    </div>
  );
};

const AuthContextApp = () => {
  return (
    <div>
      <h2>Context API</h2>
      <AuthProvider>
        <AuthContent />
        <AuthStatus />
      </AuthProvider>
    </div>
  );
};

const AuthContent = () => {
  const { user } = useAuth();
  return user ? <UserProfile /> : <LoginForm />;
};

export default AuthContextApp;

import { useUser } from "../hooks/useUser";

export const LoginButton = () => {
  const { login, isLoading } = useUser();

  const handleLogin = () => {
    login({
      name: "Ana Pérez",
      email: "ana@example.com",
      role: "student"
    });
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión como Ana"}
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useUser();

  return (
    <button onClick={logout}>
      Cerrar Sesión
    </button>
  );
};

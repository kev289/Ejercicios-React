import { useUser } from "../hooks/useUser";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav>
      <h2>Mi Aplicación</h2>
      {user ? (
        <p>Bienvenido, <strong>{user.name}</strong></p>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </nav>
  );
};

export default Navbar;

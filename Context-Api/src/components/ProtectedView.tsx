import { useUser } from "../hooks/useUser";

const ProtectedView = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return <p>Debes iniciar sesión para ver este contenido privado.</p>;
  }

  return <>{children}</>;
};

export default ProtectedView;

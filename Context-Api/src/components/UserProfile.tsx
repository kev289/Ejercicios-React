import { useUser } from "../hooks/useUser";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <h3>Perfil de Usuario</h3>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
};

export default UserProfile;

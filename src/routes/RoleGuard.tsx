import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

interface Props {
  // Definimos qué roles permitimos en la ruta
  allowedRoles: Array<'ADMIN_ROLE' | 'WORKER_ROLE' | 'CONSUMER_ROLE'>;
}

export const RoleGuard = ({ allowedRoles }: Props) => {
  const { usuario, status } = useContext(AuthContext);

  // 1. Mientras verificamos el token (validar-JWT)
  if (status === 'checking') {
    return <p>Verificando credenciales...</p>;
  }

  // 2. Si no hay usuario logueado, lo mandamos al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si el rol del usuario NO está en la lista de permitidos
  if (!allowedRoles.includes(usuario.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Si todo está bien, permitimos el paso a la ruta hija
  return <Outlet />;
};
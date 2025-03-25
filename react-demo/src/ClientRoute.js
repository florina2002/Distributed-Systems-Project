// ClientRoute.js
import { Navigate } from 'react-router-dom';

function ClientRoute({ children, user }) {
  return user && user.role === 'CLIENT' ? children : <Navigate to="/unauthorized" />;
}

export default ClientRoute;

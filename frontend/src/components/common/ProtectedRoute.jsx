import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  // if (!isAuthenticated) {
  //   const location = useLocation();
  //   return <Navigate to="/signin" state={{ from: location }} replace />;
  // }
  
  // If authenticated, render the child routes
  return <Outlet />;
};
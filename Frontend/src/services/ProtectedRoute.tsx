import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppContext, { AppContextType } from '../hooks/useAppContext';

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useContext(AppContext) as AppContextType;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

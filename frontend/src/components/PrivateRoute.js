import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>;
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;



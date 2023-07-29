import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout() {
  const { isAuthenticated, isVendor } = useSelector(state => state.user);
  const location = useLocation();

  if (!isAuthenticated && isVendor) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

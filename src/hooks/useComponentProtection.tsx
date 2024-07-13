import React from 'react';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export function useComponentProtection(Component: React.ComponentType, requiredPermission: string) {
  const navigate = useNavigate();

  const hasPermission = (decodedToken: { permissions: string[] }): boolean => {
    // Anyone can access this page
    if (!requiredPermission) return true;

    // If required permission and decoded token permissions are empty, return true
    if (requiredPermission === "empty" && decodedToken.permissions.length === 0) return true;

    return decodedToken.permissions.includes(requiredPermission);
  };


  const ProtectedComponent: React.FC = () => {
    const token = localStorage.getItem('token');

    // Not authenticated
    if (!token) {
      // Navigate to home page to authenticate
      navigate('/');
      return null;
    }

    const decodedToken = jwtDecode(token) as { permissions: string[] };

    // Does not have permission
    if (!hasPermission(decodedToken)) {
      return null;
    }

    // Success
    return <Component/>;
  }

  return ProtectedComponent;
}

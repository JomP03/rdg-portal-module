import {useAuth0} from "@auth0/auth0-react";
import React, {ReactNode, useEffect} from "react";
import {PageLoader} from "../page-loader/PageLoader";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface ProtectedComponentProps {
  component: ReactNode;
  requiredPermission: string;
}

export const ProtectedGuard: React.FC<ProtectedComponentProps> = ({component, requiredPermission}) => {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading} = useAuth0();

  const hasPermission = (decodedToken: { permissions: string[] }): boolean => {
    if (!requiredPermission) return true;
    if (requiredPermission === "empty" && decodedToken.permissions.length === 0) return true;
    return decodedToken.permissions.includes(requiredPermission);
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as { permissions: string[] };

      if (!hasPermission(decodedToken)) {
        navigate('/access-denied');
        return;
      }
    }
    else {
      navigate('/');
      return;
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <PageLoader/>;
  }

  return <>
    {component}
  </>; // Render children only if authenticated and has permission
};


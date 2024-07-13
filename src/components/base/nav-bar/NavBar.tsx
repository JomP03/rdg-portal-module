import React, {ReactNode} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import './nav-bar.css';

interface NavBarProps {
  logoImgUrl?: string;
  routes: {
    path: string;
    text: string;
  }[];
  userMenuElement?: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({logoImgUrl, routes, userMenuElement}) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <img className={'logo'} src={logoImgUrl} alt={'logo'} />
      {routes.map((route, index) => {
        //console.log(location.pathname, 'is equal to', route.path, '?', location.pathname === route.path);
        const isActive = location.pathname === route.path;
        return (
          <NavLink key={index} className={isActive ? 'link active' : 'link'} to={route.path}>
            {route.text}
          </NavLink>
        );
      })}
      {userMenuElement}
    </nav>
  );
}

export default NavBar;
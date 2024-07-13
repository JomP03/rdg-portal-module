import React from 'react';
import './header.css';

interface HeaderProps {
    text: string;
    color?: string;
}

const Header: React.FC<HeaderProps> = ({text, color}) => {
    const headerStyle = {
        color: color,
    };

    return (
        <h1 className={'header-title'} style={headerStyle}>{text}</h1>
    );
};

export default Header;

import React from 'react';
import './title.css';

interface TitleProps {
    text: string;
    color?: string;
    className?: string;
}

const Title: React.FC<TitleProps> = ({text, color, className}) => {
    const headerStyle = {
        color: color,
    };

    return (
        <h2 className={`title-custom ${className}`} style={headerStyle}>{text}</h2>
    );
};

export default Title;

import React from 'react';
import './sub-title.css';

interface TitleProps {
    text: string;
    color?: string;
}

const SubTitle: React.FC<TitleProps> = ({text, color}) => {
    const headerStyle = {
        color: color,
    };

    return (
        <h2 className={'sub-title'} style={headerStyle}>{text}</h2>
    );
};

export default SubTitle;

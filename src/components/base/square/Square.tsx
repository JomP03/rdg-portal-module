import React from 'react';
import {useNavigate} from 'react-router-dom';
import './square.css';


interface SquareProps {
    imageUrl?: string;
    text: string;
    path: string;
    backgroundColor: string;
    hoverColor: string;
    activeColor: string;
    styles?: React.CSSProperties;
    transformActive: string;
}

const Square: React.FC<SquareProps> = ({
                                           imageUrl, text, path,
                                           backgroundColor, hoverColor, activeColor,
                                           styles, transformActive
                                       }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path);
    };

    return <div
        className={'square'}
        onClick={handleClick}
        style={styles}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverColor;
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = backgroundColor;
        }}
        onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = activeColor;
            e.currentTarget.style.transform = transformActive;
            e.currentTarget.style.transition = '0.5s';
        }}
        onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = hoverColor;
        }}
    >
        <img
            className={'square-img'}
            src={imageUrl}
            alt={''}
        />
        <p className={'text'}>{text}</p>
    </div>;
}

export default Square;

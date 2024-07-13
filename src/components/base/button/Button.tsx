import React from "react";
import './button.css';


interface ButtonProps {
    buttonId?: string;
    label?: string;
    backgroundColor: string;
    hoverColor: string;
    activeColor: string;
    textColor: string;
    onClick: () => void;
    isDisabled?: boolean;
    styles?: React.CSSProperties;
    tooltipText?: string;
    width?: string;
    isButtonVisible?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           buttonId,
                                           label, backgroundColor,
                                           hoverColor, activeColor,
                                           textColor, onClick,
                                           isDisabled = false,
                                           styles,
                                           tooltipText,
                                           width,
                                           isButtonVisible = true
                                       }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
        display: isButtonVisible ? 'block' : 'none',
        width: width,
        ...styles
    };

    return (
        <button
            id={buttonId}
            className={'button'}
            onClick={onClick}
            style={buttonStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = backgroundColor;
            }}
            onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = activeColor;
            }}
            onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
            }}
            disabled={isDisabled}
            title={tooltipText}
        >
            {label}
        </button>
    );
};


export default Button;

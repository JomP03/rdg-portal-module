import React from "react";
import "./image-button.css";


interface ImageButtonProps {
    className?: string;
    imageUrl: string;
    onClick: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
    width: string;
    height: string;
    disabled?: boolean;
    tooltipText?: string;
}

const ImageButton: React.FC<ImageButtonProps> = (
    {
        className="image-button",
        imageUrl,
        onClick,
        width,
        height,
        disabled = false,
        tooltipText
    }) => {
    return (
        <>
            <button
                className={className}
                onClick={onClick}
                style={{width: width, height: height}}
                disabled={disabled}
                title={tooltipText}
            >
                <img
                    src={imageUrl}
                    alt="Image Not Found"
                />
            </button>
        </>
    )
}

export default ImageButton;
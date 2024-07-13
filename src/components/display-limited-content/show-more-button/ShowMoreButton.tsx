import React from 'react';
import './show-more-button.css';


interface ShowMoreButtonProps {
    onClick: () => void;
    showMore: boolean;
    color?: string;
}


const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({onClick, showMore, color}) => {
    return (
        <button className={'show-more-button'} onClick={onClick} color={color}>
            {showMore ? 'Show Less' : 'Show More'}
        </button>
    );
};

export default ShowMoreButton;

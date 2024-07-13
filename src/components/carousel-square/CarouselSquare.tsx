import React from 'react';
import Square from "../base/square/Square";
import {
    BACKGROUND_COLOR,
    BACKGROUND_COLOR_DARK,
    BACKGROUND_COLOR_VARIANT,
    SECONDARY_COLOR_DARK
} from "../../utils/colors";


interface LoginSquareProps {
    imageUrl?: string;
    text: string;
    path: string;
}

const CarouselSquare: React.FC<LoginSquareProps> = ({imageUrl, text, path}) => {

    const styles = {
        backgroundColor: BACKGROUND_COLOR,
        color: SECONDARY_COLOR_DARK,
        transition: '0.5s'
    }

    return (
        <Square text={text} path={path} imageUrl={imageUrl}
                backgroundColor={BACKGROUND_COLOR} hoverColor={BACKGROUND_COLOR_VARIANT}
                activeColor={BACKGROUND_COLOR_DARK} transformActive={'translateY(5%)'} styles={styles}
        />
    )
}

export default CarouselSquare;

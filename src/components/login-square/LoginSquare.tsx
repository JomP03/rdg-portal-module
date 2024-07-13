import React from 'react';
import Square from "../base/square/Square";
import {BACKGROUND_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_DARK, PRIMARY_COLOR_VARIANT} from "../../utils/colors";


interface LoginSquareProps {
    imageUrl?: string;
    text: string;
    path: string;
}

const LoginSquare: React.FC<LoginSquareProps> = ({imageUrl, text, path}) => {

    const styles = {
        backgroundColor: PRIMARY_COLOR,
        color: BACKGROUND_COLOR,
        transform: 'translateY(-25%)',
        transition: '0.5s'
    }

    return (
        <Square text={text} path={path} imageUrl={imageUrl}
                backgroundColor={PRIMARY_COLOR} hoverColor={PRIMARY_COLOR_VARIANT}
                activeColor={PRIMARY_COLOR_DARK} styles={styles} transformActive={'translateY(-20%)'}
        />
    )
}

export default LoginSquare;

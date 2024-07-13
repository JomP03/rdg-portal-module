import React from "react";
import Button from "../base/button/Button";
import {
    BACKGROUND_COLOR_DARK,
    BODY_COLOR, GREY_COLOR,
    PRIMARY_COLOR,
    PRIMARY_COLOR_DARK,
    PRIMARY_COLOR_VARIANT
} from "../../utils/colors";


interface ButtonProps {
    buttonId?: string;
    label?: string;
    onClick: () => void;
    isDisabled?: boolean;
    isButtonVisible?: boolean;
}

const FormButton: React.FC<ButtonProps> = ({buttonId, label, onClick, isDisabled=false, isButtonVisible=true}) => {

    const backgroundColor = isDisabled ? GREY_COLOR : PRIMARY_COLOR;
    const textColor = isDisabled ? BACKGROUND_COLOR_DARK : BODY_COLOR;
    return (
        <>

            <Button buttonId={buttonId}
                    label={label}
                    backgroundColor={backgroundColor}
                    hoverColor={PRIMARY_COLOR_VARIANT}
                    activeColor={PRIMARY_COLOR_DARK}
                    textColor={textColor}
                    onClick={onClick}
                    isDisabled={isDisabled}
                    isButtonVisible={isButtonVisible}/>

        </>
    )
}

export default FormButton;
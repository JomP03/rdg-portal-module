import React from "react";
import Button from "../base/button/Button";
import {
    BACKGROUND_COLOR_DARK,
    BACKGROUND_COLOR_VARIANT,
    BODY_COLOR,
    SECONDARY_COLOR_DARK
} from "../../utils/colors";


interface ButtonProps {
    buttonId?: string;
    label?: string;
    onClick: () => void;
    isDisabled?: boolean;
}

const AuthButton: React.FC<ButtonProps> = ({buttonId, label, onClick, isDisabled=false}) => {
    return (
        <>

            <Button buttonId={buttonId}
                    label={label}
                    backgroundColor={BODY_COLOR}
                    hoverColor={BACKGROUND_COLOR_VARIANT}
                    activeColor={BACKGROUND_COLOR_DARK}
                    textColor={SECONDARY_COLOR_DARK}
                    width={'40%'}
                    onClick={onClick}
                    isDisabled={isDisabled}/>

        </>
    )
}

export default AuthButton;
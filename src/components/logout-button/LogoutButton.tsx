import React from "react";
import Button from "../base/button/Button";
import {
    BACKGROUND_COLOR,
    LOGOUT_BUTTON_COLOR,
    LOGOUT_BUTTON_COLOR_ACTIVE,
    LOGOUT_BUTTON_COLOR_HOVER
} from "../../utils/colors";


interface LogoutButtonProps {
    label?: string;
    onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({label = 'Logout', onClick}) => {
    return (
        <Button label={label}
                backgroundColor={LOGOUT_BUTTON_COLOR}
                hoverColor={LOGOUT_BUTTON_COLOR_HOVER}
                activeColor={LOGOUT_BUTTON_COLOR_ACTIVE}
                textColor={BACKGROUND_COLOR}
                onClick={onClick}
        />
    )
}

export default LogoutButton;
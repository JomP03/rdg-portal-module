import React from "react";
import ImageButton from "../../../components/base/image-button/ImageButton";
import NavBar from "../../../components/base/nav-bar/NavBar";
import UserMenuBox from "../../../components/user-menu-box/UserMenuBox";
import {HOME_PATH, PATHS_PATH, TASK_SEQUENCE_PATH, TASK_MANAGEMENT_PATH} from "../../Routes";
import Logo from "../../../assets/logo.png";
import User from "../../../assets/user.png";

interface TaskNavBarProps {
    basePath: string;
    logoutAction: () => void;
}

const TaskNavBar: React.FC<TaskNavBarProps> = ({basePath, logoutAction}) => {
    const [userMenuAnchor, setUserMenuAnchor] = React.useState<HTMLButtonElement | null>(null);
    const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const openUserMenu = Boolean(userMenuAnchor);

    const routes = [
        {path: basePath + HOME_PATH, text: "Home"},
        {path: basePath + PATHS_PATH, text: "Paths"},
        {path: basePath + TASK_MANAGEMENT_PATH, text: "Task Management"},
        {path: basePath + TASK_SEQUENCE_PATH, text: "Task Sequence"}

    ];

    const userOptions = (
        <ImageButton
            onClick={handleUserMenuClick}
            imageUrl={User}
            width={"50px"}
            height={"auto"}
            tooltipText={"User Menu"}
        />
    );

    return (
        <>
            <NavBar logoImgUrl={Logo} routes={routes} userMenuElement={userOptions}/>
            <UserMenuBox
                isOpen={openUserMenu}
                onClose={handleUserMenuClose}
                anchorElement={userMenuAnchor}
                logoutAction={logoutAction}
                basePath={basePath}
            />
        </>
    );
};

export default TaskNavBar;
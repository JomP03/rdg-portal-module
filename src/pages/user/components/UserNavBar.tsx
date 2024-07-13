import React from 'react';
import ImageButton from "../../../components/base/image-button/ImageButton";
import NavBar from "../../../components/base/nav-bar/NavBar";
import UserMenuBox from "../../../components/user-menu-box/UserMenuBox";
import Logo from '../../../assets/logo.png'
import User from '../../../assets/user.png';
import {
    HOME_PATH,
    REQUEST_TASK_PATH,
} from "../../Routes";


interface UserNavBarProps {
    basePath: string;
    logoutAction: () => void;
}

const UserNavBar: React.FC<UserNavBarProps> = ({basePath, logoutAction}) => {

    const [userMenuAnchor, setUserMenuAnchor] = React.useState<HTMLButtonElement | null>(null);
    const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUserMenuAnchor(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    }

    const openUserMenu = Boolean(userMenuAnchor);


    const routes = [
        {path: basePath + HOME_PATH, text: 'Home'},
        {path: basePath + REQUEST_TASK_PATH, text: 'Task Requisition'}
    ];

    const userOptions =
        <ImageButton
            onClick={handleUserMenuClick}
            imageUrl={User}
            width={'50px'}
            height={'auto'}
            tooltipText={'User Menu'}/>

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

export default UserNavBar;

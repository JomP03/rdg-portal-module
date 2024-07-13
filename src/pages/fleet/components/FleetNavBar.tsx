import React from 'react';
import ImageButton from "../../../components/base/image-button/ImageButton";
import NavBar from "../../../components/base/nav-bar/NavBar";
import UserMenuBox from "../../../components/user-menu-box/UserMenuBox";
import Logo from '../../../assets/logo.png'
import User from '../../../assets/user.png';
import {HOME_PATH, ROBISEP_PATH, ROBISEP_TYPE_PATH} from "../../Routes";


interface FleetNavBarProps {
    basePath: string;
    logoutAction: () => void;
}

const FleetNavBar: React.FC<FleetNavBarProps> = ({basePath, logoutAction}) => {

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
        {path: basePath + ROBISEP_TYPE_PATH, text: 'Robisep Types'},
        {path: basePath + ROBISEP_PATH, text: 'Robiseps'},
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

export default FleetNavBar;

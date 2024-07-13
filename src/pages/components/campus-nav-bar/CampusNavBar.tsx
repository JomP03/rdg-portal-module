import React from 'react';
import ImageButton from "../../../components/base/image-button/ImageButton";
import NavBar from "../../../components/base/nav-bar/NavBar";
import UserMenuBox from "../../../components/user-menu-box/UserMenuBox";
import Logo from '../../../assets/logo.png'
import User from '../../../assets/user.png';
import {BUILDING_PATH, ELEVATOR_PATH, FLOOR_PATH, HOME_PATH, PASSAGE_PATH, ROOM_PATH, MAP_VISUALIZER_PATH} from "../../Routes";


interface CampusNavBarProps {
    basePath: string;
    logoutAction: () => void;
}

const CampusNavBar: React.FC<CampusNavBarProps> = ({basePath, logoutAction}) => {

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
        {path: basePath + BUILDING_PATH, text: 'Buildings'},
        {path: basePath + FLOOR_PATH, text: 'Floors'},
        {path: basePath + ROOM_PATH, text: 'Rooms'},
        {path: basePath + PASSAGE_PATH, text: 'Passages'},
        {path: basePath + ELEVATOR_PATH, text: 'Elevators'},
        {path: basePath + MAP_VISUALIZER_PATH, text: 'Map Visualizer'}
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

export default CampusNavBar;

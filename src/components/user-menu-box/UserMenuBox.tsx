import React from 'react';
import FixedBox from "../base/fixed-box/FixedBox";
import LogoutButton from "../logout-button/LogoutButton";
import './user-menu-box.css';


interface UserMenuBoxProps {
    isOpen: boolean;
    onClose: () => void;
    anchorElement: HTMLElement | null;
    logoutAction: () => void;
    basePath?: string;
}

const UserMenuBox: React.FC<UserMenuBoxProps> = ({isOpen, onClose, anchorElement,
                                                   logoutAction, basePath}) => {
    return (
        <FixedBox
            title={'User Menu'}
            isOpen={isOpen}
            onClose={onClose}
            anchorElement={anchorElement}
            content={[
                <div key={'separator1'} className={'separator'}/>,
                <a key={'myProfile'} className = {'myProfile'} href={basePath + '/profile'}>My Profile</a>,
                <div key={'separator2'} className={'separator'}/>,
                <br key={'br'}/>,
                <LogoutButton key={'logout'} onClick={logoutAction}/>
            ]                
            }
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        />
    );
}

export default UserMenuBox;
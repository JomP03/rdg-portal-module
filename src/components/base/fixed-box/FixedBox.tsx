import React, {ReactNode} from 'react';
import Popover from '@mui/material/Popover';
import SubTitle from "../sub-title/SubTitle";
import './fixed-box.css'


interface PopoverWithContentProps {
    isOpen: boolean;
    onClose: () => void;
    anchorElement: HTMLElement | null;
    title: string;
    content: ReactNode;
    anchorOrigin: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    transformOrigin: {
        vertical: 'top' | 'center' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
    disableScrollLock?: boolean;
}


const FixedBox: React.FC<PopoverWithContentProps> = ({
                                                         isOpen,
                                                         onClose,
                                                         anchorElement,
                                                         content,
                                                         title,
                                                         anchorOrigin,
                                                         transformOrigin,
                                                         disableScrollLock = true
                                                     }) => {
    return (
        <div className={'fixed-box'}>
            <Popover
                open={isOpen}
                anchorEl={anchorElement}
                onClose={onClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                disableScrollLock={disableScrollLock}
            >
                <div className={'fixed-box-content'}>
                    {<SubTitle text={title}/>}
                    {content}
                </div>
            </Popover>
        </div>
    );
};

export default FixedBox;

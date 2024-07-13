import React, {ReactNode} from 'react';
import ModalHeader from "./modal-header/ModalHeader";
import './base-modal.css';


interface CustomModalProps {
    id?: string;
    isOpen: boolean;
    onRequestClose: () => void;
    title: string;
    content: ReactNode;
    backgroundColorOverlay?: string;
    width?: string;
    height?: string;
}

const BaseModal: React.FC<CustomModalProps> = ({
                                                   id,
                                                   isOpen,
                                                   onRequestClose,
                                                   title,
                                                   content,
                                                   backgroundColorOverlay,
                                                   width,
                                                   height
                                               }) => {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLDivElement && e.target.classList.contains('modal-overlay')) {
            onRequestClose();
        }
    };

    return (
        <div id={id}
             className={`modal-overlay ${isOpen ? 'open' : ''}`}
             onClick={handleOverlayClick}
             style={{backgroundColor: backgroundColorOverlay}}
        >
            <div className="base-modal" style={{width: width, height: height}}>
                <ModalHeader title={title} onRequestClose={onRequestClose}/>
                <div className="modal-content">{content}</div>
            </div>
        </div>
    );
};


BaseModal.defaultProps = {
    backgroundColorOverlay: 'rgba(0, 0, 0, 0.5)',
};

export default BaseModal;

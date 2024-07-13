import React from 'react';
import ImageButton from "../../image-button/ImageButton";
import Title from "../../title/Title";
import closeButton from "../../../../assets/close_button.png";
import './modal-header.css';


interface ModalHeaderProps {
    title: string;
    onRequestClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({title, onRequestClose}) => {
    return (
        <div className="modal-header">
            <div className="modal-header-left">
                <Title text={title}/>
            </div>

            <div className="modal-header-right">
                <ImageButton imageUrl={closeButton} onClick={onRequestClose} width={'1rem'} height={'1.5rem'} tooltipText={'Close'}/>
            </div>
        </div>
    );
};

export default ModalHeader;
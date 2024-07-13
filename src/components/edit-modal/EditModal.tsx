import React, {ReactNode} from "react";
import BaseModal from "../base/base-modal/BaseModal";


interface EditModalProps {
    id?: string;
    isOpen: boolean;
    onRequestClose: () => void;
    title: string;
    form?: ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({
                                                 id, isOpen, onRequestClose,
                                                 title, form
                                             }) => {

    return (
        <BaseModal id={id} isOpen={isOpen} onRequestClose={onRequestClose} title={title}
                   content={form} backgroundColorOverlay={'rgba(0,0,0,0.5)'}
        />
    )
}

export default EditModal;
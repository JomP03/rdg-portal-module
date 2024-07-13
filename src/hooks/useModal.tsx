import {useState} from 'react';


export function useModal() {

    // State for the coordinates of the modal
    const [modalCoords, setModalCoords]
        = useState({x: 0, y: 0});
    const [showModal, setModalState]
        = useState(false);

    function handleOpenModalAndCoords(event: { clientX: any; clientY: any; }) {
        // Update the coordinates
        setModalCoords({x: event.clientX, y: event.clientY});

        // Open the modal
        setModalState(true);
    }

    function handleOpenModal() {
        setModalState(true);
    }

    function handleCloseModal() {
        setModalState(false);
    }

    return {
        modalCoords,
        showModal,
        handleOpenModal,
        handleOpenModalAndCoords,
        handleCloseModal
    };
}

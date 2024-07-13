import React from "react";
import BaseModal from "../base/base-modal/BaseModal";
import MapVisualizer from "../../3DV/MapVisualizer";


interface DisplayVisualizerModalProps {
    id?: string;
    isOpen: boolean;
    onRequestClose: () => void;
    path: string;
    buildingCode: string;
    floorNumber: number;
    initialPosition: number[];
    initialDirection: number;
    isReadyToVisualize: boolean;
}

const DisplayVisualizerModal: React.FC<DisplayVisualizerModalProps> = ({
                                                 id, isOpen, onRequestClose, path, buildingCode, floorNumber, initialPosition, initialDirection, isReadyToVisualize
                                             }) => {

    const mapView = <MapVisualizer isAnimationMode={true} height='600px' path={path} buildingCode={buildingCode} floorNumber={floorNumber} initialPosition={initialPosition} initialDirection={initialDirection} isReadyToVisualize={isReadyToVisualize}/>;

    return (
        <BaseModal id={id} isOpen={isOpen} onRequestClose={onRequestClose} title={'Automated Path Visualizer'}
                   content={mapView} backgroundColorOverlay={'rgba(0,0,0,0.5)'} width='950px' height='725px'
        />
    )
}

export default DisplayVisualizerModal;
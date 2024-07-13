import React, { useEffect, useState } from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import GetPathForm from "./components/get-path-form/GetPathForm";
import pathImg from "../../../assets/pagePanels/paths.png";
import DisplayVisualizerModal from "../../../components/display-visualizer/DisplayVisualizerModal";
import { useModal } from "../../../hooks/useModal";

const PathsPage = () => {

    // State for the modal
    const {showModal, handleOpenModal, handleCloseModal} = useModal();


    const [initialPosition, setInitialPosition] = useState<number[]>();

    const [initialDirection, setInitialDirection] = useState<number>();


    // State responsible for holding the paths
    const [path, setPath] = useState<string>();


    const transportPaths = (path: string) => {
        setPath(path);
    }


    useEffect(() => {
        // path comes like this: "cell(5,2) - cell(5,3) - ..."
        if (path !== undefined) {
            const pathSplitted = path.split(" - ");

            // Get first cell coordinates
            const firstCellCoordinates = pathSplitted[0];
            const firstCellCoordinatesSplitted = firstCellCoordinates.split(",");
            const firstCellX = parseInt(firstCellCoordinatesSplitted[0].split("(")[1]);
            const firstCellY = parseInt(firstCellCoordinatesSplitted[1].split(")")[0]);


            // Get second cell coordinates
            const secondCellCoordinates = pathSplitted[1];
            const secondCellCoordinatesSplitted = secondCellCoordinates.split(",");
            const secondCellX = parseInt(secondCellCoordinatesSplitted[0].split("(")[1]);
            const secondCellY = parseInt(secondCellCoordinatesSplitted[1].split(")")[0]);


            // Set initial position
            setInitialPosition([firstCellY-1, firstCellX-1]);


            // Set initial direction
            if (firstCellX === secondCellX) {
                if (firstCellY < secondCellY) {
                    setInitialDirection(0);
                } else {
                    setInitialDirection(180);
                }
            } else {
                if (firstCellX < secondCellX) {
                    setInitialDirection(90);
                } else {
                    setInitialDirection(270);
                }
            }



        }
    }, [path]);




    const [buildingCode, setBuildingCode] = useState<string>();

    const transportBuildingCode = (buildingCode: string) => {
        setBuildingCode(buildingCode);
    }

    const [floorNumber, setFloorNumber] = useState<number>();

    const transportFloorNumber = (floorNumber: number) => {
        setFloorNumber(floorNumber);
    }


    const [readyToVisualize, setReadyToVisualize] = useState<boolean>(false);

    const isReadyToVisualize = (isReady: boolean) => {
        setReadyToVisualize(isReady);
    }


    const handleModal = () => {
        handleOpenModal();
        // hide body overflow
        document.body.style.overflow = 'hidden';
    }


    const handle3dvClose = () => {
        handleCloseModal();
        setReadyToVisualize(false);
        // show body overflow
        document.body.style.overflow = 'auto';
    }


    return (
        <>
            <PagePanel
                text={"Paths"}
                sentence={"Get the path between two rooms"}
                imagePath={pathImg}
            />

            <div className={'page-content'}>
                <GetPathForm
                    handleModal={handleModal}
                    transportPaths={transportPaths}
                    isReadyToVisualize={isReadyToVisualize}
                    transportBuildingCode={transportBuildingCode}
                    transportFloorNumber={transportFloorNumber}
                />
                {readyToVisualize && <DisplayVisualizerModal
                    id="visualizer-modal"
                    isOpen={showModal && path !== undefined}
                    onRequestClose={handle3dvClose}
                    path={path || ""}
                    buildingCode={buildingCode || ""}
                    floorNumber={floorNumber || 0}
                    initialPosition={initialPosition || [0,0]}
                    initialDirection={initialDirection || 0}
                    isReadyToVisualize={readyToVisualize}
                />}
                
            </div>
            
        </>
    )
};

export default PathsPage;
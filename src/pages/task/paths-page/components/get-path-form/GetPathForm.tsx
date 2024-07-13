import { useCreateFormState } from "../../../../../hooks/useCreateFormState";
import { useEffect, useState } from "react";
import { useDataGet } from "../../../../../hooks/useApiRequest";
import { Building } from "../../../../../interfaces/building";
import Floor from "../../../../../interfaces/floor";
import { toast } from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Form from "../../../../../components/base/form/Form";
import PathForm from "../path-form/PathForm";
import React from "react";
import { RoomInDto } from "../../../../../dtos/in/RoomInDto";
import PathTable from "../path-table/PathTable";
import Title from "../../../../../components/base/title/Title";
import PathInDto from "../../../../../dtos/in/PathInDto";
import Button from "../../../../../components/base/button/Button";

import { BACKGROUND_COLOR, PRIMARY_COLOR, PRIMARY_COLOR_DARK, PRIMARY_COLOR_VARIANT } from "../../../../../utils/colors";

const GetPathForm: React.FC<any> = ({ handleModal, transportPaths, isReadyToVisualize, transportBuildingCode, transportFloorNumber }) => {

    // State for data
    const [paths, setPaths] = useState<PathInDto[]>([]);

    // State for the originRoomComboBox
    const [originRoomComboBox, setOriginRoomComboBox] = useState<boolean>(true);

    // State for the destinationRoomComboBox
    const [destinationRoomComboBox, setDestinationRoomComboBox] = useState<boolean>(true);

    // State for the originFloorComboBox
    const [originFloorComboBox, setOriginFloorComboBox] = useState<boolean>(true);

    // State for the destinationFloorComboBox
    const [destinationFloorComboBox, setDestinationFloorComboBox] = useState<boolean>(true);

    // State responsible for handling ComboBox changes
    const { formContent, handleChangeSelect } = useCreateFormState();

    // Get the buildings from the API
    const {
        data: buildings, error: buildingError, loading: buildingLoading,
        refreshData: getBuildings
    }
        = useDataGet<Building[]>('/campus/buildings');

    // Initialize the table data, only executed once
    useEffect(() => {
        getBuildings();
    }, []);

    // Prepare the buildings data, {value: buildingCode, id: domainId}
    const buildingsWithCode = buildings && buildings
        .filter((building): building is Building & { buildingCode: string; domainId: string } =>
            building.buildingCode !== undefined && building.domainId !== undefined)
        .map((building) =>
            ({ value: building.buildingCode, id: building.domainId }));

    // State responsible for holding the originBuilding domainId
    const [originBuildingId, setOriginBuildingId] = useState<string>();

    // State responsible for holding the destinationBuilding domainId
    const [destinationBuildingId, setDestinationBuildingId] = useState<string>();

    // State responsible for holding the originFloor domainId
    const [originFloorId, setOriginFloorId] = useState<string>();

    // State responsible for holding the destinationFloor domainId
    const [destinationFloorId, setDestinationFloorId] = useState<string>();

    // State responsible for holding the originRoom domainId
    const [originRoomId, setOriginRoomId] = useState<string>();

    // State responsible for holding the destinationRoom domainId
    const [destinationRoomId, setDestinationRoomId] = useState<string>();

    // State responsible for holding the button visibility
    const [isButtonVisible, setButtonVisible] = useState(false);

    // origin building code
    const [originBuildingCode, setOriginBuildingCode] = useState<string>();

    // origin floor number
    const [originFloorNumber, setOriginFloorNumber] = useState<number>();


    // Get the originFloors from the API
    const {
        data: originFloors, error: originFloorError, loading:
        originFloorLoading, refreshData: refreshOriginFloorData
    }
        = useDataGet<Floor[]>(`/campus/floors/${originBuildingId}`);

    // Prepare the floors data, {value: floorNumber, id: domainId}
    const originFloorsWithNumber = originFloors && originFloors
        .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
            floor.floorNumber !== undefined && floor.domainId !== undefined)
        .map((floor) =>
            ({ value: floor.floorNumber, id: floor.domainId }));

    // Get the destinationFloors from the API
    const {
        data: destinationFloors, error: destinationFloorError, loading:
        destinationFloorLoading, refreshData: refreshDestinationFloorData
    }
        = useDataGet<Floor[]>(`/campus/floors/${destinationBuildingId}`);

    // Prepare the floors data, {value: floorNumber, id: domainId}
    const destinationFloorsWithNumber = destinationFloors && destinationFloors
        .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
            floor.floorNumber !== undefined && floor.domainId !== undefined)
        .map((floor) =>
            ({ value: floor.floorNumber, id: floor.domainId }));

    // Get the originRooms from the API
    const {
        data: originRooms, error: originRoomError, loading:
        originRoomLoading, refreshData: refreshOriginRoomData
    }
        = useDataGet<RoomInDto[]>(`/campus/rooms/${originFloorId}`);

    // Prepare the rooms data, {value: roomNumber, id: domainId}
    const originRoomsWithName = originRooms && originRooms
        .filter((room): room is RoomInDto & { name: string; domainId: string } =>
            room.name !== undefined && room.domainId !== undefined)
        .map((room) =>
            ({ value: room.name, id: room.domainId }));

    // Get the destinationRooms from the API
    const {
        data: destinationRooms, error: destinationRoomError, loading:
        destinationRoomLoading, refreshData: refreshDestinationRoomData
    }
        = useDataGet<RoomInDto[]>(`/campus/rooms/${destinationFloorId}`);

    // Prepare the rooms data, {value: roomNumber, id: domainId}
    const destinationRoomsWithName = destinationRooms && destinationRooms
        .filter((room): room is RoomInDto & { name: string; domainId: string } =>
            room.name !== undefined && room.domainId !== undefined)
        .map((room) =>
            ({ value: room.name, id: room.domainId }));

    // Every time the originBuilding changes, update the originBuildingId
    useEffect(() => {
        const buildingElement = document.getElementById(formContent.originBuilding);
        if (buildingElement) {
            const domainId = buildingElement.accessKey;
            setOriginBuildingId(domainId);
            setOriginBuildingCode(buildingElement.innerText);
            if (domainId) {
                setOriginFloorComboBox(false);
            }
        }
    }, [formContent.originBuilding]);

    // Every time the destinationBuilding changes, update the destinationBuildingId
    useEffect(() => {
        const buildingElement = document.getElementById(formContent.destinationBuilding);
        if (buildingElement) {
            const domainId = buildingElement.accessKey;
            setDestinationBuildingId(domainId);
            if (domainId) {
                setDestinationFloorComboBox(false);
            }
        }
    }, [formContent.destinationBuilding]);

    // Every time the originBuilding changes, refresh the originFloor data
    useEffect(() => {
        if (originBuildingId) {
            formContent.originFloor = "";
            formContent.originRoom = "";
            refreshOriginFloorData();
            refreshOriginRoomData();
        }
    }, [originBuildingId]);

    // Every time the destinationBuilding changes, refresh the destinationFloor data
    useEffect(() => {
        if (destinationBuildingId) {
            formContent.destinationFloor = "";
            formContent.destinationRoom = "";
            refreshDestinationFloorData();
            refreshDestinationRoomData();
        }
    }, [destinationBuildingId]);

    // Every time the originFloor changes, update the originFloorId
    useEffect(() => {
        const floorElement = document.getElementById(formContent.originFloor);
        if (floorElement) {
            const domainId = floorElement.accessKey;
            setOriginFloorId(domainId);
            setOriginFloorNumber(parseInt(floorElement.innerText));
            if (domainId) {
                setOriginRoomComboBox(false);
            }
        }
    }, [formContent.originFloor]);

    // Every time the destinationFloor changes, update the destinationFloorId
    useEffect(() => {
        const floorElement = document.getElementById(formContent.destinationFloor);
        if (floorElement) {
            const domainId = floorElement.accessKey;
            setDestinationFloorId(domainId);
            if (domainId) {
                setDestinationRoomComboBox(false);
            }
        }
    }, [formContent.destinationFloor]);

    // Every time the originFloor changes, refresh the originRoom data
    useEffect(() => {
        if (originFloorId) {
            formContent.originRoom = "";
            refreshOriginRoomData();
        }
    }, [originFloorId]);

    // Every time the destinationFloor changes, refresh the destinationRoom data
    useEffect(() => {
        if (destinationFloorId) {
            formContent.destinationRoom = "";
            refreshDestinationRoomData();
        }
    }, [destinationFloorId]);

    // Every time the originRoom changes, update the originRoomId
    useEffect(() => {
        const roomElement = document.getElementById(formContent.originRoom);
        if (roomElement) {
            const domainId = roomElement.accessKey;
            setOriginRoomId(domainId);
        }
    }, [formContent.originRoom]);

    // Every time the destinationRoom changes, update the destinationRoomId
    useEffect(() => {
        const roomElement = document.getElementById(formContent.destinationRoom);
        if (roomElement) {
            const domainId = roomElement.accessKey;
            setDestinationRoomId(domainId);
        }
    }, [formContent.destinationRoom]);


    // If a room is selected in the originRoom, remove it from the list to show for the destinationRoom
    const filteredDestinationRooms = destinationRoomsWithName && destinationRoomsWithName
        .filter((room) => room.value !== formContent.originRoom);

    // If a room is selected in the destinationRoom, remove it from the list to show for the originRoom
    const filteredOriginRooms = originRoomsWithName && originRoomsWithName
        .filter((room) => room.value !== formContent.destinationRoom);

    // Make a get request with the form data using the useGet hook
    const {
        data,
        error,
        refreshData: refreshData,
        loading
    } = useDataGet<PathInDto[]>(`/tasks/path?originFloorId=${originFloorId}&destinationFloorId=${destinationFloorId}&originRoomId=${originRoomId}&destinationRoomId=${destinationRoomId}`);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);


    const requiredFields = [
        formContent.originBuilding,
        formContent.originFloor,
        formContent.originRoom,
        formContent.destinationBuilding,
        formContent.destinationFloor,
        formContent.destinationRoom
    ];

    const handleSubmit = () => {
        const isFormFilled = requiredFields.every((field) => field);
        if (!isFormFilled) {
            toast.warning('Please fill all the required fields!');
            return;
        }
        setButtonVisible(true);
        refreshData();
        clearForm();
    }

    const handleAnimate = () => {
        handleModal();
        isReadyToVisualize(true);
    }

    useEffect(() => {
        if (data) {
            setPaths(data);
            transportPaths(data[0].path);
            transportBuildingCode(originBuildingCode);
            transportFloorNumber(originFloorNumber);
        }
    }, [data]);

    // Method to clear the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
    };


    const pathForm =
        <PathForm
            originBuildingData={buildingsWithCode || []}
            originBuildingValue={formContent.originBuilding}
            originBuildingComboBox={false}
            originFloorData={originFloorsWithNumber || []}
            originFloorValue={formContent.originFloor}
            originFloorComboBox={originFloorComboBox}
            originRoomData={filteredOriginRooms || []}
            originRoomValue={formContent.originRoom}
            originRoomComboBox={originRoomComboBox}
            destinationBuildingData={buildingsWithCode || []}
            destinationBuildingValue={formContent.destinationBuilding}
            destinationBuildingComboBox={false}
            destinationFloorData={destinationFloorsWithNumber || []}
            destinationFloorValue={formContent.destinationFloor}
            destinationFloorComboBox={destinationFloorComboBox}
            destinationRoomData={filteredDestinationRooms || []}
            destinationRoomValue={formContent.destinationRoom}
            destinationRoomComboBox={destinationRoomComboBox}
            handleChangeSelect={handleChangeSelect}
        />

    if (loading) {
        return <LoadingAnimation />;
    }


    if (data) {
        return (
            <>
                <PathTable paths={paths || []} error={error} loading={loading} />
                <Button buttonId='btnAnimatePath'
                    label='Open Visualizer'
                    backgroundColor={PRIMARY_COLOR}
                    hoverColor={PRIMARY_COLOR_VARIANT}
                    activeColor={PRIMARY_COLOR_DARK}
                    textColor={BACKGROUND_COLOR}
                    onClick={handleAnimate}
                    isDisabled={false}
                    styles={{ display: isButtonVisible ? 'block' : 'none', position: 'absolute', left: '50%', transform: 'translate(-50%, 0)' }} // Put the button in the center
                />
                <br /><br />
                <br /><br />
                <Title text={"Path Between Two Buildings"} className={"main-titles"}></Title>
                <Form form={pathForm} onSubmit={handleSubmit} waitingForResponse={false} />
            </>
        )
    } else {

        return (
            <>
                <Title text={"Path Between Two Buildings"} className={"main-titles"}></Title>
                <Form form={pathForm} onSubmit={handleSubmit} waitingForResponse={false} />
            </>
        )
    }
}
export default GetPathForm;

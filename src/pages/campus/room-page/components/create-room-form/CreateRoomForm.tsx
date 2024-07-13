import Form from "../../../../../components/base/form/Form";
import RoomForm from "../room-form/RoomForm";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {Building} from "../../../../../interfaces/building";
import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import Floor from "../../../../../interfaces/floor";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {toast} from "react-toastify";
import {mapRoomDataToRoomOut} from "../../../../../mappers/roomMapper";
import {RoomOutDto} from "../../../../../dtos/out/roomOutDto";

interface CreateRoomFormProps {
    refreshData: () => void;
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({refreshData}) => {

    // State for the floor ComboBox
    const [floorComboBox, setFloorComboBox] = useState<boolean>(true);

    // Prepare Post request
    const {data, loading: loadingPost, sendData} = useDataPost<RoomOutDto>();

    // State for the form content
    const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();

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
            ({value: building.buildingCode, id: building.domainId}));


    // State responsible for holding the building domainId
    const [buildingId, setBuildingId] = useState<string>();
    // State responsible for holding the floor domainId
    const [floorId, setFloorId] = useState<string>();

    // Get the floors from the API - dependent from the buildingId
    const {
        data: floors, error: floorError, loading:
            floorLoading, refreshData: refreshFloorData
    }
        = useDataGet<Floor[]>(`/campus/floors/${buildingId}`);

    // Prepare the floors data, {value: floorNumber, id: domainId}
    const floorsWithNumber = floors && floors
        .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
            floor.floorNumber !== undefined && floor.domainId !== undefined)
        .map((floor) =>
            ({value: floor.floorNumber, id: floor.domainId}));

    // Every time the building changes, update the buildingId
    useEffect(() => {
        const buildingElement = document.getElementById(formContent.building);
        if (buildingElement) {
            const domainId = buildingElement.accessKey;
            setBuildingId(domainId);
            if (domainId) {
                setFloorComboBox(false);
            }
        }

        // Enable the floor ComboBox
    }, [formContent.building]);

    // Every time the floor changes, update the floorId
    useEffect(() => {
        const floorElement = document.getElementById(formContent.floor);
        if (floorElement) {
            const domainId = floorElement.accessKey;
            setFloorId(domainId);
        }
    }, [formContent.floor]);

    // Every time the buildingId changes, refresh the floor data
    useEffect(() => {
        if (buildingId) {
            refreshFloorData();
        }
    }, [buildingId]);


    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        // If the data is present, inform the user
        if (data && data.name) {
            toast.success(`Room ${data.name} was created successfully!`);
            refreshData();
        }
    }, [data]);

    const requiredFields = [
        formContent.name,
        formContent.category,
        formContent.building,
        formContent.floor,
        formContent.description,
        formContent.initialX,
        formContent.initialY,
        formContent.finalX,
        formContent.finalY,
        formContent.doorX,
        formContent.doorY,
        formContent.doorOrientation
    ];


    const handleSubmit = async () => {
        // Check if any field is empty
        const isFormFilled = requiredFields.every((field) => field);
        if (!isFormFilled) {
            toast.warning("Please fill all the required fields!");
            return;
        }

        const roomToCreate = mapRoomDataToRoomOut(
            formContent.name,
            formContent.category.toUpperCase(),
            formContent.description,
            floorId || "",
            parseInt(formContent.initialX),
            parseInt(formContent.initialY),
            parseInt(formContent.finalX),
            parseInt(formContent.finalY),
            parseInt(formContent.doorX),
            parseInt(formContent.doorY),
            formContent.doorOrientation.toUpperCase()
        )

        try {
            // Send the create request
            await sendData("/campus/rooms", roomToCreate);
            // Clear the form
            clearForm();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    // Method to clear the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
    };


    // Show error if there is one
    if (buildingError) {
        toast.error(buildingError.message);
    }
    if (floorError) {
        toast.error(floorError.message);
    }


    // Show loading animation while loading
    if (buildingLoading || floorLoading || loadingPost) {
        return <LoadingAnimation/>;
    }


    const roomForm =
        <RoomForm nameValue={formContent.name} categoryValue={formContent.category} buildingValue={formContent.building}
                  floorValue={formContent.floor} floorComboBox={floorComboBox}
                  descriptionValue={formContent.description}
                  initialXValue={formContent.initialX} initialYValue={formContent.initialY}
                  finalXValue={formContent.finalX} finalYValue={formContent.finalY}
                  doorXValue={formContent.doorX} doorYValue={formContent.doorY}
                  doorOrientationValue={formContent.doorOrientation}
                  buildingsData={buildingsWithCode || []} floorsData={floorsWithNumber || []}
                  handleChangeTextField={handleChangeTextField} handleChangeSelect={handleChangeSelect}/>

    return <Form buttonId={'create-room-button'} form={roomForm} onSubmit={handleSubmit} buttonText={"Create Room"} waitingForResponse={false}/>;
}

export default CreateRoomForm;
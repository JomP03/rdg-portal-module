import Form from "../../../../../components/base/form/Form";
import ElevatorForm from "../elevator-form/ElevatorForm";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {Building} from "../../../../../interfaces/building";
import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import Floor from "../../../../../interfaces/floor";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {toast} from "react-toastify";
import ElevatorOutDTO from "../../../../../dtos/out/elevatorOutDto";
import {mapElevatorDataToElevatorOut} from "../../../../../mappers/elevatorMapper";




interface CreateElevatorFormProps {
    refreshData: () => void;
}


const CreateElevatorForm: React.FC<CreateElevatorFormProps> = ({refreshData}) => {

    // State for floor Ids
    const [floorIds, setFloorIds] = useState<string[]>([]);

    // State for the floor ComboBox
    const [floorMultipleComboBox, setFloorComboBox] = useState<boolean>(true);

    // Prepare Post request
    const {data, loading: loadingPost, sendData} = useDataPost<ElevatorOutDTO>();

    // State for the form content
    const { formContent, formContentMultiSelect, handleChangeTextField, handleChangeMultiSelect, handleChangeSelect} = useCreateFormState();

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

    // Store responsible for holding the building domainId
    const [buildingId, setBuildingId] = useState<string>();


    // Get the floors from the API
    const {
        data: floors, error: floorError, loading: floorLoading,
        refreshData: refreshFloorsData
    }
        = useDataGet<Floor[]>(`/campus/floors/${buildingId}`);

    // Prepare the floors data, {value: floorNumber, id: domainId}
    const floorsWithNumber = floors && floors
        .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
            floor.floorNumber !== undefined && floor.domainId !== undefined)
        .map((floor) =>
            ({ value: floor.floorNumber, id: floor.domainId }));


    // Every time the building changes, update the buildingId
    useEffect(() => {
        const buildingElement = document.getElementById(formContent.building);
        if (buildingElement) {
            const domainId = buildingElement.accessKey;
            setBuildingId(domainId);
            setFloorComboBox(false);
        }

        // Enable the floor ComboBox
    }, [formContent.building]);

    // Everytime the buildingId changes, updates the floors
    useEffect(() => {
        if(buildingId){
            refreshFloorsData();
        }
    }, [buildingId]);


    // Every time the floor is selected, update the floorIds
    useEffect(() => {
        if(floors && formContentMultiSelect.floors){
            const floorIds = formContentMultiSelect.floors.map((floorNumber) => {
                const floor = floors.find((floor) => floor.floorNumber === parseInt(floorNumber));
                return floor?.domainId;
            });
            setFloorIds(floorIds as string[]);
        }
    }, [formContentMultiSelect.floors]);


    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        if(data){
            toast.success('Elevator created successfully!');
            refreshData();
        }
    }, [data]);

    const requiredFields = [
        formContent.xposition,
        formContent.yposition,
        formContentMultiSelect.floors,
        formContent.building,
        formContent.orientation,
    ];

    // Function responsible for checking if all the required fields are filled
    const checkRequiredFields = () => {
        return requiredFields.every((field) => field !== '');
    }

    // Function responsible for sending the data to the API
    const handleSubmit = async () => {
        if(!checkRequiredFields()){
            toast.warn('Please fill all the required fields');
            return;
        }



        const elevatorToCreate = mapElevatorDataToElevatorOut(
            formContent.brand ? formContent.brand : undefined,
            formContent.model ? formContent.model : undefined,
            formContent.serialNumber ? formContent.serialNumber : undefined,
            formContent.description ? formContent.description : undefined,
            parseInt(formContent.xposition),
            parseInt(formContent.yposition),
            formContent.orientation,
            buildingId,
            floorIds
        )


        try{
            await sendData('/campus/elevators', elevatorToCreate);
            // Clear the form
            clearForm();
            refreshData();
        } catch(error: any){
            toast.error(error.message);
        }
    }
    
    // Function responsible for clearing the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
        for (const key in formContentMultiSelect) {
            formContentMultiSelect[key as keyof typeof formContentMultiSelect] = [];
        }
    };


    if (buildingLoading || floorLoading || loadingPost) {
        return <LoadingAnimation/>;
    }

    const elevatorForm =
        <ElevatorForm 
            buildingData={buildingsWithCode || []}
            floorsData={floorsWithNumber || []}
            buildingCodeValue={formContent.building}
            floorsValue={formContentMultiSelect.floors}
            xPositionValue={formContent.xposition}
            yPositionValue={formContent.yposition}
            orientationValue={formContent.orientation}
            descriptionValue={formContent.description}
            serialNumberValue={formContent.serialNumber}
            brandValue={formContent.brand}
            modelValue={formContent.model}
            floorComboBox={floorMultipleComboBox}
            handleChangeTextField={handleChangeTextField}
            handleChangeSelect={handleChangeSelect}
            handleMultipleChangeSelect={handleChangeMultiSelect}
        />

    return <Form form={elevatorForm} onSubmit={handleSubmit} buttonText={"Create Elevator"} waitingForResponse={false}/>;

}



export default CreateElevatorForm;

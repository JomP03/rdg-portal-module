import React, { useEffect, useState } from 'react';
import { useEditFormState } from "../../../../../hooks/useEditFormState";
import ElevatorForm from '../elevator-form/ElevatorForm';
import Form from "../../../../../components/base/form/Form";
import ElevatorOutDto from '../../../../../dtos/out/elevatorOutDto';
import { useDataGet, useDataPatch } from '../../../../../hooks/useApiRequest';
import { toast } from 'react-toastify';
import { Building } from '../../../../../interfaces/building';
import Floor from '../../../../../interfaces/floor';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import { mapElevatorDataToElevatorOut} from '../../../../../mappers/elevatorMapper';


interface EditElevatorFormProps {
  formData: { [value: string]: string };
  handleCloseModal: () => void;
  refreshData: () => void;
}

const EditElevatorForm: React.FC<EditElevatorFormProps> = ({ formData, handleCloseModal, refreshData }) => {

    // State for floor Ids
    const [floorIds, setFloorIds] = useState<string[]>([]);

  
    // Prepare Patch request
    const {data, loading: loadingPatch, sendData} = useDataPatch<ElevatorOutDto>();



    // State for the form content
    const { formContent, formContentMultiSelect, handleChangeTextField, handleChangeMultiSelect, handleChangeSelect} = useEditFormState(formData);


    // Store responsible for holding the building domainId
    const [buildingId, setBuildingId] = useState<string>();


    // Get the buildings from the API
    const {
        data: buildings, error: buildingError, loading: buildingLoading,
        refreshData: getBuildings
    }
        = useDataGet<Building[]>('/campus/buildings');

    // Initialize the table data, only executed once
    useEffect(() => {
            getBuildings();
    }, [formData.buildingCode]);


    useEffect(() => {
        if(buildings){
            const building = buildings.find((building) => building.buildingCode === formData.buildingCode);
            setBuildingId(building?.domainId);
        }
    }, [buildings]);


    


    // Get the floors from the API
    const {
        data: floors, error: floorError, loading: floorLoading,
        refreshData: getFloors
    }
        = useDataGet<Floor[]>(`/campus/floors/${buildingId}`);

    // Initialize the table data, only executed once
    useEffect(() => {
        if(buildingId){
            getFloors();
        }
    }, [buildingId]);



    // Prepare the floors data, {value: floorNumber, id: domainId}
    const floorsWithNumber = floors && floors
        .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
            floor.floorNumber !== undefined && floor.domainId !== undefined)
        .map((floor) =>
            ({ value: floor.floorNumber, id: floor.domainId }));


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
            toast.success('Elevator edited successfully!');
            refreshData();
        }
    }, [data]);

    const requiredFields = [
        formContentMultiSelect.floors,
    ];



    // Function responsible for sending the data to the API
    const handleEdit = async () => {


        // check if the required fields are filled
        for (const field of requiredFields) {
            if (!field) {
                toast.warn('Please fill all the required fields!');
                return;
            }

            // if floors check if it has at least one floor
            if (field === formContentMultiSelect.floors && field.length === 0) {
                toast.warn('Please select at least one floor!');
                return;
            }
        }



        const elevatorToEdit = mapElevatorDataToElevatorOut(
            formContent.brand ? formContent.brand : undefined,
            formContent.model ? formContent.model : undefined,
            formContent.serialNumber ? formContent.serialNumber : undefined,
            formContent.description ? formContent.description : undefined,
            parseInt(formContent.xposition),
            parseInt(formContent.yposition),
            formContent.orientation ? formContent.orientation.toUpperCase() : undefined,
            undefined,
            floorIds
        )


        try{
            await sendData('/campus/elevators/' + formData.domainId, elevatorToEdit);
            // Clear the form
            refreshData();

            handleCloseModal();

            toast.success('Elevator edited successfully!');
        } catch(error: any){
            toast.error(error.message);
        }
    }


    if (buildingLoading || floorLoading || loadingPatch) {
        return <LoadingAnimation/>;
    }

    const elevatorForm =
        <ElevatorForm 
            buildingData={[]}
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
            floorComboBox={false}
            handleChangeTextField={handleChangeTextField}
            handleChangeSelect={handleChangeSelect}
            handleMultipleChangeSelect={handleChangeMultiSelect}
            disabledFields={
                {
                    building: true,
                    floors: false,
                    xposition: false,
                    yposition: false,
                    orientation: false,
                    description: false,
                    serialNumber: false,
                    brand: false,
                    model: false,
                }
            
            }
        />

    return <Form form={elevatorForm} onSubmit={handleEdit} buttonText={"Edit Elevator"} waitingForResponse={false}/>;


}


export default EditElevatorForm;
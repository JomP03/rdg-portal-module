import Form from "../components/base/form/Form";
import {useDataGet} from "../hooks/useApiRequest";
import {Building} from "../interfaces/building";
import React, {useEffect, useState} from "react";
import Floor from "../interfaces/floor";
import {toast} from "react-toastify";
import {useCreateFormState} from "../hooks/useCreateFormState";
import ComboBox from "../components/base/combo-box/ComboBox";


interface SelectFloorFormProps {
    loadFloor(buildingCode: string, floorNumber: number): void;
}

const SelectFloorForm: React.FC<SelectFloorFormProps> = ({loadFloor}) => {

    // State for the floor ComboBox
    const [floorComboBox, setFloorComboBox] = useState<boolean>(true);


    // State for the form content
    const {formContent, handleChangeSelect} = useCreateFormState();


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


    // Define the required fields
    const requiredFields = [formContent.building, formContent.floor];

    const handleSubmit = () => {
        // Check if any field is empty
        const isFormFilled = requiredFields.every((field) => field);
        if (!isFormFilled) {
            toast.warning("Please fill all the required fields!");
            return;
        }

        loadFloor(formContent.building, parseInt(formContent.floor));
    }

    const getFloorDataForm =
        <div className="form-row">
            <ComboBox data={buildingsWithCode!} label={'Building'} name={'building'} value={formContent.building}
                      onChange={handleChangeSelect} width={'25%'}/>
            <ComboBox data={floorsWithNumber!} label={'Floor'} name={'floor'} value={formContent.floor}
                      onChange={handleChangeSelect} disabled={floorComboBox}  width={'25%'}/>
        </div>

    return <Form form={getFloorDataForm} onSubmit={handleSubmit} buttonText={"Visualize"} waitingForResponse={false}/>;

}

export default SelectFloorForm;
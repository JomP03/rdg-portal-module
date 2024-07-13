import React, {useEffect, useState} from "react";
import FilterAccordion from "../../../../../components/base/filter-accordion/FilterAccordion";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import InBuildingFilter from "./InBuildingFilter";
import {useDataFilters} from "../../../../../hooks/useDataFilters";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import { Building } from "../../../../../interfaces/building";
import {useDataGet} from "../../../../../hooks/useApiRequest";
import { mapElevatorInToElevatorView } from "../../../../../mappers/elevatorMapper";


interface ElevatorFiltersProps {
    handleDataChange: (data: any[]) => void;
    setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const ElevatorFilters: React.FC<ElevatorFiltersProps> = ({handleDataChange, setIsFilterOn}) => {
    
    // State responsible for handling TextField/ComboBox changes
    const { formContent, handleChangeSelect } = useCreateFormState();

    // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
    const [elevatorData, setElevatorData] = useState<any[]>();

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

    // State responsible for holding the building domainId
    const [buildingId, setBuildingId] = useState<string>();

    // Every time the building changes, update the buildingId
    useEffect(() => {
        const buildingElement = document.getElementById(formContent.building);
        if (buildingElement) {
            const domainId = buildingElement.accessKey;
            setBuildingId(domainId);
        }
    }, [formContent.building]);

    // Use effect to define the table
    useEffect(() => {
        if (elevatorData) {
            const elevators = elevatorData.map(mapElevatorInToElevatorView);
            handleDataChange(elevators || []);
        }
    }, [elevatorData]);


    // Handle the filter button click
    const { handleClick, loading } = useDataFilters(
        `/campus/elevators//inBuilding/${buildingId}`,
        setElevatorData,
        [formContent.building]);

    const handleFilterClick = () => {
        setIsFilterOn(0);
        handleClick();
    }

    
    if (loading) {
        return <LoadingAnimation />;
    }

    return (
        <>
        <FilterAccordion filters={[
            {
                name: 'By Building',
                component: <InBuildingFilter
                    buildingData={buildingsWithCode || []}
                    buildingValue={formContent.building}
                    handleChangeSelect={handleChangeSelect}/>,
                onClick: handleFilterClick
            },
        ]}/>
        </>
    )
    
}

export default ElevatorFilters;

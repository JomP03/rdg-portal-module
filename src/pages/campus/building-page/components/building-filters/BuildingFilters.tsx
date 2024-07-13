import React, {useEffect, useState} from "react";
import FilterAccordion from "../../../../../components/base/filter-accordion/FilterAccordion";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import MinAndMaxFilter from "./MinAndMaxFilter";
import {useDataFilters} from "../../../../../hooks/useDataFilters";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {mapBuildingToBuildingDto} from "../../../../../mappers/buildingMapper";


interface BuildingFiltersProps {
    handleDataChange: (data: any[]) => void;
    setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const BuildingFilters: React.FC<BuildingFiltersProps> = ({handleDataChange, setIsFilterOn}) => {

    // State responsible for handling TextField/ComboBox changes
    const {formContent, handleChangeTextField,} = useCreateFormState();

    // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
    const [buildingData, setBuildingData] = useState<any[]>();

    // Use effect to define the table
    useEffect(() => {
        if (buildingData) {
            const buildings = buildingData?.map((building) => mapBuildingToBuildingDto(building));
            handleDataChange(buildings || []);
        }
    }, [buildingData]);

    // Handle Filter process
    const {handleClick, loading} =
        useDataFilters(`/campus/buildings/filter?minFloors=${parseInt(formContent.min)}&maxFloors=${parseInt(formContent.max)}`,
            setBuildingData, [formContent.min, formContent.max]);

    const handleFilter = () => {
        setIsFilterOn(0);
        handleClick();
    }

    if (loading) {
        return <LoadingAnimation/>;
    }

    return (
        <>
            <FilterAccordion filters={[
                {
                    name: 'By Min and Max Floors',
                    component: <MinAndMaxFilter
                        formContent={formContent}
                        handleChangeTextField={handleChangeTextField}/>,
                    onClick: handleFilter
                },
            ]}/>
        </>
    );
}


export default BuildingFilters;
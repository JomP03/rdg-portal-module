import {useCreateFormState} from "../../../../../../hooks/useCreateFormState";
import React, {useEffect, useState} from "react";
import {mapRobisepInToRobisepView} from "../../../../../../mappers/robisepMapper";
import {useDataFilters} from "../../../../../../hooks/useDataFilters";
import LoadingAnimation from "../../../../../../components/loading-animation/LoadingAnimation";
import FilterAccordion from "../../../../../../components/base/filter-accordion/FilterAccordion";
import ByNickname from "./../ByNickname";
import ByTaskType from "./../ByTaskType";

interface RobisepFiltersProps {
    handleDataChange: (data: any[]) => void;
    setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const RobisepFilters: React.FC<RobisepFiltersProps> = ({handleDataChange, setIsFilterOn}) => {

    // State responsible for handling TextField/ComboBox changes
    const {formContent, formContentMultiSelect,
        handleChangeTextField, handleChangeMultiSelect} = useCreateFormState();

    // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
    const [robisepData, setRobisepData] = useState<any[]>();

    // Use effect to define the table
    useEffect(() => {
        if (robisepData) {
            const robiseps = robisepData?.map((robisep) => mapRobisepInToRobisepView(robisep));
            handleDataChange(robiseps || []);
        }
    }, [robisepData]);

    // Handle taskType Filter process
    const {handleClick: handleTaskType, loading: loadingTaskType} =
        useDataFilters(`/fleet/robiseps/filter?taskType=${formContentMultiSelect.tasksType}`,
            setRobisepData, [formContentMultiSelect.tasksType]);

    const handleTaskTypeClick = () => {
        setIsFilterOn(1);
        handleTaskType();

        // If there is any value "PICKUP AND DELIVERY" in the multiSelect, change it to "TRANSPORT"
        for (let i = 0; i < formContentMultiSelect.tasksType.length; i++) {
            if (formContentMultiSelect.tasksType[i] === "PICKUP AND DELIVERY") {
                formContentMultiSelect.tasksType[i] = "TRANSPORT";
            }
        }
    }

    // Handle Nickname Filter process
    const {handleClick: handleNickname, loading: loadingNickname} =
        useDataFilters(`/fleet/robiseps/filter?nickname=${formContent.nickname}`,
            setRobisepData, [formContent.nickname]);

    const handleNicknameClick = () => {
        setIsFilterOn(0);
        handleNickname();
    }


    if (loadingTaskType || loadingNickname) {
        return <LoadingAnimation/>;
    }

    return (
        <FilterAccordion filters={[
            {
                name: 'By Nickname',
                component: <ByNickname
                    formContent={formContent}
                    handleChangeTextField={handleChangeTextField}/>,
                onClick: handleNicknameClick
            },
            {
                name: 'By Task Type',
                component: <ByTaskType
                    formContent={formContentMultiSelect}
                    handleSelectChange={handleChangeMultiSelect}/>,
                onClick: handleTaskTypeClick
            },
            ]}/>
    );
}

export default RobisepFilters;
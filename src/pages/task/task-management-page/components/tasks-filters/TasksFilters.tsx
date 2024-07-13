import { useEditFormState } from "../../../../../hooks/useEditFormState";
import FilterAccordion from "../../../../../components/base/filter-accordion/FilterAccordion";
import ByState from "./ByState";
import { useDataFilters } from "../../../../../hooks/useDataFilters";
import React, { useEffect, useState } from "react";
import { mapTaskInToTaskView } from "../../../../../mappers/taskMapper";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import { UserInDto } from "../../../../../dtos/in/UserInDto";
import { useDataGet, useUserGet } from "../../../../../hooks/useApiRequest";
import RobisepTypeInDTO from "../../../../../dtos/in/RobisepTypeInDto";
import { useCreateFormState } from "../../../../../hooks/useCreateFormState";
import ByStateTypeUser from "./ByStateTypeUser";
import { UsersResponseList } from "../../../../../dtos/in/UsersResponseList";


interface TasksFiltersProps {
    handleDataChange: (data: any[]) => void;
    refreshData: () => void;
    setFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const TasksFilters: React.FC<TasksFiltersProps> = ({ handleDataChange, refreshData, setFilterOn }) => {

    // State responsible for handling TextField/ComboBox changes
    const { formContent, formContentMultiSelect, handleChangeSelect, handleChangeMultiSelect } = useCreateFormState();

    // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
    const [stateDate, setStateData] = useState<any[]>();

    const { handleClick: handleTaskState, loading: loadingTaskState } =
        useDataFilters(`/tasks/tasks/state?state=${formContentMultiSelect.state}`,
            setStateData, [formContentMultiSelect.state]);

    const handleStateFilter = () => {
        setFilterOn(0);
        handleTaskState();
    }

    // Get the users from the API
    const {
        data: users, error: usersError, loading: usersLoading,
        refreshData: getUsers
    } = useUserGet<UsersResponseList>('/Users');


    // Prepare the users data
    const usersWithIdAndEmail = users?.users && users?.users
        .filter((user): user is UserInDto & { email: string; iamId: string } =>
            user.email !== undefined && user.iamId !== undefined)
        .map((user) =>
            ({ value: user.email, id: user.iamId }));



    // State responsible for holding the user IamId
    const [userIamId, setUserIamId] = useState<string>();

    // Every time the building changes, update the buildingId
    useEffect(() => {
        const userElement = document.getElementById(formContent.user);
        if (userElement) {
            const domainId = userElement.accessKey;
            setUserIamId(domainId);
        }
    }, [formContent.user]);


    // State responsible for holding the robisepTYpe domainId
    const [robisepTypeId, seRobisepTypeId] = useState<string>();

    // Get the robisepTypes from the API
    const {
        data: robisepTypes, error: robisepError, loading: robisepTypeLoading,
        refreshData: getRobisepTypes
    } = useDataGet<RobisepTypeInDTO[]>('/fleet/robisepsType');


    // Prepare the robisepTypes data
    const robisepTypeWithDesignation = robisepTypes && robisepTypes
        .filter((robisepType): robisepType is RobisepTypeInDTO & { designation: string; domainId: string } =>
            robisepType.designation !== undefined && robisepType.domainId !== undefined)
        .map((robisepType) =>
            ({ value: robisepType.designation, id: robisepType.domainId }));

    useEffect(() => {
        const robisepTypeElement = document.getElementById(formContent.robisepType);
        if (robisepTypeElement) {
            const domainId = robisepTypeElement.accessKey;
            seRobisepTypeId(domainId);
        }
    }, [formContent.robisepType]);

    const [getUrl, setGetUrl] = useState<string>('/tasks/tasks?');

    const { handleClick: handleComplexClick, loading: loadignComplexFilter } = useDataFilters(
        getUrl,
        setStateData, []);


    const handleComplexFilter = () => {
        let url = '/tasks/tasks?';

        if( formContentMultiSelect.complexState != undefined && formContentMultiSelect.complexState.length > 0) {
            url += `state=${formContentMultiSelect.complexState}&`;
            
        }

        if(userIamId) {
            url += `personId=${userIamId}&`;
        }

        if(robisepTypeId) {
            url += `robisepType=${robisepTypeId}&`;
        }
        
        setGetUrl(url);
        setFilterOn(1);
        handleComplexClick();
    }


    // Initialize the data, only executed once
    useEffect(() => {
        getUsers();
        getRobisepTypes();
    }, []);


    // Use effect to define the table
    useEffect(() => {
        if (stateDate) {
            const robiseps = stateDate?.map((task) => mapTaskInToTaskView(task));
            handleDataChange(robiseps || []);
        }
    }, [stateDate]);

    if (loadingTaskState) {
        return <LoadingAnimation />;
    }

    return (
        <FilterAccordion filters={[
            {
                name: 'By State',
                component: <ByState formContent={formContentMultiSelect} handleMultiSelectChange={handleChangeMultiSelect} />,
                onClick: handleStateFilter
            },
            {
                name: 'By User/State/Type',
                component: <ByStateTypeUser formContent={formContent} formContentMultiSelect={formContentMultiSelect} usersData={usersWithIdAndEmail || []} typesData={robisepTypeWithDesignation || []} handleMultiSelectChange={handleChangeMultiSelect} handleSelectChange={handleChangeSelect} />,
                onClick: handleComplexFilter
            }
        ]} />
    )
}

export default TasksFilters;
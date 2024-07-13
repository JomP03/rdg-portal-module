import React, {useEffect, useState} from 'react';
import {useDataGet, useDataPatch} from '../../../../../hooks/useApiRequest';
import {toast} from 'react-toastify';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import {useEditFormState} from '../../../../../hooks/useEditFormState';
import {UpdateTaskStateOutDto} from "../../../../../dtos/out/UpdateTaskStateOutDto";
import RobisepInDTO from "../../../../../dtos/in/RobisepInDTO";
import ManageTaskRequistionForm from "../manage-task-requistion-form/ManageTaskRequistionForm";


interface UpdateStateFormProps {
    formData: { [value: string]: string };
    handleCloseModal: () => void;
    refreshData: () => void;
}

const UpdateStateForm: React.FC<UpdateStateFormProps> = ({
                                                             formData,
                                                             handleCloseModal,
                                                             refreshData
                                                         }) => {

    // Prepare Patch request
    const {data, loading: loadingPatch, sendData} = useDataPatch<UpdateTaskStateOutDto>();

    // Store responsible for holding the robisep code
    const [robisepCode, setRobisepCode] = useState<string>();
    const {formContent, formContentMultiSelect, handleChangeSelect} = useEditFormState(formData);
    // Get the buildings from the API
    const {data: robiseps, loading: robisepsLoading, refreshData: getRobiseps}
        = useDataGet<RobisepInDTO[]>('/fleet/robiseps');

    let taskTypeSelected: string;
    if (formData.taskType === "PICKUP AND DELIVERY") {
        taskTypeSelected = "TRANSPORT";
    }
    else {
        taskTypeSelected = formData.taskType;
    }


    // Get the robiseps with code
    const robisepsWithCode = robiseps && robiseps
        .filter((robisep): robisep is RobisepInDTO & { robisepCode: string; code: string } =>
            robisep.code !== undefined)
        .filter((robisep) => robisep.robisepType.designation === formData.robisepType)
        .map((robisep) =>
            ({value: robisep.code, id: robisep.code}));

    // Every time the robisep changes, update the robisep code
    useEffect(() => {
        if (formData) {
            const robisepElement = document.getElementById(formContent.robisepCode);
            if (robisepElement) {
                const code = robisepElement.accessKey;
                setRobisepCode(code);
            }
        }

    }, [formContent.robisepCode]);


    // Initialize the table data, only executed once
    useEffect(() => {
        getRobiseps();
    }, [formData.robisepCode]);


    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        if (data) {
            refreshData();
        }
    }, [data]);

    const requiredFields = [formContent.robisepCode];

    // Function responsible for accepting the task
    const handleAccept = async () => {

        // Check if all the required fields are filled
        for (const field of requiredFields) {
            if (!field) {
                toast.warn('Please fill all the required fields!');
                return;
            }
        }

        try {
            const editDto: UpdateTaskStateOutDto = {
                robisepCode: robisepCode,
                newTaskState: 'ACCEPTED',
                taskType: taskTypeSelected,
            };
            await sendData('/tasks/tasks/' + formData.taskCode, editDto);

            refreshData();
            handleCloseModal();

            toast.success('You accepted the task sucessfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    }


    // Function responsible for rejecting the task
    const handleReject = async () => {

        try {
            const editDto: UpdateTaskStateOutDto = {
                newTaskState: 'REFUSED',
                taskType: taskTypeSelected,
            };

            await sendData('/tasks/tasks/' + formData.taskCode, editDto);

            refreshData();
            handleCloseModal();

            toast.success('You rejected the task sucessfully!');
        } catch (error: any) {
            toast.error(error.message);
        }
    }


    if (loadingPatch) {
        return <LoadingAnimation/>;
    }

    return <ManageTaskRequistionForm robisepData={robisepsWithCode || []}
                                     robisepValue={formContent.robisepCode}
                                     handleChangeSelect={handleChangeSelect}
                                     handleAccept={handleAccept}
                                     handleReject={handleReject}/>

}


export default UpdateStateForm;
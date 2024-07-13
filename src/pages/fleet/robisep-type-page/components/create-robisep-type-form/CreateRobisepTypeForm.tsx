import React, {useEffect} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import {useDataPost} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {mapRobisepTypeDataToRobisepTypeOut} from "../../../../../mappers/robisepTypeMapper";
import RobisepTypeOutDTO from "../../../../../dtos/out/RobisepTypeOutDto";
import RobisepTypeForm from "./../RobisepTypeForm";
import Form from "../../../../../components/base/form/Form";


interface CreateRobisepTypeFormProps {
    refreshData: () => void;
}

const CreateRobisepTypeForm: React.FC<CreateRobisepTypeFormProps> = ({refreshData}) => {
    // Handle changes on the text fields
    const {formContent, formContentMultiSelect, handleChangeTextField, handleChangeMultiSelect} = useCreateFormState();
    // Use the usePost hook to handle the create request
    const {data, loading, sendData} = useDataPost<RobisepTypeOutDTO>();

    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        // If the data is present, inform the user and refresh the data in the table
        if (data && data.designation) {
            // Show success toast
            toast.success(`Robisep Type ${data.designation} was created successfully!`);
        }
    }, [data]);

    // Required fields to check if the form is filled
    const requiredFields = [
        formContent.designation,
        formContent.brand,
        formContent.model,
        formContentMultiSelect.tasksType,
    ];

    // Handle the submission of the form
    const handleSubmit = async () => {
        // Check if any field is empty
        const isFormFilled = requiredFields.every((field) => field);
        if (!isFormFilled) {
            toast.warning("Please fill all the required fields!");
            return;
        }

        const robisepTypeToCreate = mapRobisepTypeDataToRobisepTypeOut(
            formContent.designation,
            formContent.brand,
            formContent.model,
            formContentMultiSelect.tasksType,
        )

        try {
            // Send the create request
            await sendData("/fleet/robisepsType", robisepTypeToCreate);
            // Clear the form
            clearForm();
            refreshData();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    // Method to clear the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
        for (const key in formContentMultiSelect) {
            formContentMultiSelect[key as keyof typeof formContentMultiSelect] = [];
        }
    };

    if (loading) {
        return <LoadingAnimation/>;
    }


    const robisepTypeForm =
        <RobisepTypeForm designationValue={formContent.designation} brandValue={formContent.brand}
                         modelValue={formContent.model} tasksTypeValue={formContentMultiSelect.tasksType}
                         handleChangeTextField={handleChangeTextField} handleChangeSelect={handleChangeMultiSelect}
                         />

    return <Form form={robisepTypeForm} onSubmit={handleSubmit} buttonText={"Create Robisep Type"} waitingForResponse={false}/>;
}

export default CreateRobisepTypeForm;
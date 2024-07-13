import React, {useEffect} from "react";
import Form from "../../../../../components/base/form/Form";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import BuildingForm from "../building-form/BuildingForm";
import {useDataPost} from "../../../../../hooks/useApiRequest";
import {Building} from "../../../../../interfaces/building";
import {mapBuildingDtoToBuilding} from "../../../../../mappers/buildingMapper";
import {toast} from "react-toastify";


interface CreateBuildingFormProps {
    refreshData: () => void;
}

const CreateBuildingForm: React.FC<CreateBuildingFormProps> = ({refreshData}) => {
    // Handle changes on the text fields
    const {formContent, handleChangeTextField} = useCreateFormState();
    // Use the usePost hook to handle the create request
    const {data, loading, sendData} = useDataPost<Building>();

    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        // If the data is present, inform the user
        if (data && data.buildingCode) {
            toast.success(`Building ${data.buildingCode} was created successfully!`);
            refreshData();
        }
    }, [data]);

    // Required fields to check if the form is filled
    const requiredFields = [
        formContent.buildingCode,
        formContent.width,
        formContent.length,
    ];

    // Map formContent to Building
    const buildingDto = {
        buildingCode: formContent.buildingCode,
        buildingName: formContent.buildingName,
        buildingDescription: formContent.buildingDescription,
        width: parseInt(formContent.width),
        length: parseInt(formContent.length),
    };
    const buildingToCreate = mapBuildingDtoToBuilding(buildingDto);

    // Method to clear the form
    const clearForm = () => {
        for (const key in formContent) {
            formContent[key as keyof typeof formContent] = "";
        }
    };


    const handleSubmit = async () => {
        // Check if any field is empty
        const isFormFilled = requiredFields.every((field) => field && field.trim() !== "");
        if (!isFormFilled) {
            toast.warning("Please fill all the required fields!");
            return;
        }
        try {
            // Send the create request
            await sendData("/campus/buildings", buildingToCreate);
            // Clear the form
            clearForm();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const createForm = (
        <BuildingForm
            codeValue={formContent.buildingCode}
            nameValue={formContent.buildingName}
            descriptionValue={formContent.buildingDescription}
            widthValue={formContent.width}
            lengthValue={formContent.length}
            handleChangeTextField={handleChangeTextField}
        />
    );

    return (
        <Form form={createForm} onSubmit={handleSubmit} buttonText={"Create Building"} waitingForResponse={loading}/>
    );
};

export default CreateBuildingForm;

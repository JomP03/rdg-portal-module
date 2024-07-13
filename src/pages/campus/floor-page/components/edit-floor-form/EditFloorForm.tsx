import React, {useState} from 'react';
import {useEditFormState} from "../../../../../hooks/useEditFormState";
import FloorForm from "../floor-form/FloorForm";
import Form from "../../../../../components/base/form/Form";
import {useDataPatch} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";


import {mapFloorDataToFloorOut} from "../../../../../mappers/floorMapper";
import FloorOutDto from "../../../../../dtos/out/floorOutDto";


interface EditFloorFormProps {
    formData: {
        [value: string]: string
    };
    handleCloseModal: () => void;
    refreshData: () => void;
}


const EditFloorForm: React.FC<EditFloorFormProps> =
    ({formData, handleCloseModal, refreshData}) => {

        // Handle changes on the text fields
        const {formContent, handleChangeTextField} = useEditFormState(formData);


        // Use the usePatch hook to handle the edit request
        const {loading, sendData} = useDataPatch<FloorOutDto>();


        const [fileJSONContent, setSelectedFile] = useState<string>();


        const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files.length > 0) {
                // Retrieve the file content to a JSON object
                const reader = new FileReader();

                // verify that the file is json
                if (!event.target.files[0].name.endsWith('.json')) {
                    toast.error('File upload failed! File must be .json');
                    return;
                }

                reader.onload = (event) => {
                    if (event.target?.result) {
                        try {
                            // Try to parse the JSON content
                            JSON.parse(event.target.result as string);

                            // If everything is fine
                            setSelectedFile(event.target.result as string);
                            toast.success('File uploaded successfully!');
                            // Get the label by className
                            const label = document.getElementsByClassName('upload-button')[0];
                            // Change the color of the label
                            label.setAttribute('style', 'background-color: #4f585b');
                        } catch (error) {
                            console.error('Error parsing JSON:', error);
                            toast.error('File upload failed! Invalid JSON structure.');
                        }
                    } else {
                        toast.error('File upload failed!');
                    }
                };

                reader.readAsText(event.target.files[0], 'UTF-8');
            }
        };


        const handleEdit = async () => {

            const floorToEdit = mapFloorDataToFloorOut(
                formContent.floorDescription,
                parseInt(formContent.floorNumber),
                fileJSONContent ? JSON.parse(fileJSONContent) : undefined,
                undefined,
            );

            try {
                await sendData(`/campus/floors/` + formData.domainId, floorToEdit);

                // Refresh data after submit
                refreshData();
                // Close Modal after submit
                handleCloseModal();
                // Show success toast
                toast.success(`Floor ${formData.floorNumber} was edited successfully!`);

            } catch (error: any) {
                toast.error(error.message);

                // If the file provided contained errors, reset the file content
                setSelectedFile(undefined);
            }
        }

        const editForm =
            <FloorForm floorNumberValue={formContent.floorNumber}
                       floorDescriptionValue={formContent.floorDescription}
                       floorPlanValue={fileJSONContent ? fileJSONContent : ''}
                       handleChangeTextField={handleChangeTextField}
                       handleUploadFile={handleUploadFile}
                       disabledFields={{
                           building: true,
                       }}
                       editMode={true}/>


        if (loading)
            return <LoadingAnimation/>;


        return (

            <Form form={editForm} onSubmit={handleEdit} waitingForResponse={false}/>

        );

    }


export default EditFloorForm;
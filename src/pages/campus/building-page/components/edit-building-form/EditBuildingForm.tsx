import React from 'react';
import {useEditFormState} from "../../../../../hooks/useEditFormState";
import BuildingForm from "../building-form/BuildingForm";
import Form from "../../../../../components/base/form/Form";
import {useDataPatch} from "../../../../../hooks/useApiRequest";
import {Building} from "../../../../../interfaces/building";
import {mapBuildingDtoToBuilding} from "../../../../../mappers/buildingMapper";
import {toast} from "react-toastify";

interface EditBuildingFormProps {
    formData: { [value: string]: string };
    handleCloseModal: () => void;
    refreshData: () => void;
}

const EditBuildingForm: React.FC<EditBuildingFormProps> = ({formData, handleCloseModal, refreshData}) => {

    // Handle changes on the text fields
    const {formContent, handleChangeTextField} = useEditFormState(formData);
    // Use the usePatch hook to handle the edit request
    const {loading, sendData} = useDataPatch<Building>();

    // Map formContent to Building
    const buildingDto = {
        buildingCode: formContent.buildingCode,
        buildingName: formContent.buildingName,
        buildingDescription: formContent.buildingDescription,
        width: parseInt(formContent.width),
        length: parseInt(formContent.length),
    }
    const building = mapBuildingDtoToBuilding(buildingDto);
    const {buildingCode, ...buildingWithoutCode} = building;

    const handleEdit = async () => {
        try {
            await sendData(`/campus/buildings/` + formData.domainId, buildingWithoutCode);

            // Refresh data after submit
            refreshData();
            // Close Modal after submit
            handleCloseModal();
            // Show success toast
            toast.success(`Building ${building.buildingCode} was edited successfully!`);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const editForm =
        <BuildingForm codeValue={formContent.buildingCode}
                      nameValue={formContent.buildingName}
                      descriptionValue={formContent.buildingDescription}
                      widthValue={formContent.width}
                      lengthValue={formContent.length}
                      handleChangeTextField={handleChangeTextField}
                      disabledFields={{
                          buildingCode: true,
                          buildingName: false,
                          buildingDescription: false,
                          width: false,
                          length: false,
                      }}
        />
    return (
        <Form form={editForm} onSubmit={handleEdit} waitingForResponse={loading}/>
    )
}

export default EditBuildingForm;
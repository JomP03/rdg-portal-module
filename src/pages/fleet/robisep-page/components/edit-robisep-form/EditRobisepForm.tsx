import React from "react";
import {useDataPatch} from "../../../../../hooks/useApiRequest";
import RobisepOutDTO from "../../../../../dtos/out/RobisepOutDTO";
import {mapRobisepDataToRobisepOut} from "../../../../../mappers/robisepMapper";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import LogoutButton from "../../../../../components/logout-button/LogoutButton";
import './edit-robisep-form.css'


interface EditRobisepFormProps {
    formData: { [value: string]: string };
    handleCloseModal: () => void;
    refreshData: () => void;
}

const EditRobisepForm: React.FC<EditRobisepFormProps> = ({formData, handleCloseModal, refreshData}) => {

    // Use the usePatch hook to handle the edit request
    const {loading, sendData} = useDataPatch<RobisepOutDTO>();
    const robisep = mapRobisepDataToRobisepOut(
        undefined,
        undefined,
        undefined,
        'INACTIVE',
        undefined,
        undefined,
    )

    const handleEdit = async () => {
        try {
            await sendData(`/fleet/robiseps/` + formData.domainId, robisep);

            // Refresh data after submit
            refreshData();
            // Close Modal after submit
            handleCloseModal();
            // Show success toast
            toast.success(`Robisep ${formData.code} was edited successfully!`);
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    if (loading)
        return <LoadingAnimation/>;

    return (
        <div className={'center-content'}>
            <LogoutButton onClick={handleEdit} label={"Disable Robisep"}/>
        </div>
    )
}

export default EditRobisepForm;
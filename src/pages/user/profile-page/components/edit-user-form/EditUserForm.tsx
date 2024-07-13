import React, { useEffect } from 'react';
import { useEditFormState } from "../../../../../hooks/useEditFormState";
import Form from "../../../../../components/base/form/Form";
import { useUserPatch } from '../../../../../hooks/useApiRequest';
import { toast } from 'react-toastify';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import { mapUserDataToUserOutDto } from '../../../../../mappers/userMapper';
import { UserOutDto } from '../../../../../dtos/out/UserOutDto';
import UserForm from '../user-form/UserForm';


interface EditUserFormProps {
  formData: { [value: string]: string };
  handleCloseModal: () => void;
  refreshData: () => void;
  role: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ formData, handleCloseModal, refreshData, role}) => {


    // Prepare Patch request
    const {data, loading: loadingPatch, sendData} = useUserPatch<UserOutDto>();




    // State for the form content
    const { formContent, handleChangeTextField} = useEditFormState(formData);




    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        if(data){
            refreshData();
        }
    }, [data]);



    // Function responsible for sending the data to the API
    const handleEdit = async () => {

        let requiredFields;

        if (role === 'ENDUSER') {
            requiredFields = [
                formContent.name,
                formContent.phoneNumber,
                formContent.nif,
            ];
        } else {
            requiredFields = [
                formContent.name,
                formContent.phoneNumber,
            ];
        }

        // check if the required fields are filled
        for (const field of requiredFields) {
            if (!field) {
                toast.warn('Please fill all the required fields!');
                return;
            }
        }

        const userToEdit = mapUserDataToUserOutDto(
            formContent.name,
            formContent.phoneNumber,
            formContent.nif ? formContent.nif : undefined,
        )


        try{
            await sendData('/Users/' + formData.id, userToEdit);
            // Clear the form
            refreshData();

            handleCloseModal();

            toast.success('You edited your profile sucessfully!');
        } catch(error: any){
            toast.error(error.message);
        }
    }


    if (loadingPatch) {
        return <LoadingAnimation/>;
    }

    const userForm =
        <UserForm 
            name={formContent.name}
            nif={formContent.nif}
            phoneNumber={formContent.phoneNumber}
            handleChangeTextField={handleChangeTextField}
            isEndUser={role === 'ENDUSER'}

        />

    return <Form form={userForm} onSubmit={handleEdit} buttonText={"Edit Profile"} waitingForResponse={false}/>;


}


export default EditUserForm;
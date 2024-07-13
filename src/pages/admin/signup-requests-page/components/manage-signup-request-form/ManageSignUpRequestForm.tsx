import React, { useEffect, useState } from 'react';
import { useUserPatch } from '../../../../../hooks/useApiRequest';
import { toast } from 'react-toastify';
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import SignUpRequestForm from '../signup-request-form/SignUpRequestForm';
import { SignUpRequestOutDto } from '../../../../../dtos/out/SignUpRequestOutDto';
import { useEditFormState } from '../../../../../hooks/useEditFormState';
import { mapActionDataToSignUpRequestOutDto } from '../../../../../mappers/signUpRequestMapper';
import { jwtDecode } from 'jwt-decode';


interface ManageSignUpRequestFormProps {
  formData: { [value: string]: string };
  handleCloseModal: () => void;
  refreshData: () => void;
}

const ManageSignUpRequestForm: React.FC<ManageSignUpRequestFormProps> = ({ formData, handleCloseModal, refreshData}) => {


    // Prepare Patch request
    const {data, loading: loadingPatch, sendData} = useUserPatch<SignUpRequestOutDto>();


    const { formContent, handleChangeTextField} = useEditFormState(formData);


    // When the data changes, check if it is present and show a toast
    useEffect(() => {
        if(data){
            refreshData();
        }
    }, [data]);

    const requiredFields = [formContent.comment];

    // Function responsible for accepting the request
    const handleAccept = async () => {

        // Check if all the required fields are filled
        for (const field of requiredFields) {
            if (!field) {
                toast.warn('Please fill all the required fields!');
                return;
            }
        }

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token!);
        const userId = decodedToken.sub;

        let outDto;

        
        if(userId){
            outDto = mapActionDataToSignUpRequestOutDto(true, formContent.comment, userId);

            console.log(outDto);
        }


        try{
            console.log(formData);

            await sendData('/SignUpRequest/' + formData.id, outDto);
            // Clear the form
            refreshData();

            handleCloseModal();

            toast.success('You accepted the request sucessfully!');
        } catch(error: any){
            toast.error(error.message);
        }
    }


    // Function responsible for rejecting the request
    const handleReject = async () => {

        // Check if all the required fields are filled
        for (const field of requiredFields) {
            if (!field) {
                toast.warn('Please fill all the required fields!');
                return;
            }
        }

        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token!);
        const userId = decodedToken.sub;

        let outDto;

        if(userId){
            outDto = mapActionDataToSignUpRequestOutDto(false, formContent.comment, userId);

            console.log(outDto);
        }

        try{
            await sendData('/SignUpRequest/' + formData.id, outDto);
            // Clear the form
            refreshData();

            handleCloseModal();

            toast.success('You rejected the request sucessfully!');
        } catch(error: any){
            toast.error(error.message);
        }
    }


    if (loadingPatch) {
        return <LoadingAnimation/>;
    }

    return <SignUpRequestForm name={formData.name} email={formData.email} handleAccept={handleAccept} handleReject={handleReject} handleChangeTextField={handleChangeTextField} comment={formContent.comment}/>


}


export default ManageSignUpRequestForm;
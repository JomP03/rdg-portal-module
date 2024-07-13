import React, {useEffect, useState} from "react";
import Title from "../../../components/base/title/Title";
import OutlinedTextField from "../../../components/base/text-field/OutlinedTextField";
import {useCreateFormState} from "../../../hooks/useCreateFormState";
import CustomCheckbox from "../../../components/base/checkbox/CustomCheckbox";
import FormButton from "../../../components/form-button/FormButton";
import {useUserPost} from "../../../hooks/useApiRequest";
import {SignUpRequestDto} from "../../../dtos/out/SignUpRequestDto";
import {toast} from "react-toastify";
import {mapSignUpRequestDataToSignUpRequestRequest} from "../../../mappers/signUpRequestMapper";
import LoadingAnimation from "../../../components/loading-animation/LoadingAnimation";
import {SECONDARY_COLOR} from "../../../utils/colors";
import './sign-up-form.css';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";


const SignUpForm = () => {

  const navigate = useNavigate();

  // Use state responsible for the form
  const {formContent, handleChangeTextField} = useCreateFormState();
  // Use state responsible for the checkbox
  const [checked, setChecked] = useState(false);

  // Use the usePost hook to handle the create request
  const {data, loading, sendData} = useUserPost<SignUpRequestDto>();

  // Required fields to check if the form is filled
  const requiredFields = [
    formContent.email,
    formContent.name,
    formContent.phoneNumber,
    formContent.nif,
  ];

  // Handle Sign Up
  const handleSignUp = async () => {
    // Check if any field is empty
    const isFormFilled = requiredFields.every((field) => field && field.trim() !== "");
    if (!isFormFilled) {
      toast.warning("Please fill all the required fields!");
      return;
    }

    // Obtain the userId from the token
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token || '');
    const userId = decoded.sub;


    const signUpRequest = mapSignUpRequestDataToSignUpRequestRequest(
      userId,
      formContent.email,
      formContent.name,
      formContent.phoneNumber,
      formContent.nif
    )

    // Send the data to the API
    try {
      await sendData("/SignUpRequest", signUpRequest);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  // Check if the request was successful
  useEffect(() => {
    if (data) {
      toast.success("Sign Up request sent successfully!");

      // Display waiting page
      navigate('/awaiting-approval');
    }
  }, [data])

  // Loading state
  if (loading) {
    return <LoadingAnimation/>;
  }

  return (
    <div className={'create-form-container'}>
      <br/>
      <br/>
      <Title text={'Create an Account'} color={SECONDARY_COLOR}/>

      <br/>
      <br/>

      <OutlinedTextField label={'Institutional Email'} placeholder={'Enter Institutional Email'} name={"email"}
                         value={formContent.email} onChange={handleChangeTextField}/>
      <br/>
      <br/>
      <OutlinedTextField label={'Name'} placeholder={'Enter Name'} name={"name"}
                         value={formContent.name} onChange={handleChangeTextField}/>
      <br/>
      <br/>
      <OutlinedTextField label={'Phone Number'} placeholder={'Enter Phone Number'} name={"phoneNumber"}
                         value={formContent.phoneNumber} onChange={handleChangeTextField}/>
      <br/>
      <br/>
      <OutlinedTextField label={'NIF'} placeholder={'Enter NIF'} name={"nif"}
                         value={formContent.nif} onChange={handleChangeTextField}/>
      <br/>
      <br/>

      <CustomCheckbox checked={checked} setChecked={setChecked} normalText={'I agree to the '}
                      linkText={'Privacy Policy'}/>

      <br/>
      <FormButton onClick={handleSignUp} label={'Sign Up'} isDisabled={!checked}/>
    </div>
  )
}

export default SignUpForm;
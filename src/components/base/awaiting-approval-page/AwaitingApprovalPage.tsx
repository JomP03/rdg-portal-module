import React, {useEffect} from 'react';
import Title from "../title/Title";
import LogoutButton from "../../logout-button/LogoutButton";
import {useLogout} from "../../../hooks/useLogout";
import FormButton from "../../form-button/FormButton";
import {useNavigate} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useUserGet} from "../../../hooks/useApiRequest";
import {jwtDecode} from "jwt-decode";
import {SignUpRequestInDto} from "../../../dtos/in/SignUpRequestInDto";
import LoadingAnimation from "../../loading-animation/LoadingAnimation";
import {toast} from "react-toastify";
import {SECONDARY_COLOR_DARK} from "../../../utils/colors";
import WaitingImage from '../../../assets/waiting.png';
import './awaiting-approval-page.css';
import { StateInDto } from '../../../dtos/in/StateInDto';


const AwaitingApprovalPage = () => {

  const { loginWithRedirect } = useAuth0();
  const {logoutAction} = useLogout();
  const navigate = useNavigate();
  const [iamId, setIamId] = React.useState<string | undefined>('');
  const {data, error, loading, refreshData} =
    useUserGet<StateInDto>('/SignUpRequest/state?iamId=' + iamId || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIamId(decodedToken.sub);
    }
  }, []);

  useEffect(() => {

    console.log(data);
    if (data) {
      if (data && data.state === 'Approved') {
        toast.success('Your SignUp has been Approved');

        // Send to auth0 login
        loginWithRedirect();
      }
      else if (data.state == "Requested") {
        toast.info('Your SignUp is still awaiting approval');
      }
      else {
        toast.info('Your SignUp Request was Rejected, you submit another request.');
        navigate('/callback');
      }
    }
  }, [data]);


  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error('Something went wrong');
    }
  }, [error]);

  const statusAction = async () => {
    await refreshData();
  }

  if (loading)
    return <LoadingAnimation/>;

  return (
    <div className={'align-text'}>
      <Title text={'Your SignUp is Awaiting Approval'} color={SECONDARY_COLOR_DARK}/>
      <img className={'page-awaiting-approval-image'} src={WaitingImage} alt={'404-page-not-found'}/>
      <br/>
      <div className={'form-row'}>
        <LogoutButton onClick={logoutAction} label={'Logout'}/>
        <FormButton onClick={statusAction} label={'Check Status'}/>
      </div>
    </div>
  )
}

export default AwaitingApprovalPage;
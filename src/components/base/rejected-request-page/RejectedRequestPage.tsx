import React from 'react';
import Title from "../title/Title";
import LogoutButton from "../../logout-button/LogoutButton";
import {useLogout} from "../../../hooks/useLogout";
import {SECONDARY_COLOR_DARK} from "../../../utils/colors";
import RejectedImage from '../../../assets/request_rejected.png';
import './rejected-request-page.css';



const RejectedRequestPage = () => {

  const {logoutAction} = useLogout();

  return (
    <div className={'align-text'}>
      <Title text={'Your SignUp Request has been rejected'} color={SECONDARY_COLOR_DARK}/>
      <img className={'page-rejected-image'} src={RejectedImage} alt={'404-page-not-found'}/>
      <br/>
      <LogoutButton onClick={logoutAction} label={'Logout'}/>
    </div>
  )
}

export default RejectedRequestPage;
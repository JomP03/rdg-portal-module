import {useNavigate} from 'react-router-dom';
import FormButton from '../../form-button/FormButton';
import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import AccessDeniedImage from '../../../assets/access-denied.png';
import './access-denied.css';

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  const {isAuthenticated} = useAuth0();
  const redirectPath = isAuthenticated ? '/callback' : '/';

  return (
    <div className={'align-text'}>
      <img className={'access-denied-image'} src={AccessDeniedImage} alt={'404-page-not-found'}/>
      <br/>
      <br/>
      <br/>
      <FormButton label={'Go Back'} onClick={() => navigate(redirectPath)} isDisabled={false}/>
    </div>
  )
}

export default AccessDeniedPage;
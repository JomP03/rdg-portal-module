import './NotFoundStyles.css';
import NotFoundImage from '../../../assets/404-page-not-found.png';
import {useNavigate} from 'react-router-dom';
import FormButton from '../../form-button/FormButton';
import React from 'react';
import {NOT_FOUND_PATH} from "../../../pages/Routes";
import {useAuth0} from "@auth0/auth0-react";

const NotFoundPage = () => {
    const navigate = useNavigate();

    const {isAuthenticated} = useAuth0();
    const redirectPath = isAuthenticated ? '/callback' : '/';

    return (
        <div className={'align-text'}>
            <img className={'page-not-found-image'} src={NotFoundImage} alt={'404-page-not-found'}/>
            <p className={'align-text-p'}>The page you are looking for does not exist.<br/></p>
            <FormButton label={'Go Back to Home'} onClick={() => navigate(redirectPath)} isDisabled={false}/>
        </div>
    )
}

export default NotFoundPage;
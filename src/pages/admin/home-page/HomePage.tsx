import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Carousel from "../../../components/carousel/Carousel";
import Title from "../../../components/base/title/Title";
import {SECONDARY_COLOR_DARK} from "../../../utils/colors";
import AdminImg from '../../../assets/pagePanels/admin.png'
import UsersImg from '../../../assets/entity-buttons/user-button.png'
import SignupRequestsImg from '../../../assets/entity-buttons/signup-request-button.png'
import './home-page.css'
import {ADMIN_PATH, USERS_PATH, SIGNUP_REQUESTS_PATH} from "../../Routes";


const HomePage = () => {
    return (
        <>
            <PagePanel text={'Innovation in Motion'} sentence={'RobDroneGo'} imagePath={AdminImg}/>

            <br/>
            <br/>

            <div className={'content'}>
                <Title text={'Our Services'} color={SECONDARY_COLOR_DARK}/>
                <p>Here you can manage the Users of the system.</p>
            </div>

            <br/>
            <br/>

            <Carousel items={[
                {imageUrl: UsersImg, text: 'Create Backoffice Users', path: ADMIN_PATH + USERS_PATH},
                {imageUrl: SignupRequestsImg, text: 'Manage Signup Requests', path: ADMIN_PATH + SIGNUP_REQUESTS_PATH},
            ]}/>
        </>
    )
}

export default HomePage;
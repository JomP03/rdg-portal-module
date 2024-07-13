import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Carousel from "../../../components/carousel/Carousel";
import Title from "../../../components/base/title/Title";
import {SECONDARY_COLOR_DARK} from "../../../utils/colors";
import FleetImg from '../../../assets/pagePanels/fleet.png'
import RobisepTypeImg from '../../../assets/entity-buttons/robisepType-button.png'
import RobisepImg from '../../../assets/entity-buttons/robisep-button.png'
import './home-page.css'
import {FLEET_PATH, ROBISEP_PATH, ROBISEP_TYPE_PATH} from "../../Routes";


const HomePage = () => {
    return (
        <>
            <PagePanel text={'Innovation in Motion'} sentence={'RobDroneGo'} imagePath={FleetImg}/>

            <br/>
            <br/>

            <div className={'content'}>
                <Title text={'Our Services'} color={SECONDARY_COLOR_DARK}/>
                <p>We provide a wide range of services to help you manage your fleet.</p>
            </div>

            <br/>
            <br/>

            <Carousel items={[
                {imageUrl: RobisepTypeImg, text: 'RobisepTypes', path: FLEET_PATH + ROBISEP_TYPE_PATH},
                {imageUrl: RobisepImg, text: 'Robiseps', path: FLEET_PATH + ROBISEP_PATH},
            ]}/>
        </>
    )
}

export default HomePage;
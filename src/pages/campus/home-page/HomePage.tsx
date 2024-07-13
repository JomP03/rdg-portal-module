import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Carousel from "../../../components/carousel/Carousel";
import Title from "../../../components/base/title/Title";
import {SECONDARY_COLOR_DARK} from "../../../utils/colors";
import CampusImg from '../../../assets/pagePanels/campus.png'
import BuildingImg from '../../../assets/entity-buttons/building-button.png'
import FloorImg from '../../../assets/entity-buttons/floor-button.png'
import RoomImg from '../../../assets/entity-buttons/room-button.png'
import PassageImg from '../../../assets/entity-buttons/passage-button.png'
import ElevatorImg from '../../../assets/entity-buttons/elevator-button.png'
import {BUILDING_PATH, CAMPUS_PATH, FLOOR_PATH, ROOM_PATH, PASSAGE_PATH, ELEVATOR_PATH} from "../../Routes";
import './home-page.css'


const HomePage = () => {
    return (
        <>
            <PagePanel text={'Innovation in Motion'} sentence={'RobDroneGo'} imagePath={CampusImg}/>

            <br/>
            <br/>

            <div className={'content'}>
                <Title text={'Our Services'} color={SECONDARY_COLOR_DARK}/>
                <p>We provide a wide range of services to help you manage your campus.</p>
            </div>

            <br/>
            <br/>

            <Carousel items={[
                {imageUrl: BuildingImg, text: 'Buildings', path: CAMPUS_PATH + BUILDING_PATH},
                {imageUrl: FloorImg, text: 'Floors', path: CAMPUS_PATH + FLOOR_PATH},
                {imageUrl: RoomImg, text: 'Rooms', path: CAMPUS_PATH + ROOM_PATH},
                {imageUrl: PassageImg, text: 'Passages', path: CAMPUS_PATH + PASSAGE_PATH},
                {imageUrl: ElevatorImg, text: 'Elevators', path: CAMPUS_PATH + ELEVATOR_PATH},
            ]}/>
        </>
    )
}

export default HomePage;
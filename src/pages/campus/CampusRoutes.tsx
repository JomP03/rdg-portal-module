import React from 'react'
import CampusNavBar from "../components/campus-nav-bar/CampusNavBar";
import {Route, Routes} from 'react-router-dom'
import BuildingPage from '../campus/building-page/BuildingPage'
import FloorPage from '../campus/floor-page/FloorPage';
import RoomPage from "./room-page/room-page/RoomPage";
import PassagePage from './passage-page/PassagePage';
import HomePage from '../campus/home-page/HomePage';
import NotFoundPage from '../../components/base/not-found-page/NotFoundPage';
import {
    BUILDING_PATH,
    CAMPUS_PATH,
    ELEVATOR_PATH,
    FLOOR_PATH,
    HOME_PATH,
    NOT_FOUND_PATH,
    PASSAGE_PATH,
    ROOM_PATH,
    MAP_VISUALIZER_PATH, BASE_PATH, PROFILE_PATH
} from "../Routes";
import ElevatorPage from './elevator-page/ElevatorPage';
import MapVisualizationPage from './map-visualization-page/MapVisualizationPage';
import {ProtectedGuard} from "../../components/authentication-guard/ProtectedGuard";
import {useLogout} from "../../hooks/useLogout";
import ProfilePage from "../user/profile-page/ProfilePage";
import NavigateToHome from "./NavigateToHome";

const CampusRoutes = () => {
    const {logoutAction} = useLogout();

    return (
        <>
            <CampusNavBar basePath={CAMPUS_PATH} logoutAction={logoutAction}/>
            <Routes>
                <Route path={BASE_PATH} element={<NavigateToHome homePath={'/campus/home'}/>}/>
                <Route path={HOME_PATH} element={<HomePage/>}/>
                <Route path={BUILDING_PATH} element={<ProtectedGuard component={<BuildingPage/>} requiredPermission={"manage:campus"} />}/>
                <Route path={FLOOR_PATH} element={<ProtectedGuard component={<FloorPage/>} requiredPermission={"manage:campus"} />} />
                <Route path={ROOM_PATH} element={<ProtectedGuard component={<RoomPage/>} requiredPermission={"manage:campus"} />} />
                <Route path={PASSAGE_PATH} element={<ProtectedGuard component={<PassagePage/>} requiredPermission={"manage:campus"} />} />
                <Route path={ELEVATOR_PATH} element={<ProtectedGuard component={<ElevatorPage/>} requiredPermission={"manage:campus"} />} />
                <Route path={MAP_VISUALIZER_PATH} element={<ProtectedGuard component={<MapVisualizationPage/>} requiredPermission={"manage:campus"} />} />
                <Route path={PROFILE_PATH}
                       element={<ProtectedGuard component={<ProfilePage/>} requiredPermission={"manage:campus"}/>}/>
                <Route path={NOT_FOUND_PATH} element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default CampusRoutes;
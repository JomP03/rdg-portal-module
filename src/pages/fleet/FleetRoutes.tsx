import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from '../fleet/home-page/HomePage';
import FleetNavBar from "../fleet/components/FleetNavBar";
import {
  BASE_PATH,
  FLEET_PATH,
  HOME_PATH,
  NOT_FOUND_PATH,
  PROFILE_PATH,
  ROBISEP_PATH,
  ROBISEP_TYPE_PATH
} from "../Routes";
import RobisepTypePage from "./robisep-type-page/robisep-type-page/RobisepTypePage";
import RobisepPage from "../fleet/robisep-page/robisep-page/RobisepPage";
import NotFoundPage from "../../components/base/not-found-page/NotFoundPage";
import {ProtectedGuard} from "../../components/authentication-guard/ProtectedGuard";
import {useLogout} from "../../hooks/useLogout";
import ProfilePage from "../user/profile-page/ProfilePage";
import NavigateToHome from "../campus/NavigateToHome";


const FleetRoutes = () => {

  const {logoutAction} = useLogout();

  return (
    <>
      <FleetNavBar basePath={FLEET_PATH} logoutAction={logoutAction}/>
      <Routes>
        <Route path={BASE_PATH} element={<NavigateToHome homePath={'/fleet/home'}/>}/>
        <Route path={HOME_PATH} element={<HomePage/>}/>
        <Route path={ROBISEP_TYPE_PATH}
               element={<ProtectedGuard component={<RobisepTypePage/>} requiredPermission={"manage:fleet"}/>}/>
        <Route path={ROBISEP_PATH}
               element={<ProtectedGuard component={<RobisepPage/>} requiredPermission={"manage:fleet"}/>}/>
        <Route path={PROFILE_PATH}
               element={<ProtectedGuard component={<ProfilePage/>} requiredPermission={"manage:fleet"}/>}/>
        <Route path={NOT_FOUND_PATH} element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default FleetRoutes;
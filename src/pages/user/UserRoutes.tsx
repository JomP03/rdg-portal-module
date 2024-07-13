import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from '../user/home-page/HomePage';
import NotFoundPage from "../../components/base/not-found-page/NotFoundPage";
import UserNavBar from './components/UserNavBar';
import {useLogout} from "../../hooks/useLogout";
import {ProtectedGuard} from "../../components/authentication-guard/ProtectedGuard";
import RequestTaskPage from "../task/request-tasks-page/RequestTaskPage";
import ProfilePage from "./profile-page/ProfilePage";
import {BASE_PATH, HOME_PATH, NOT_FOUND_PATH, PROFILE_PATH, REQUEST_TASK_PATH, USERS_PATH} from "../Routes";
import NavigateToHome from "../campus/NavigateToHome";

const UserRoutes = () => {
    const {logoutAction} = useLogout();

    return (
        <>
            <UserNavBar basePath={USERS_PATH} logoutAction={logoutAction}/>
            <Routes>
              <Route path={BASE_PATH} element={<NavigateToHome homePath={'/user/home'}/>}/>
              <Route path={HOME_PATH}
                     element={<ProtectedGuard component={<HomePage/>} requiredPermission={"user:requests"}/>}/>
              <Route path={REQUEST_TASK_PATH}
                     element={<ProtectedGuard component={<RequestTaskPage/>} requiredPermission={"user:requests"}/>}/>
              <Route path={PROFILE_PATH}
                     element={<ProtectedGuard component={<ProfilePage/>} requiredPermission={"user:requests"}/>}/>
                <Route path={NOT_FOUND_PATH} element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default UserRoutes;
import {Route, Routes} from 'react-router-dom'
import HomePage from './home-page/HomePage';
import {
  ADMIN_PATH,
  HOME_PATH,
  NOT_FOUND_PATH,
  USERS_PATH,
  SIGNUP_REQUESTS_PATH,
  PROFILE_PATH,
  BASE_PATH
} from "../Routes";
import NotFoundPage from "../../components/base/not-found-page/NotFoundPage";
import {ProtectedGuard} from "../../components/authentication-guard/ProtectedGuard";
import {useLogout} from "../../hooks/useLogout";
import AdminNavBar from "./components/AdminNavBar";
import CreateUserPage from "./create-user-page/CreateUserPage";
import SignUpRequestPage from './signup-requests-page/SignUpRequestPage';
import ProfilePage from "../user/profile-page/ProfilePage";
import React from "react";
import NavigateToHome from "../campus/NavigateToHome";


const AdminRoutes = () => {
    const {logoutAction} = useLogout();

    return (
        <>
            <AdminNavBar basePath={ADMIN_PATH} logoutAction={logoutAction}/>
            <Routes>
              <Route path={BASE_PATH} element={<NavigateToHome homePath={'/admin/home'}/>}/>
                <Route path={HOME_PATH} element={<HomePage/>}/>
                <Route path={USERS_PATH}
                       element={<ProtectedGuard component={<CreateUserPage/>} requiredPermission={"manage:users"}/>}/>
                <Route path={SIGNUP_REQUESTS_PATH}
                       element={<ProtectedGuard component={<SignUpRequestPage/>} requiredPermission={"manage:users"}/>}/>
              <Route path={PROFILE_PATH}
                     element={<ProtectedGuard component={<ProfilePage/>} requiredPermission={"manage:users"}/>}/>
                <Route path={NOT_FOUND_PATH} element={<NotFoundPage/>}/>
            </Routes>
        </>
    )
}

export default AdminRoutes;
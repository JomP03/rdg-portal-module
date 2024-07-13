import React from 'react';
import {Route, Routes} from 'react-router-dom';
import CampusRoutes from "./pages/campus/CampusRoutes";
import BasePage from "./pages/base-page/BasePage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import {initializeConfig} from "./services/ConfigService/ConfigService";
import FleetRoutes from "./pages/fleet/FleetRoutes";
import NotFoundPage from './components/base/not-found-page/NotFoundPage';
import TaskRoutes from './pages/task/TaskRoutes';
import AwaitingApprovalPage from "./components/base/awaiting-approval-page/AwaitingApprovalPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {ProtectedGuard} from './components/authentication-guard/ProtectedGuard';
import CallbackPage from "./components/callback/CallbackPage";
import AdminRoutes from './pages/admin/AdminRoutes';
import AccessDeniedPage from "./components/base/access-denied-page/AccessDeniedPage";
import UserRoutes from './pages/user/UserRoutes';
import AccountDeletedPage from './pages/user/profile-page/account-deleted-page/AccountDeletedPage';
import RejectedRequestPage from "./components/base/rejected-request-page/RejectedRequestPage";


initializeConfig(
  {
    DataApiHost: process.env.REACT_APP_DATA_API_HOST as string,
    UserApiHost: process.env.REACT_APP_USER_API_HOST as string,
  }
);

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<BasePage/>}/>
        <Route path='/sign-up' element={<SignUpPage/>}/>


        <Route
          path="/callback"
          element={<CallbackPage/>}
        />

        <Route
          path="/rejected"
          element={<ProtectedGuard component={<RejectedRequestPage/>} requiredPermission={"empty"}/>}
        />

        <Route
          path="/awaiting-approval"
          element={<ProtectedGuard component={<AwaitingApprovalPage/>} requiredPermission={"empty"}/>}
        />

        <Route
          path="/admin/*"
          element={<ProtectedGuard component={<AdminRoutes/>} requiredPermission={"manage:admin"}/>}/>

        <Route
          path="/campus/*"
          element={<ProtectedGuard component={<CampusRoutes/>} requiredPermission={"manage:campus"}/>}
        />

        <Route
          path="/fleet/*"
          element={<ProtectedGuard component={<FleetRoutes/>} requiredPermission={"manage:fleet"}/>}
        />

        <Route
          path="/task/*"
          element={<ProtectedGuard component={<TaskRoutes/>} requiredPermission={"manage:tasks"}/>}
        />

        <Route
          path={"/user/*"}
          element={<ProtectedGuard component={<UserRoutes/>} requiredPermission={"user:requests"}/>}
        />

        <Route
          path="/access-denied"
          element={<AccessDeniedPage/>}
        />

        <Route path="/deleted" element={<AccountDeletedPage/>}/>

        <Route
          path="/*"
          element={<NotFoundPage/>}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
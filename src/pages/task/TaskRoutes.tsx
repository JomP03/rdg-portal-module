import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./home-page/HomePage";
import TaskNavBar from "../task/components/TaskNavBar";
import {
  HOME_PATH,
  NOT_FOUND_PATH,
  PATHS_PATH,
  TASK_PATH,
  TASK_SEQUENCE_PATH,
  TASK_MANAGEMENT_PATH,
  PROFILE_PATH, BASE_PATH
} from "../Routes";
import PathsPage from "../task/paths-page/PathsPage";
import NotFoundPage from "../../components/base/not-found-page/NotFoundPage";
import {ProtectedGuard} from "../../components/authentication-guard/ProtectedGuard";
import {useLogout} from "../../hooks/useLogout";
import TaskPage from "./task-management-page/TaskPage";
import TaskSequencePage from "./task-sequence/TaskSequencePage";
import ProfilePage from "../user/profile-page/ProfilePage";
import NavigateToHome from "../campus/NavigateToHome";


const TaskRoutes = () => {
  const {logoutAction} = useLogout();

  return (
    <>
      <TaskNavBar basePath={TASK_PATH} logoutAction={logoutAction}/>
      <Routes>
        <Route path={BASE_PATH} element={<NavigateToHome homePath={'/task/home'}/>}/>
        <Route path={HOME_PATH} element={<HomePage/>}/>
        <Route path={PATHS_PATH}
               element={<ProtectedGuard component={<PathsPage/>} requiredPermission={"manage:tasks"}/>}/>
        <Route path={TASK_MANAGEMENT_PATH}
               element={<ProtectedGuard component={<TaskPage/>} requiredPermission={"manage:tasks"}/>}/>
        <Route path={TASK_SEQUENCE_PATH}
               element={<ProtectedGuard component={<TaskSequencePage/>} requiredPermission={"manage:tasks"}/>}/>
        <Route path={PROFILE_PATH}
               element={<ProtectedGuard component={<ProfilePage/>} requiredPermission={"manage:tasks"}/>}/>
        <Route path={NOT_FOUND_PATH} element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
};

export default TaskRoutes;
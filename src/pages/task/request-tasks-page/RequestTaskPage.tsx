import React, {useEffect, useState} from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import RequestTaskTable from "./components/request-task-table/RequestTaskTable";
import {useDataGet} from "../../../hooks/useApiRequest";
import RequestSurveillanceTaskForm from "./components/request-task-form/RequestSurveillanceTaskForm";
import TaskInDto from "../../../dtos/in/TaskInDto";
import TaskTypeForm from "./components/task-type-form/TaskTypeForm";
import {SelectChangeEvent} from "@mui/material";
import {TasksType} from "../../../dtos/in/RobisepTypeInDto";
import RequestPickUpAndDeliveryTaskForm from "./components/request-task-form/RequestPickUpAndDeliveryTaskForm";
import {jwtDecode} from "jwt-decode";
import RequestTaskImg from "../../../assets/pagePanels/request_task.png";

const RequestTaskPage = () => {
  // Get the IAM id from the local storage, only once
  const [iamId, setIamToken] = useState<string | null>(null);

  // Get the data from the API, only if the iamId is not null
  const {data: tasks, error, loading, refreshData}
    = useDataGet<TaskInDto[]>('/tasks/tasks/filter?iamId=' + iamId);

  useEffect(() => {
    // Protect first against null
    const iamToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(iamToken || '');
    if (decodedToken) {
      setIamToken(decodedToken.sub || null);
    }
  }, []);

  useEffect(() => {
    // Refresh the data when the iamId changes and is not null
    if (iamId) {
      refreshData();
    }
  }, [iamId]);

  const [selectedTaskType, setSelectedTaskType] = useState(""); // State to hold selected task type

  const [isTransport, setIsTransport] = useState(false);

  const [isSurveillance, setIsSurveillance] = useState(false);

  const handleTaskTypeChange = (e: SelectChangeEvent) => {
    setSelectedTaskType(e.target.value);
  };

  useEffect(() => {
    // Change both states to false
    setIsSurveillance(false);
    setIsTransport(false);

    switch (selectedTaskType) {
      case "PICKUP AND DELIVERY":
        setIsTransport(true);
        // Scroll smoothly to the bottom of the page
        setTimeout(() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 0);
        break;
      case TasksType.SURVEILLANCE:
        setIsSurveillance(true);
        // Scroll smoothly to the bottom of the page
        setTimeout(() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 0);
        break;
      default:
        setTimeout(() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}), 0);
        break;
    }
  }, [selectedTaskType]);

  return (
    <>
      <PagePanel
        text={"Request Tasks"}
        sentence={"Request and view your Tasks"}
        imagePath={RequestTaskImg}/>

      <div className={'page-content'}>
        <Title text={"Your Task Requisitions"} className={"main-titles"}></Title>
        <RequestTaskTable tasks={tasks || []} error={error}
                          loading={loading} refreshData={refreshData} isFilterOn={-1}/>

        <br/><br/>

        <Title text={"Request a Task"} className={"main-titles"}></Title>

        <TaskTypeForm taskTypeValue={selectedTaskType} handleChangeSelect={handleTaskTypeChange}/>

        {isTransport && <RequestPickUpAndDeliveryTaskForm refreshData={refreshData}/>}

        {isSurveillance && <RequestSurveillanceTaskForm refreshData={refreshData}/>}

      </div>

    </>
  )
}

export default RequestTaskPage;
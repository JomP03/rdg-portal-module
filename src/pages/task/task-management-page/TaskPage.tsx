import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import TaskTable from "./components/task-table/TaskTable";
import {useDataGet} from "../../../hooks/useApiRequest";
import TaskInDto from "../../../dtos/in/TaskInDto";
import TaskImage from '../../../assets/pagePanels/tasks.png'
import {useTitleAndButtonText} from "../../../hooks/useTitleAndButtonText";

const TaskPage = () => {
    // Get the data from the API
    const {data: tasks, error, loading, refreshData}
        = useDataGet<TaskInDto[]>('/tasks/tasks/state?state=REQUESTED');
    const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
    const {titleText} = useTitleAndButtonText(["Tasks Filtered By State", "Filtered Tasks"], "Requested Tasks", isFilterOn);

    return (
        <>
            <PagePanel
                text={"Tasks"}
                sentence={"Consult, Approve and Refuse Tasks"}
                imagePath={TaskImage}/>

            <div className={'page-content'}>
                <Title text={titleText} className={"main-titles"}></Title>
                <TaskTable tasks={tasks || []} error={error}
                           loading={loading} refreshData={refreshData} isFilterOn={isFilterOn}
                           setIsFilterOn={setIsFilterOn}/>

                <br/><br/>

            </div>

        </>
    )
}

export default TaskPage;
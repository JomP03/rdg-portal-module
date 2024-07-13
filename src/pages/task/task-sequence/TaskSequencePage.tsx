import {useDataGet} from "../../../hooks/useApiRequest";
import React, {useEffect} from "react";
import {useCreateFormState} from "../../../hooks/useCreateFormState";
import TaskSequenceForm from "./components/TaskSequenceForm";
import {toast} from "react-toastify";
import PagePanel from "../../components/page-panel/PagePanel";
import LoadingAnimation from "../../../components/loading-animation/LoadingAnimation";
import ITaskSequenceInDTO from "../../../dtos/in/TaskSequenceInDto";
import Title from "../../../components/base/title/Title";
import TaskSequenceTable from "./components/TaskSequenceTable";
import taskSequenceImage from "../../../assets/pagePanels/task_sequence.png";


const TaskSequencePage = () => {
  // State to control the user input
  const {formContent, handleChangeSelect} = useCreateFormState();
  // Get the robisepIds from the API
  const {
    data: sequenceData,
    loading: sequenceLoading,
    error: sequenceError,
    refreshData: getSequenceData
  } = useDataGet<ITaskSequenceInDTO[]>(`/tasks/tasks/sequence?algorithm=${formContent.algorithm}`);
  // State responsible for button click
  const [buttonClicked, setButtonClicked] = React.useState(false);

  useEffect(() => {
    if (sequenceError) {
      toast.error(sequenceError.message);
      console.error('Error fetching task sequence:', sequenceError.message);
    }
  }, [sequenceError]);

  // useEffect(() => {
  //   if (sequenceData) {
  //     toast.success('Task Sequence successfully generated');
  //   }
  // }, [sequenceData]);

  // Loading
  if (sequenceLoading) {
    return <LoadingAnimation/>;
  }

  return (
    <>
      <PagePanel
        text={"Task Sequence"}
        sentence={"Planning of tasks"}
        imagePath={taskSequenceImage}/>


      <div className={'page-content'}>
        {buttonClicked && sequenceData != undefined && sequenceData!.map((sequence, index) => (
          <div key={index}>
            <Title text={sequence.robisepNickname + ' - Cost: ' + sequence.cost} className={"main-titles"} />
            <TaskSequenceTable
              tasks={sequence.Sequence}
              error={sequenceError}
              loading={sequenceLoading}
              refreshData={getSequenceData}
            />
          </div>
        ))}

      </div>
      <TaskSequenceForm handleChangeSelect={handleChangeSelect} algorithmValue={formContent.algorithm}
                        refreshTaskSequenceData={getSequenceData} setButtonClick={setButtonClicked}/>
    </>
  )
}

export default TaskSequencePage;
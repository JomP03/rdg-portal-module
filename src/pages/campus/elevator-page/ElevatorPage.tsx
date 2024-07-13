import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import ElevatorsTable from "./components/elevator-table/ElevatorsTable";
import {useDataGet} from "../../../hooks/useApiRequest";
import ElevatorInDto from "../../../dtos/in/ElevatorInDto";
import elevatorimg from "../../../assets/pagePanels/elevator.png";
import CreateElevatorForm from "./components/create-elevator-form/CreateElevatorForm";
import {useTitleAndButtonText} from "../../../hooks/useTitleAndButtonText";

const ElevatorPage = () => {
  // Get the data from the API
  const {data: elevators, error, loading, refreshData}
    = useDataGet<ElevatorInDto[]>('/campus/elevators');
  const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
  const {titleText} = useTitleAndButtonText(["Filtered By Building"], "All Elevators", isFilterOn);

  const handleRefreshData = () => {
    refreshData();
    setIsFilterOn(-1);
  }

  return (
    <>
      <PagePanel
        text={"Elevators"}
        sentence={"Create, Edit and List Elevators"}
        imagePath={elevatorimg}/>

      <div className={'page-content'}>
        <Title text={titleText} className={"main-titles"}></Title>
        <ElevatorsTable elevators={elevators || []} error={error}
                     loading={loading} refreshData={handleRefreshData} isFilterOn={isFilterOn} setIsFilterOn={setIsFilterOn}/>

        <br/><br/>

        <Title text={"Create a Elevator"} className={"main-titles"}></Title>
        {<CreateElevatorForm refreshData={handleRefreshData}/>}
      </div>

    </>
  )
}

export default ElevatorPage;
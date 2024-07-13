import React from "react";
import {useDataGet} from "../../../../hooks/useApiRequest";
import RobisepInDTO from "../../../../dtos/in/RobisepInDTO";
import PagePanel from "../../../components/page-panel/PagePanel";
import Title from "../../../../components/base/title/Title";
import robisepImg from "../../../../assets/pagePanels/robisep.png";
import RobisepsTable from "./../components/robisep-table/RobisepsTable";
import CreateRobisepForm from "./../components/create-robisep-form/CreateRobisepForm";
import {useTitleAndButtonText} from "../../../../hooks/useTitleAndButtonText";


const RobisepPage = () => {
  // Get the data from the API
  const {data: robiseps, error, loading, refreshData}
    = useDataGet<RobisepInDTO[]>('/fleet/robiseps');
  const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
  const {titleText} = useTitleAndButtonText(["Filtered by Nickname", "Filtered by Task Type  "], "All Robiseps", isFilterOn);


  const handleRefreshData = () => {
    refreshData();
    setIsFilterOn(-1);
  }

  return (
    <>
      <PagePanel
        text={"Robiseps"}
        sentence={"Create, Edit and List Robiseps"}
        imagePath={robisepImg}/>

      <div className={'page-content'}>
        <Title text={titleText} className={"main-titles"}></Title>
        <RobisepsTable robiseps={robiseps || []} error={error} setIsFilterOn={setIsFilterOn}
                       loading={loading} refreshData={handleRefreshData} isFilterOn={isFilterOn}/>

        <br/><br/>

        <Title text={"Create a Robisep"} className={"main-titles"}></Title>
        <CreateRobisepForm refreshData={handleRefreshData}/>
      </div>

    </>
  );
}

export default RobisepPage;
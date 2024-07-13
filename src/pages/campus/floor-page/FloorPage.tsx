import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import FloorsTable from "./components/floor-table/FloorsTable";
import {useDataGet} from "../../../hooks/useApiRequest";
import FloorInDto from "../../../dtos/in/FloorInDto";
import floorImg from '../../../assets/pagePanels/floor.png';
import CreateFloorForm from "./components/create-floor-form/CreateFloorForm";
import {useTitleAndButtonText} from "../../../hooks/useTitleAndButtonText";

const FloorPage = () => {
  // Get the data from the API
  const {data: floors, error, loading, refreshData}
    = useDataGet<FloorInDto[]>('/campus/floors');
  const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
  const {titleText} = useTitleAndButtonText(
    ["Filtered By Building", "Filtered with Passage by Building", "Filtered with Elevator by Building"],
    "All Floors", isFilterOn);

  const handleRefreshData = () => {
    refreshData();
    setIsFilterOn(-1)
  }

  return (
    <>
      <PagePanel
        text={"Floors"}
        sentence={"Create, Edit and List Floors"}
        imagePath={floorImg}/>

      <div className={'page-content'}>
        <Title text={titleText} className={"main-titles"}></Title>
        <FloorsTable floors={floors || []} error={error}
                     loading={loading} refreshData={handleRefreshData} isFilterOn={isFilterOn} setIsFilterOn={setIsFilterOn}/>

        <br/><br/>

        <Title text={"Create a Floor"} className={"main-titles"}></Title>
        <CreateFloorForm refreshData={handleRefreshData}/>
      </div>

    </>
  )
}

export default FloorPage;
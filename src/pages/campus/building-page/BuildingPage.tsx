import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import CreateBuildingForm from "./components/create-building-form/CreateBuildingForm";
import Title from "../../../components/base/title/Title";
import BuildingsTable from "./components/building-table/BuildingsTable";
import {Building} from "../../../interfaces/building";
import {useDataGet} from "../../../hooks/useApiRequest";
import buildingImg from '../../../assets/pagePanels/building.png';
import '../../page.css';
import {useTitleAndButtonText} from "../../../hooks/useTitleAndButtonText";

const BuildingPage = () => {
  // Get the data from the API
  const {data: buildings, error, loading, refreshData}
    = useDataGet<Building[]>('/campus/buildings');
  const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
  const {titleText} = useTitleAndButtonText(["Filtered By Min and Max Number of floors"], "All Buildings", isFilterOn);


  const handleRefreshData = () => {
    refreshData();
    setIsFilterOn(-1);
  }

  return (
    <>
      <PagePanel
        text={"Buildings"}
        sentence={"Create, Edit and List Buildings"}
        imagePath={buildingImg}/>

      <div className={'page-content'}>
        <Title text={titleText} className={"main-titles"}></Title>
        <BuildingsTable buildings={buildings || []} error={error}
                        loading={loading} refreshData={handleRefreshData} isFilterOn={isFilterOn} setIsFilterOn={setIsFilterOn}/>

        <br/><br/>

        <Title text={"Create a Building"} className={"main-titles"}></Title>
        <CreateBuildingForm refreshData={handleRefreshData}/>
      </div>

    </>
  )
}

export default BuildingPage;
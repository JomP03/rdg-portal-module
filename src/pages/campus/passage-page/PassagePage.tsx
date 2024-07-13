import React from "react";
import PagePanel from "../../components/page-panel/PagePanel";
import Title from "../../../components/base/title/Title";
import CreatePassageForm from "./components/create-passage-form/CreatePassageForm";
import PassagesTable from "./components/passage-table/PassagesTable";
import {useDataGet} from "../../../hooks/useApiRequest";
import {PassageInDto} from "../../../dtos/in/PassageInDto";
import passageImg from "../../../assets/pagePanels/passage.png";
import {useTitleAndButtonText} from "../../../hooks/useTitleAndButtonText";
  
const PassagePage = () => {
  // Get the persisted data from the API
  const {data: passages, error, loading, refreshData} = useDataGet<PassageInDto[]>('/campus/passages');
  const [isFilterOn, setIsFilterOn] = React.useState<number>(-1);
  const {titleText} = useTitleAndButtonText(["Filtered Between Buildings",], "All Passages", isFilterOn);

  const handleRefreshData = () => {
    refreshData();
    setIsFilterOn(-1);
  }

  return (
    <>
    <PagePanel
      text={"Passages"}
      sentence={"Create, Edit and List Passages"}
      imagePath={passageImg}/>

    <div className={'page-content'}>
      <Title text={titleText} className={"main-titles"}></Title>
      <PassagesTable passages={passages || []} error={error} loading={loading} refreshData={handleRefreshData}
      isFilterOn={isFilterOn} setIsFilterOn={setIsFilterOn}/>
      <br/><br/>
      <Title text={"Create a Passage"} className={"main-titles"}></Title>
      <CreatePassageForm refreshData={handleRefreshData}/>
    </div>
    </>
  )
}

export default PassagePage;
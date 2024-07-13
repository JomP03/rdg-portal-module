import React, { useEffect, useState } from "react";
import { useCreateFormState } from "../../../../../hooks/useCreateFormState";
import { useDataFilters } from "../../../../../hooks/useDataFilters";
import { mapPassageInToPassageView } from "../../../../../mappers/passageMapper";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import FilterAccordion from "../../../../../components/base/filter-accordion/FilterAccordion";
import BetweenBuildingsFilter from "./BetweenBuildingsFilter";
import { Building } from "../../../../../interfaces/building";
import { useDataGet } from "../../../../../hooks/useApiRequest";


interface PassageFiltersProps {
  handleDataChange: (data: any[]) => void;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const PassageFilters: React.FC<PassageFiltersProps> = ({ handleDataChange, setIsFilterOn }) => {
  // State responsible for handling TextField/ComboBox changes
  const { formContent, handleChangeSelect } = useCreateFormState();

  // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
  const [passageData, setPassageData] = useState<any[]>();

  // Get the buildings from the API
  const {
    data: buildings, error: buildingError, loading: buildingLoading,
    refreshData: getBuildings
  }
    = useDataGet<Building[]>('/campus/buildings');

  // Initialize the table data, only executed once
  useEffect(() => {
    getBuildings();
  }, []);

  // Prepare the buildings data, {value: buildingCode, id: domainId}
  const buildingsWithCode = buildings && buildings
    .filter((building): building is Building & { buildingCode: string; domainId: string } =>
      building.buildingCode !== undefined && building.domainId !== undefined)
    .map((building) =>
      ({ value: building.buildingCode, id: building.domainId }));

  // State responsible for holding the firstBuilding domainId
  const [firstBuildingId, setFirstBuildingId] = useState<string>();

  // State responsible for holding the lastBuilding domainId
  const [lastBuildingId, setLastBuildingId] = useState<string>();

  // Every time the lastBuilding changes, update the firstBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.firstBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setFirstBuildingId(domainId);
    }
  }, [formContent.firstBuilding]);

  // Every time the lastPointBuilding changes, update the lastBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.lastBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setLastBuildingId(domainId);
    }
  }, [formContent.lastBuilding]);

  // Use effect to define the table
  useEffect(() => {
    if (passageData) {
      const passages = passageData?.map((passage) => mapPassageInToPassageView(passage));
      handleDataChange(passages || []);
    }
  }, [passageData]);

  // If a building is selected in the startPointBuilding, remove it from the list to show for the endPointBuilding
  const filteredStartPointBuildings = buildingsWithCode?.filter((building) => building.id !== lastBuildingId);

  // If a building is selected in the endPointBuilding, remove it from the list to show for the startPointBuilding
  const filteredEndPointBuildings = buildingsWithCode?.filter((building) => building.id !== firstBuildingId);


  // Handle Filter process
  const { handleClick, loading } = useDataFilters(
    `/campus/passages/filter?firstBuildingId=${firstBuildingId}&lastBuildingId=${lastBuildingId}`,
    setPassageData,
    [formContent.firstBuilding, formContent.lastBuilding]);

  const handleFilter = () => {
    setIsFilterOn(0);
    handleClick();
  }

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <FilterAccordion filters={[
        {
          name: 'Between Buildings',
          component: <BetweenBuildingsFilter
            firstBuildingData={filteredStartPointBuildings || []}
            firstBuildingValue={formContent.firstBuilding}
            lastBuildingData={filteredEndPointBuildings || []}
            lastBuildingValue={formContent.lastBuilding}
            handleChangeSelect={handleChangeSelect} />,
          onClick: handleFilter
        },
      ]} />
    </>
  )
}

export default PassageFilters;

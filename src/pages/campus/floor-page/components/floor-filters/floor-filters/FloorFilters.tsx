import React, {useEffect, useState} from "react";
import FilterAccordion from "../../../../../../components/base/filter-accordion/FilterAccordion";
import {useCreateFormState} from "../../../../../../hooks/useCreateFormState";
import {useDataFilters} from "../../../../../../hooks/useDataFilters";
import LoadingAnimation from "../../../../../../components/loading-animation/LoadingAnimation";
import {Building} from "../../../../../../interfaces/building";
import {useDataGet} from "../../../../../../hooks/useApiRequest";
import {mapFloorInToFloorView} from "../../../../../../mappers/floorMapper";
import FloorsForAGivenBuildingFilter from "../floors-for-a-given-building-filter/FloorsForAGivenBuildingFilter";
import FloorsWithPassageForAGivenBuildingFilter
  from "../floor-with-passage-for-a-given-building/FloorsWithPassageForAGivenBuildingFilter";
import FloorsWithElevatorFilter from "../floor-with-elevator-filter/FloorsWithElevatorFilter";

interface FloorFiltersProps {
  handleDataChange: (data: any[]) => void;
  setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}


const FloorFilters: React.FC<FloorFiltersProps> = ({handleDataChange, setIsFilterOn}) => {


  // State responsible for handling ComboBox changes
  const {formContent, handleChangeSelect,} = useCreateFormState();


  // State responsible for the detecting the data arrived, mapping will be needed before sending it to the table
  const [floorData, setFloorData] = useState<any[]>();


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


  /**
   * Prepare the buildings data, {value: buildingCode, id: domainId}
   * Mapping the buildingCode with the buildingId
   */
  const buildingsWithCode = buildings && buildings
    .filter((building): building is Building & { buildingCode: string; domainId: string } =>
      building.buildingCode !== undefined && building.domainId !== undefined)
    .map((building) =>
      ({value: building.buildingCode, id: building.domainId}));


  // State responsible for holding the building domain id for the by building filter
  const [buildingForByBuildingFilter, setBuildingIdForByBuilding] =
    useState<string>();


  // State responsible for holding the building domain id for the by building and with passage filter
  const [buildingForWithPassageFilter, setBuildingIdForByBuildingWithPassage] =
    useState<string>();

  // State responsible for holding the building domain id for the by building and with elevator filter
  const [buildingForWithElevatorFilter, setBuildingIdForWithElevator] =
    useState<string>();


  // Every time the building changes for the byBuilding filter, update the buildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.buildingForByBuildingFilter);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingIdForByBuilding(domainId);
    }
  }, [formContent.buildingForByBuildingFilter]);


  // Every time the building changes for the withPassageForABuilding filter, update the buildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.buildingForWithPassageFilter);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingIdForByBuildingWithPassage(domainId);
    }
  }, [formContent.buildingForWithPassageFilter]);

  // Every time the building changes for the withElevatorForABuilding filter, update the buildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.buildingForWithElevatorFilter);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingIdForWithElevator(domainId);
    }
  }, [formContent.buildingForWithElevatorFilter]);


  // Use effect to define the table
  useEffect(() => {
    if (floorData) {
      const floors = floorData?.map((floor) => mapFloorInToFloorView(floor));
      handleDataChange(floors || []);
    }
  }, [floorData]); // Watch over floorData


  // Handle filtering by building
  const {handleClick: handleByBuilding, loading: loadingByBuilding} =
    useDataFilters(`/campus/floors/${buildingForByBuildingFilter}`,
      setFloorData, [formContent.buildingForByBuildingFilter]);

  const handleFilterByBuilding = () => {
    setIsFilterOn(0);
    handleByBuilding();
  }


  // Handle filtering by building and with passage
  const {handleClick: handleWithPassage, loading: loadingWithPassage} =
    useDataFilters(`/campus/floors/inBuilding/${buildingForWithPassageFilter}/withPassage`,
      setFloorData, [formContent.buildingForWithPassageFilter]);

  const handleFilterByBuildingWithPassage = () => {
    setIsFilterOn(1);
    handleWithPassage();
  }


  // Handle filtering by elevator
  const {handleClick: handleWithElevator, loading: loadingWithElevator} =
    useDataFilters(`/campus/floors/inBuilding/${buildingForWithElevatorFilter}/withElevator`,
      setFloorData, [formContent.buildingForWithElevatorFilter]);

  const handleFilterByBuildingWithElevator = () => {
    setIsFilterOn(2);
    handleWithElevator();
  }

  if (loadingByBuilding || loadingWithPassage || loadingWithElevator) {
    return <LoadingAnimation/>;
  }


  return (
    <>
      <FilterAccordion filters={[
        {
          name: 'Floors By Building',
          component: <FloorsForAGivenBuildingFilter
            selectedBuildingData={buildingsWithCode || []}
            selectedBuildingValue={formContent.buildingForByBuildingFilter}
            handleChangeSelect={handleChangeSelect}/>,
          onClick: handleFilterByBuilding
        },
        {
          name: 'Floors With Passage By Building',
          component: <FloorsWithPassageForAGivenBuildingFilter
            selectedBuildingData={buildingsWithCode || []}
            selectedBuildingValue={formContent.buildingForWithPassageFilter}
            handleChangeSelect={handleChangeSelect}/>,
          onClick: handleFilterByBuildingWithPassage
        },
        {
          name: 'Floors With Elevator By Building',
          component: <FloorsWithElevatorFilter
            selectedBuildingData={buildingsWithCode || []}
            selectedBuildingValue={formContent.buildingForWithElevatorFilter}
            handleChangeSelect={handleChangeSelect}
          />,
          onClick: handleFilterByBuildingWithElevator
        }
      ]}/>
    </>
  );
}


export default FloorFilters;
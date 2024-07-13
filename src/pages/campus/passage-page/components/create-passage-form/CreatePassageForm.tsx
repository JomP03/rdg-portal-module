import Form from "../../../../../components/base/form/Form";
import PassageForm from "../passage-form/PassageForm";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {Building} from "../../../../../interfaces/building";
import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import Floor from "../../../../../interfaces/floor";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import {toast} from "react-toastify";
import {PassageOutDTO} from "../../../../../dtos/out/passageOutDto";
import {mapPassageDataToPassageOut} from "../../../../../mappers/passageMapper";

interface CreatePassageFormProps {
  refreshData: () => void;
}

const CreatePassageForm: React.FC<CreatePassageFormProps> = ({refreshData}) => {
  // State for the ComboBox
  const [startPointFloorComboBox, setStartPointFloorComboBox] = useState<boolean>(true);

  // State for the ComboBox
  const [endPointFloorComboBox, setEndPointFloorComboBox] = useState<boolean>(true);

  // Prepare Post request
  const {data, loading: loadingPost, sendData} = useDataPost<PassageOutDTO>();

  // State for the form content
  const { formContent, handleChangeTextField, handleChangeSelect } = useCreateFormState();

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

  // State responsible for holding the startPointBuilding domainId
  const [startPointBuildingId, setStartPointBuildingId] = useState<string>();

  // State responsible for holding the endPointBuilding domainId
  const [endPointBuildingId, setEndPointBuildingId] = useState<string>();

  // State responsible for holding the startPointFloor domainId
  const [startPointFloorId, setStartPointFloorId] = useState<string>();

  // State responsible for holding the endPointFloor domainId
  const [endPointFloorId, setEndPointFloorId] = useState<string>();

  // Get the startPointFloors from the API
  const {
    data: startPointFloors, error: startPointFloorError, loading:
      startPointFloorLoading, refreshData: refreshStartPointFloorData
  }
    = useDataGet<Floor[]>(`/campus/floors/${startPointBuildingId}`);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  const startPointFloorsWithNumber = startPointFloors && startPointFloors
    .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
      floor.floorNumber !== undefined && floor.domainId !== undefined)
    .map((floor) =>
      ({ value: floor.floorNumber, id: floor.domainId }));

  // Get the endPointFloors from the API
  const {
    data: endPointFloors, error: endPointFloorError, loading:
      endPointFloorLoading, refreshData: refreshEndPointFloorData
  }
    = useDataGet<Floor[]>(`/campus/floors/${endPointBuildingId}`);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  const endPointFloorsWithNumber = endPointFloors && endPointFloors
    .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
      floor.floorNumber !== undefined && floor.domainId !== undefined)
    .map((floor) =>
      ({ value: floor.floorNumber, id: floor.domainId }));

  // Every time the startPointBuilding changes, update the startPointBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.startPointBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setStartPointBuildingId(domainId);
      if(domainId) {
        setStartPointFloorComboBox(false);
      }
    }
  }, [formContent.startPointBuilding]);

  // Every time the endPointBuilding changes, update the endPointBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.endPointBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setEndPointBuildingId(domainId);
    }
  }, [formContent.endPointBuilding]);

  // Every time the startPointFloor changes, update the startPointFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.startPointFloor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setStartPointFloorId(domainId);
      if(domainId) {
        setEndPointFloorComboBox(false);
      }
    }
  }, [formContent.startPointFloor]);

  // Every time the endPointFloor changes, update the endPointFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.endPointFloor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setEndPointFloorId(domainId);
    }
  }, [formContent.endPointFloor]);

  // Every time the startPointBuildingId changes, refresh the startPointFloor data
  useEffect(() => {
    if (startPointBuildingId) {
      refreshStartPointFloorData();
    }
  }, [startPointBuildingId]);

  // Every time the endPointBuildingId changes, refresh the endPointFloor data
  useEffect(() => {
    if (endPointBuildingId) {
      refreshEndPointFloorData();
    }
  }, [endPointBuildingId]);

  // If a building is selected in the startPointBuilding, remove it from the list to show for the endPointBuilding
  const filteredEndPointBuildings = buildingsWithCode && buildingsWithCode
    .filter((building) => building.value !== formContent.startPointBuilding);

  // If a building is selected in the endPointBuilding, remove it from the list to show for the startPointBuilding
  const filteredStartPointBuildings = buildingsWithCode && buildingsWithCode
    .filter((building) => building.value !== formContent.endPointBuilding);

  // When the data changes, check if it is present and show a toast
  useEffect(() => {
    if (data) {
      toast.success('Passage created successfully');
      refreshData();
    }
  }, [data]);

  const requiredFields = [
    formContent.startPointBuilding,
    formContent.startPointFloor,
    formContent.sPFirstCoordinateX,
    formContent.sPFirstCoordinateY,
    formContent.sPLastCoordinateX,
    formContent.sPLastCoordinateY,
    formContent.endPointBuilding,
    formContent.endPointFloor,
    formContent.ePFirstCoordinateX,
    formContent.ePFirstCoordinateY,
    formContent.ePLastCoordinateX,
    formContent.ePLastCoordinateY,
  ];

  const handleSubmit = async () => {
    // Check if any field is empty
    const isFormFilled = requiredFields.every((field) => field);
    if (!isFormFilled) {
      toast.warning('Please fill all the required fields!');
      return;
    }

    const passageToCreate = mapPassageDataToPassageOut(
      startPointFloorId || "",
      parseInt(formContent.sPFirstCoordinateX),
      parseInt(formContent.sPFirstCoordinateY),
      parseInt(formContent.sPLastCoordinateX),
      parseInt(formContent.sPLastCoordinateY),
      endPointFloorId || "",
      parseInt(formContent.ePFirstCoordinateX),
      parseInt(formContent.ePFirstCoordinateY),
      parseInt(formContent.ePLastCoordinateX),
      parseInt(formContent.ePLastCoordinateY),
    )

    try {
      // Send the create request
      await sendData("/campus/passages", passageToCreate);
      // Clear the form
       clearForm();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Method to clear the form
  const clearForm = () => {
    for (const key in formContent) {
      formContent[key as keyof typeof formContent] = "";
    }
  }

  // Show error
  if (startPointFloorError) {
    toast.error(startPointFloorError.message);
  } else if (endPointFloorError) {
    toast.error(endPointFloorError.message);
  }

  // Present loading animation
  if (startPointFloorLoading || endPointFloorLoading || loadingPost) {
    return <LoadingAnimation/>
  }

  const passageForm =
    <PassageForm
      startPointBuildingData={filteredStartPointBuildings || []}
      startPointFloorData={startPointFloorsWithNumber || []}
      startPointBuildingValue={formContent.startPointBuilding}
      startPointFloorValue={formContent.startPointFloor}
      startPointFloorComboBox={startPointFloorComboBox}
      sPFirstCoordinateXValue={formContent.sPFirstCoordinateX}
      sPFirstCoordinateYValue={formContent.sPFirstCoordinateY}
      sPLastCoordinateXValue={formContent.sPLastCoordinateX}
      sPLastCoordinateYValue={formContent.sPLastCoordinateY}
      endPointBuildingData={filteredEndPointBuildings || []}
      endPointFloorData={endPointFloorsWithNumber || []}
      endPointBuildingValue={formContent.endPointBuilding}
      endPointFloorValue={formContent.endPointFloor}
      endPointFloorComboBox={endPointFloorComboBox}
      ePFirstCoordinateXValue={formContent.ePFirstCoordinateX}
      ePFirstCoordinateYValue={formContent.ePFirstCoordinateY}
      ePLastCoordinateXValue={formContent.ePLastCoordinateX}
      ePLastCoordinateYValue={formContent.ePLastCoordinateY}
      handleChangeTextField={handleChangeTextField}
      handleChangeSelect={handleChangeSelect}
    />
    
  return (
    <Form
      form={passageForm}
      onSubmit={handleSubmit}
      buttonText={"Create Passage"}
      waitingForResponse={false}
    />
  )
}

export default CreatePassageForm;
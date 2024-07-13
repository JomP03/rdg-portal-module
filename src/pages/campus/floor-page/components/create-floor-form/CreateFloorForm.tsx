import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Form from "../../../../../components/base/form/Form";


import FloorOutDto from "../../../../../dtos/out/floorOutDto";
import {Building} from "../../../../../interfaces/building";
import {mapFloorDataToFloorOut} from "../../../../../mappers/floorMapper";
import FloorForm from "../floor-form/FloorForm";


interface CreateFloorFormProps {
  refreshData: () => void;
}


const CreateFloorForm: React.FC<CreateFloorFormProps> = ({refreshData}) => {
  // Use the usePost hook to handle the creation (POST) request
  const {data, loading: floorLoading, sendData} = useDataPost<FloorOutDto>();


  // State responsible for holding the building domainId
  const [buildingId, setBuildingId] = useState<string>();


  // State for the form content
  const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();


  // Get the buildings from the API
  const {
    data: buildings, error: buildingError, loading: buildingLoading, refreshData: getBuildings
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
      ({value: building.buildingCode, id: building.domainId}));


  useEffect(() => {
    const buildingElement = document.getElementById(formContent.buildingCode);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingId(domainId);
    }
  }, [formContent.buildingCode]);


  // When the data changes, check if it is present and show a toast
  useEffect(() => {
    // If the data is present, inform the user and refresh the data in the table
    if (data) {
      // Find the building code for the buildingId
      const buildingCode =
        buildings?.find((building) => building.domainId === buildingId)?.buildingCode;

      // Show success toast
      toast.success(`Floor ${data.floorNumber} for Building ${buildingCode} was created successfully!`);
    }
  }, [data]);


  // Required fields to check if the form is filled
  const requiredFields = [
    formContent.buildingCode,
    formContent.floorNumber
  ];


  // Handle the submission of the form
  const handleSubmit = async () => {
    // Check if any field is empty
    const isFormFilled = requiredFields.every((field) => field);

    if (!isFormFilled) {
      toast.warning("Please fill all the required fields!");
      return;
    }

    const floorToCreate = mapFloorDataToFloorOut(
      formContent.floorDescription ? formContent.floorDescription : undefined,
      parseInt(formContent.floorNumber),
      undefined,
      buildingId,
    )

    try {
      // Send the create request
      await sendData("/campus/floors", floorToCreate);

      // Clear the form
      clearForm();

      refreshData();

    } catch (error: any) {
      toast.error(error.message);
    }
  }


  // Method to clear the form
  const clearForm = () => {
    for (const key in formContent) {
      formContent[key as keyof typeof formContent] = "";
    }
  };


  if (buildingError)
    toast.error(buildingError.message);


  if (buildingLoading)
    return <LoadingAnimation/>;


  const floorForm =
    <FloorForm buildingData={buildingsWithCode || []} buildingValue={formContent.buildingCode}
               floorNumberValue={formContent.floorNumber}
               floorDescriptionValue={formContent.floorDescription}
               handleChangeTextField={handleChangeTextField} handleChangeSelect={handleChangeSelect}
    />


  return <Form form={floorForm} onSubmit={handleSubmit} buttonText={"Create Floor"} waitingForResponse={false}/>;
}


export default CreateFloorForm;
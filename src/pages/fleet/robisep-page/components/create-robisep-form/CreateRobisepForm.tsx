import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import RobisepOutDTO from "../../../../../dtos/out/RobisepOutDTO";
import {mapRobisepDataToRobisepOut} from "../../../../../mappers/robisepMapper";
import RobisepTypeInDTO from "../../../../../dtos/in/RobisepTypeInDto";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import RobisepForm from "./../robisep-form/RobisepForm";
import Form from "../../../../../components/base/form/Form";
import {Building} from "../../../../../interfaces/building";
import Floor from "../../../../../interfaces/floor";
import Room from "../../../../../interfaces/room";


interface CreateRobisepFormProps {
  refreshData: () => void;
}

const CreateRobisepForm: React.FC<CreateRobisepFormProps> = ({refreshData}) => {
  // Handle changes on the text fields
  const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();
  // Use the usePost hook to handle the create request
  const {data, loading: robisepLoading, sendData} = useDataPost<RobisepOutDTO>();
  // State responsible for holding the robisepTYpe domainId
  const [robisepTypeId, seRobisepTypeId] = useState<string>();
  // State responsible for holding the building domainId
  const [buildingId, setBuildingId] = useState<string>();
  // State for floor Ids
  const [floorId, setFloorId] = useState<string>();
  // State responsible for holding the startingRoom domainId
  const [roomId, setRoomId] = useState<string>();

  // Get the robisepTypes from the API
  const {
    data: robisepTypes, error: robisepError, loading: robisepTypeLoading,
    refreshData: getRobisepTypes
  }
    = useDataGet<RobisepTypeInDTO[]>('/fleet/robisepsType');

  // Get the buildings from the API
  const {
    data: buildings, error: buildingError, refreshData: getBuildings
  }
    = useDataGet<Building[]>('/campus/buildings');

  // Initialize the table data, only executed once
  useEffect(() => {
    getRobisepTypes();
  }, []);

  // Prepare the robisepTypes data, {value: buildingCode, id: domainId}
  const robisepTypeWithDesignation = robisepTypes && robisepTypes
    .filter((robisepType): robisepType is RobisepTypeInDTO & { designation: string; domainId: string } =>
      robisepType.designation !== undefined && robisepType.domainId !== undefined)
    .map((building) =>
      ({value: building.designation, id: building.domainId}));

  useEffect(() => {
    const robisepTypeElement = document.getElementById(formContent.robisepTypeDesignation);
    if (robisepTypeElement) {
      const domainId = robisepTypeElement.accessKey;
      seRobisepTypeId(domainId);
    }
  }, [formContent.robisepTypeDesignation]);

  // Initialize the building data, only executed once
  useEffect(() => {
    getBuildings();
  }, []);

  // Prepare the buildings data, {value: buildingCode, id: domainId}
  const buildingsWithCode = buildings && buildings
    .filter((building): building is Building & { buildingCode: string; domainId: string } =>
      building.buildingCode !== undefined && building.domainId !== undefined)
    .map((building) =>
      ({value: building.buildingCode, id: building.domainId}));

  // Every time the pickUp building changes, update the pickUpBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.building);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingId(domainId);
      formContent.floor = "";
      formContent.room = "";
    }
  }, [formContent.building]);

  useEffect(() => {
    if (buildingId) {
      refreshFloorsData();
    }
  }, [buildingId]);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  function floorsWithNumber(floors: Floor[] | undefined) {
    return floors && floors
      .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
        floor.floorNumber !== undefined && floor.domainId !== undefined)
      .map((floor) =>
        ({value: floor.floorNumber, id: floor.domainId}));
  }

  // Get the floors from the API
  const {
    data: floors, error: floorsError, refreshData: refreshFloorsData
  }
    = useDataGet<Floor[]>(`/campus/floors/${buildingId}`);

  // Prepare the pickUp floors data, {value: floorNumber, id: domainId}
  const floorsWithNumberMapList = floorsWithNumber(floors);

  // Prepare the rooms data, {value: roomName, id: domainId}
  function roomsWithName(rooms: Room[] | undefined) {
    return rooms && rooms
      .filter((room): room is Room & { name: string; domainId: string } =>
        room.name !== undefined && room.domainId !== undefined)
      .map((room) =>
        ({value: room.name, id: room.domainId}));
  }

  // Get the rooms from the API
  const {
    data: rooms, error: roomsError, refreshData: refreshRoomsData
  }
    = useDataGet<Room[]>(`/campus/rooms/${floorId}`);

  // Prepare the pickUp rooms data, {value: roomName, id: domainId}
  const roomsWithNameMapList = roomsWithName(rooms);

  // Every time the floor changes, update the floorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.floor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setFloorId(domainId);

      formContent.room = "";
    }
  }, [formContent.floor]);

  useEffect(() => {
    if (floorId) {
      refreshRoomsData();
    }
  }, [floorId]);

  // Every time the room changes, update the roomId
  useEffect(() => {
    const roomElement = document.getElementById(formContent.room);
    if (roomElement) {
      const domainId = roomElement.accessKey;
      setRoomId(domainId);
    }
  }, [formContent.room]);

  // When the data changes, check if it is present and show a toast
  useEffect(() => {
    // If the data is present, inform the user and refresh the data in the table
    if (data && data.code) {
      // Show success toast
      toast.success(`Robisep ${data.code} was created successfully!`);
    }
  }, [data]);

  // Required fields to check if the form is filled
  const requiredFields = [
    formContent.nickname,
    formContent.serialNumber,
    formContent.code,
    formContent.robisepTypeDesignation,
    formContent.building,
    formContent.floor,
    formContent.room
  ];

  // Handle the submission of the form
  const handleSubmit = async () => {
    // Check if any field is empty
    const isFormFilled = requiredFields.every((field) => field);
    if (!isFormFilled) {
      toast.warning("Please fill all the required fields!");
      return;
    }

    const robisepToCreate = mapRobisepDataToRobisepOut(
      formContent.nickname,
      formContent.serialNumber,
      formContent.code,
      undefined,
      formContent.descripton,
      robisepTypeId || '',
      roomId || ''
    )

    try {
      // Send the create request
      await sendData("/fleet/robiseps", robisepToCreate);
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


  if (robisepError)
    toast.error(robisepError.message);

  if (robisepLoading || robisepTypeLoading)
    return <LoadingAnimation/>;

  const robisepForm =
    <RobisepForm nicknameValue={formContent.nickname} serialNumber={formContent.serialNumber}
                 codeValue={formContent.code} descriptonValue={formContent.descripton}
                 robisepTypeValue={formContent.robisepTypeDesignation}
                 robisepTypeData={robisepTypeWithDesignation || []}
                 handleChangeTextField={handleChangeTextField} handleChangeSelect={handleChangeSelect}
                 buildingData={buildingsWithCode || []} buildingValue={formContent.building}
                 floorData={floorsWithNumberMapList || []} floorValue={formContent.floor}
                 roomData={roomsWithNameMapList || []} roomValue={formContent.room}/>;

  return <Form form={robisepForm} onSubmit={handleSubmit} buttonText={"Create Robisep"} waitingForResponse={false}/>;
}

export default CreateRobisepForm;
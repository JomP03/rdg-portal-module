import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Form from "../../../../../components/base/form/Form";
import {Building} from "../../../../../interfaces/building";
import SurveillanceTaskForm from "../task-form/SurveillanceTaskForm";
import TaskOutDto from "../../../../../dtos/out/taskOutDto";
import Floor from "../../../../../interfaces/floor";
import {mapSurveillanceTaskDataToTaskOut} from "../../../../../mappers/taskMapper";
import RobisepTypeInDTO from "../../../../../dtos/in/RobisepTypeInDto";
import Room from "../../../../../interfaces/room";
import {jwtDecode} from "jwt-decode";

interface RequestSurveillanceTaskFormProps {
  refreshData: () => void;
}

const RequestSurveillanceTaskForm: React.FC<RequestSurveillanceTaskFormProps> = ({refreshData}) => {
  // Use the useDataPost hook to handle the creation (POST) request
  const {data, loading: postLoading, sendData} = useDataPost<TaskOutDto>();

  // Get the IAM id from the local storage, only once
  const [iamId, setIamToken] = useState<string | null>(null);

  useEffect(() => {
    const iamToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(iamToken || '');
    const iamId = decodedToken.sub;
    setIamToken(iamId || null);
  }, []);

  // State responsible for holding the robisepType domainId
  const [robisepTypeId, setRobisepTypeId] = useState<string>();

  // State responsible for holding the building domainId
  const [buildingId, setBuildingId] = useState<string>();

  // State for floor Ids
  const [floorId, setFloorId] = useState<string>();

  // State responsible for holding the startingRoom domainId
  const [startingRoomId, setStartingRoomId] = useState<string>();

  // State responsible for holding the endingRoom domainId
  const [endingRoomId, setEndingRoomId] = useState<string>();

  // State for the form content
  const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();

  // Get the robisep types from the API
  const {
    data: robisepTypes, error: robisepError, loading: robisepTypeLoading,
    refreshData: getRobisepTypes
  }
    = useDataGet<RobisepTypeInDTO[]>('/fleet/robisepsType');

  // Initialize the robisep types data, only executed once
  useEffect(() => {
    getRobisepTypes();
  }, []);

  // Get the buildings from the API
  const {
    data: buildings, error: buildingError, refreshData: getBuildings
  }
    = useDataGet<Building[]>('/campus/buildings');

  // Initialize the building data, only executed once
  useEffect(() => {
    getBuildings();
  }, []);

  // Prepare the robisepType data, {value: buildingCode, id: domainId}
  const robisepTypeWithDesignation = robisepTypes && robisepTypes
    .filter((robisepType): robisepType is RobisepTypeInDTO & { designation: string; domainId: string } =>
      robisepType.designation !== undefined && robisepType.domainId !== undefined)
    .map((robisepType) =>
      ({value: robisepType.designation, id: robisepType.domainId}));

  // Prepare the buildings data, {value: buildingCode, id: domainId}
  const buildingsWithCode = buildings && buildings
    .filter((building): building is Building & { buildingCode: string; domainId: string } =>
      building.buildingCode !== undefined && building.domainId !== undefined)
    .map((building) =>
      ({value: building.buildingCode, id: building.domainId}));

  // Every time the robisep type changes, update the robisepTypeId
  useEffect(() => {
    const robisepTypeElement = document.getElementById(formContent.robisepType);
    if (robisepTypeElement) {
      const domainId = robisepTypeElement.accessKey;
      setRobisepTypeId(domainId);
    }
  }, [formContent.robisepType]);

  // Every time the pickUp building changes, update the pickUpBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.building);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setBuildingId(domainId);
      formContent.floor = "";
      formContent.startingRoom = "";
      formContent.endingRoom = "";
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

  // Get the starting rooms from the API
  const {
    data: startingRooms, error: startingRoomsError, refreshData: refreshStartingRoomsData
  }
    = useDataGet<Room[]>(`/campus/rooms/${floorId}`);

  // Get the ending rooms from the API
  const {
    data: endingRooms, error: endingRoomsError, refreshData: refreshEndingRoomsData
  }
    = useDataGet<Room[]>(`/campus/rooms/${floorId}`);

  // Prepare the pickUp rooms data, {value: roomName, id: domainId}
  const startingRoomsWithNameMapList = roomsWithName(startingRooms);
  const endingRoomsWithNameMapList = roomsWithName(endingRooms);

  // Every time the floor changes, update the floorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.floor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setFloorId(domainId);

      formContent.startingRoom = "";
      formContent.endingRoom = "";
    }
  }, [formContent.floor]);

  useEffect(() => {
    if (floorId) {
      refreshStartingRoomsData();
      refreshEndingRoomsData();
    }
  }, [floorId]);

  // Every time the starting room changes, update the startingRoomId
  useEffect(() => {
    const roomElement = document.getElementById(formContent.startingRoom);
    if (roomElement) {
      const domainId = roomElement.accessKey;
      setStartingRoomId(domainId);
    }
  }, [formContent.startingRoom]);

  // Every time the ending room changes, update the endingRoomId
  useEffect(() => {
    const roomElement = document.getElementById(formContent.endingRoom);
    if (roomElement) {
      const domainId = roomElement.accessKey;
      setEndingRoomId(domainId);
    }
  }, [formContent.endingRoom]);

  // If a room is selected in startingRoom, remove it from the endingRoom list
  const filteredEndingRoomsWithNameMapList = endingRoomsWithNameMapList && endingRoomsWithNameMapList
    .filter((endingRoom) => endingRoom.value !== formContent.startingRoom);

  // If a room is selected in endingRoom, remove it from the startingRoom list
  const filteredStartingRoomsWithNameMapList = startingRoomsWithNameMapList && startingRoomsWithNameMapList
    .filter((startingRoom) => startingRoom.value !== formContent.endingRoom);

  // Required fields to check if the form is filled
  const requiredFields = [
    formContent.robisepType,
    formContent.building,
    formContent.floor,
    formContent.emergencyPhoneNumber,
    formContent.startingRoom,
    formContent.endingRoom
  ];

  // Function responsible for checking if all the required fields are filled
  const checkRequiredFields = () => {
    return requiredFields.every((field) => field);
  }

  // Handle the submission of the form
  const handleSubmit = async () => {
    // Check if all the required fields are filled
    if (!checkRequiredFields()) {
      toast.warn('Please fill all the required fields');
      return;
    }

    const surveillanceTaskToRequest = mapSurveillanceTaskDataToTaskOut(
      formContent.emergencyPhoneNumber,
      iamId || "",
      startingRoomId || "",
      endingRoomId || "",
      robisepTypeId || "",
    )

    try {
      // Send the create request
      await sendData("/tasks/tasks", surveillanceTaskToRequest);

      // Clear the form
      clearForm();

      refreshData();

    } catch (error: any) {
      toast.error(error.message);
    }
  }

  // When the data changes, check if it is present and show a toast
  useEffect(() => {
    // If the data is present, inform the user and refresh the data in the table
    if (data) {
      // Show success toast
      toast.success(`Surveillance task was requested successfully!`);
    }
  }, [data]);

  // Method to clear the form
  const clearForm = () => {
    for (const key in formContent) {
      formContent[key as keyof typeof formContent] = "";
    }
  };

  if (buildingError || robisepError || floorsError || startingRoomsError || endingRoomsError) {
    switch (true) {
      case buildingError !== undefined:
        toast.error(buildingError.message);
        break;
      case robisepError !== undefined:
        toast.error(robisepError.message);
        break;
      case floorsError !== undefined:
        toast.error(floorsError.message);
        break;
      case startingRoomsError !== undefined:
        toast.error(startingRoomsError.message);
        break;
      case endingRoomsError !== undefined:
        toast.error(endingRoomsError.message);
        break;
    }
  }

  if (postLoading)
    return <LoadingAnimation/>;


  const surveillanceTaskForm =
    <SurveillanceTaskForm robisepTypeData={robisepTypeWithDesignation || []} robisepTypeValue={formContent.robisepType}
                          buildingData={buildingsWithCode || []} buildingValue={formContent.building}
                          emergencyPhoneNumberValue={formContent.emergencyPhoneNumber}
                          handleChangeTextField={handleChangeTextField} handleChangeSelect={handleChangeSelect}
                          floorData={floorsWithNumberMapList || []} floorValue={formContent.floor}
                          startingRoomData={filteredStartingRoomsWithNameMapList || []}
                          startingRoomValue={formContent.startingRoom}
                          endingRoomData={filteredEndingRoomsWithNameMapList || []}
                          endingRoomValue={formContent.endingRoom}/>


  return <Form form={surveillanceTaskForm} onSubmit={handleSubmit} buttonText={"Create Surveillance Task"}
               waitingForResponse={false}/>;
}


export default RequestSurveillanceTaskForm;
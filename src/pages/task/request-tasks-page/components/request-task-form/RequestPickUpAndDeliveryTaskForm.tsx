import React, {useEffect, useState} from "react";
import {useCreateFormState} from "../../../../../hooks/useCreateFormState";
import {useDataGet, useDataPost} from "../../../../../hooks/useApiRequest";
import {toast} from "react-toastify";
import LoadingAnimation from "../../../../../components/loading-animation/LoadingAnimation";
import Form from "../../../../../components/base/form/Form";
import {Building} from "../../../../../interfaces/building";
import TaskOutDto from "../../../../../dtos/out/taskOutDto";
import Floor from "../../../../../interfaces/floor";
import {
  mapPickUpAndDeliveryTaskDataToTaskOut,
} from "../../../../../mappers/taskMapper";
import RobisepTypeInDTO from "../../../../../dtos/in/RobisepTypeInDto";
import Room from "../../../../../interfaces/room";
import PickUpAndDeliveryTaskForm from "../task-form/PickUpAndDeliveryTaskForm";
import {jwtDecode} from "jwt-decode";

interface RequestPickUpAndDeliveryTaskFormProps {
  refreshData: () => void;
}

const RequestPickUpAndDeliveryTaskForm: React.FC<RequestPickUpAndDeliveryTaskFormProps> = ({refreshData}) => {
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

  // State responsible for holding the pickUpBuilding domainId
  const [pickUpBuildingId, setPickUpBuildingId] = useState<string>();

  // State responsible for holding the deliveryBuilding domainId
  const [deliveryBuildingId, setDeliveryBuildingId] = useState<string>();

  // State responsible for holding the pickUpFloor domainId
  const [pickUpFloorId, setPickUpFloorId] = useState<string>();

  // State responsible for holding the deliveryFloor domainId
  const [deliveryFloorId, setDeliveryFloorId] = useState<string>();

  // State responsible for holding the pickUpRoom domainId
  const [pickUpRoomId, setPickUpRoomId] = useState<string>();

  // State responsible for holding the deliveryRoom domainId
  const [deliveryRoomId, setDeliveryRoomId] = useState<string>();

  // State for the form content
  const {formContent, handleChangeTextField, handleChangeSelect} = useCreateFormState();

  // Get the robisep types from the API
  const {
    data: robisepTypes, error: robisepError,
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
    const buildingElement = document.getElementById(formContent.pickUpBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setPickUpBuildingId(domainId);

      formContent.pickUpFloor = "";
      formContent.pickUpRoom = "";
    }
  }, [formContent.pickUpBuilding]);

  useEffect(() => {
    if (pickUpBuildingId) {
      refreshPickUpFloorsData();
    }
  }, [pickUpBuildingId]);

  // Every time the delivery building changes, update the deliveryBuildingId
  useEffect(() => {
    const buildingElement = document.getElementById(formContent.deliveryBuilding);
    if (buildingElement) {
      const domainId = buildingElement.accessKey;
      setDeliveryBuildingId(domainId);

      formContent.deliveryFloor = "";
      formContent.deliveryRoom = "";
    }
  }, [formContent.deliveryBuilding]);

  useEffect(() => {
    if (deliveryBuildingId) {
      refreshDeliveryFloorsData();
    }
  }, [deliveryBuildingId]);

  // Prepare the floors data, {value: floorNumber, id: domainId}
  function floorsWithNumber(floors: Floor[] | undefined) {
    return floors && floors
      .filter((floor): floor is Floor & { floorNumber: string; domainId: string } =>
        floor.floorNumber !== undefined && floor.domainId !== undefined)
      .map((floor) =>
        ({value: floor.floorNumber, id: floor.domainId}));
  }

  // Get the pickUp floors from the API
  const {
    data: pickUpFloors, error: pickUpFloorsError, refreshData: refreshPickUpFloorsData
  }
    = useDataGet<Floor[]>(`/campus/floors/${pickUpBuildingId}`);

  // Prepare the pickUp floors data, {value: floorNumber, id: domainId}
  const pickUpFloorsWithNumber = floorsWithNumber(pickUpFloors);

  // Get the delivery floors from the API
  const {
    data: deliveryFloors,
    error: deliveryFloorsError,
    refreshData: refreshDeliveryFloorsData
  }
    = useDataGet<Floor[]>(`/campus/floors/${deliveryBuildingId}`);

  // Prepare the delivery floors data, {value: floorNumber, id: domainId}
  const deliveryFloorsWithNumber = floorsWithNumber(deliveryFloors);

  // Prepare the rooms data, {value: roomName, id: domainId}
  function roomsWithName(rooms: Room[] | undefined) {
    return rooms && rooms
      .filter((room): room is Room & { name: string; domainId: string } =>
        room.name !== undefined && room.domainId !== undefined)
      .map((room) =>
        ({value: room.name, id: room.domainId}));
  }

  // Get the pickUp rooms from the API
  const {
    data: pickUpRooms, error: pickUpRoomsError, refreshData: refreshPickUpRoomsData
  }
    = useDataGet<Room[]>(`/campus/rooms/${pickUpFloorId}`);

  // Prepare the pickUp rooms data, {value: roomName, id: domainId}
  const pickUpRoomsWithName = roomsWithName(pickUpRooms);

  // Get the delivery rooms from the API
  const {
    data: deliveryRooms, error: deliveryRoomsError, refreshData: refreshDeliveryRoomsData
  }
    = useDataGet<Room[]>(`/campus/rooms/${deliveryFloorId}`);

  // Prepare the delivery rooms data, {value: roomName, id: domainId}
  const deliveryRoomsWithName = roomsWithName(deliveryRooms);

  // Every time the pickUp floor changes, update the pickUpFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.pickUpFloor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setPickUpFloorId(domainId);

      formContent.pickUpRoom = "";
    }
  }, [formContent.pickUpFloor]);

  useEffect(() => {
    if (pickUpFloorId) {
      refreshPickUpRoomsData();
    }
  }, [pickUpFloorId]);

  // Every time the delivery floor changes, update the deliveryFloorId
  useEffect(() => {
    const floorElement = document.getElementById(formContent.deliveryFloor);
    if (floorElement) {
      const domainId = floorElement.accessKey;
      setDeliveryFloorId(domainId);

      formContent.deliveryRoom = "";
    }
  }, [formContent.deliveryFloor]);

  useEffect(() => {
    if (deliveryFloorId) {
      refreshDeliveryRoomsData();
    }
  }, [deliveryFloorId]);

  // Every time the pickUp room changes, update the pickUpRoomId
  useEffect(() => {
    const roomElement = document.getElementById(formContent.pickUpRoom);
    if (roomElement) {
      const domainId = roomElement.accessKey;
      setPickUpRoomId(domainId);
    }
  }, [formContent.pickUpRoom]);

  // Every time the delivery room changes, update the deliveryRoomId
  useEffect(() => {
    const roomElement = document.getElementById(formContent.deliveryRoom);
    if (roomElement) {
      const domainId = roomElement.accessKey;
      setDeliveryRoomId(domainId);
    }
  }, [formContent.deliveryRoom]);

  // If a room is selected in the pickUpRoom, remove it from the list to show for the deliveryRoom
  const filteredDeliveryRooms = deliveryRoomsWithName && deliveryRoomsWithName
    .filter((room) => room.value !== formContent.pickUpRoom);

  // If a room is selected in the deliveryRoom, remove it from the list to show for the pickUpRoom
  const filteredPickUpRooms = pickUpRoomsWithName && pickUpRoomsWithName
    .filter((room) => room.value !== formContent.deliveryRoom);

  // Required fields to check if the form is filled
  const requiredFields = [
    formContent.robisepType,
    formContent.pickUpBuilding,
    formContent.pickUpFloor,
    formContent.pickUpRoom,
    formContent.deliveryBuilding,
    formContent.deliveryFloor,
    formContent.deliveryRoom,
    formContent.pickUpPersonPhoneNumber,
    formContent.pickUpPersonPersonalName,
    formContent.deliveryPersonPhoneNumber,
    formContent.deliveryPersonPersonalName,
    formContent.description,
    formContent.confirmationCode,
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

    const surveillanceTaskToRequest = mapPickUpAndDeliveryTaskDataToTaskOut(
      formContent.pickUpPersonPhoneNumber,
      formContent.pickUpPersonPersonalName,
      formContent.deliveryPersonPhoneNumber,
      formContent.deliveryPersonPersonalName,
      parseInt(formContent.confirmationCode),
      formContent.description,
      iamId || "",
      robisepTypeId,
      pickUpRoomId,
      deliveryRoomId,
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
      toast.success(`Pickup and Delivery task was requested successfully!`);
    }
  }, [data]);

  // Method to clear the form
  const clearForm = () => {
    for (const key in formContent) {
      formContent[key as keyof typeof formContent] = "";
    }
  };

  if (buildingError || robisepError || pickUpFloorsError || deliveryFloorsError || pickUpRoomsError || deliveryRoomsError) {
    switch (true) {
      case buildingError !== undefined:
        toast.error(buildingError.message);
        break;
      case robisepError !== undefined:
        toast.error(robisepError.message);
        break;
      case pickUpFloorsError !== undefined:
        toast.error(pickUpFloorsError.message);
        break;
      case deliveryFloorsError !== undefined:
        toast.error(deliveryFloorsError.message);
        break;
      case pickUpRoomsError !== undefined:
        toast.error(pickUpRoomsError.message);
        break;
      case deliveryRoomsError !== undefined:
        toast.error(deliveryRoomsError.message);
        break;
    }
  }

  if (postLoading)
    return <LoadingAnimation/>;


  const surveillanceTaskForm =
    <PickUpAndDeliveryTaskForm originBuildingData={buildingsWithCode || []}
                               originBuildingValue={formContent.pickUpBuilding}
                               originFloorData={pickUpFloorsWithNumber || []} originFloorValue={formContent.pickUpFloor}
                               originRoomData={filteredPickUpRooms || []} originRoomValue={formContent.pickUpRoom}
                               destinationBuildingData={buildingsWithCode || []}
                               destinationBuildingValue={formContent.deliveryBuilding}
                               destinationFloorData={deliveryFloorsWithNumber || []}
                               destinationFloorValue={formContent.deliveryFloor}
                               destinationRoomData={filteredDeliveryRooms || []}
                               destinationRoomValue={formContent.deliveryRoom}
                               robisepTypeData={robisepTypeWithDesignation || []}
                               robisepTypeValue={formContent.robisepType}
                               handleChangeSelect={handleChangeSelect}
                               handleChangeTextField={handleChangeTextField}
                               confirmationCode={formContent.confirmationCode}
                               deliveryPersonPersonalName={formContent.deliveryPersonPersonalName}
                               deliveryPersonPhoneNumber={formContent.deliveryPersonPhoneNumber}
                               description={formContent.description}
                               pickUpPersonPersonalName={formContent.pickUpPersonPersonalName}
                               pickUpPersonPhoneNumber={formContent.pickUpPersonPhoneNumber}/>


  return <Form form={surveillanceTaskForm} onSubmit={handleSubmit} buttonText={"Create Pickup and Delivery Task"}
               waitingForResponse={false}/>;
}


export default RequestPickUpAndDeliveryTaskForm;
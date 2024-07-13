import RobisepTypeInDTO from "./RobisepTypeInDto";
import {RoomInDto} from "./RoomInDto";
import RobisepInDTO from "./RobisepInDTO";

interface PickUpAndDeliveryTaskInDto {
  pickUpPersonContact: {
    name: string;
    phoneNumber: string;
  };
  deliveryPersonContact: {
    name: string;
    phoneNumber: string;
  };
  description: string;
  confirmationCode: number;
  pickUpRoom: RoomInDto;
  deliveryRoom: RoomInDto;
}

interface SurveillanceTaskInDto {
  emergencyPhoneNumber: string;
  startingPointToWatch: RoomInDto;
  endingPointToWatch: RoomInDto;
}

export default interface TaskInDto {
  domainId: string;
  robisepType: RobisepTypeInDTO;
  taskCode: number;
  email: string;
  robisep?: RobisepInDTO;

  state: string;

  // Pickup and delivery task
  pickUpAndDeliveryTask?: PickUpAndDeliveryTaskInDto;

  // Surveillance task
  surveillanceTask?: SurveillanceTaskInDto;
}

export enum TaskState {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
  PLANNED = 'PLANNED',
}
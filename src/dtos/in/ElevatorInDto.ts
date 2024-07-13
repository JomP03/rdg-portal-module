import { Building } from "../../interfaces/building";
import Floor from "../../interfaces/floor";

interface ElevatorPositionDTO {
  xposition: number;
  yposition: number;
}

export default interface ElevatorInDto {
  domainId: string;
  uniqueNumber: number;
  brand?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
  elevatorPosition: ElevatorPositionDTO;
  orientation: string;
  building: Building;
  floors: Floor[];
}


export enum ElevatorOrientation{
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST',
}

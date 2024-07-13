import Floor from "../../interfaces/floor";


interface PositionDTO {
    xPosition: number;
    yPosition: number;
}

interface RoomDimensionsDTO {
    initialPosition: PositionDTO;
    finalPosition: PositionDTO;
}
export interface RoomInDto {
    domainId: string;
    name: string;
    description: string;
    category: string;
    floor: Floor;
    dimensions: RoomDimensionsDTO;
    doorPosition: PositionDTO;
    doorOrientation: string;
}



export enum RoomCategory {
    OFFICE = 'Office',
    LABORATORY = 'Laboratory',
    AUDITORIUM = 'Auditorium',
    OTHER = 'Other',
}

export enum DoorOrientation {
    NORTH = 'North',
    SOUTH = 'South',
    EAST = 'East',
    WEST = 'West',
}
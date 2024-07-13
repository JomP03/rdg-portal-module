import Floor from "./floor";

interface PositionDTO {
    xPosition: number;
    yPosition: number;
}

interface RoomDimensionsDTO {
    initialPosition: PositionDTO;
    finalPosition: PositionDTO;
}

export default interface Room {
    domainId: string;
    name: string;
    description: string;
    category: string;
    dimensions: RoomDimensionsDTO;
    doorPosition: PositionDTO;
    doorOrientation: string;
    floor: Floor;
}

interface PositionDTO {
    xPosition: number;
    yPosition: number;
}

interface RoomDimensionsDTO {
    initialPosition: PositionDTO;
    finalPosition: PositionDTO;
}
export interface RoomOutDto {
    domainId?: string;
    name: string;
    description: string;
    category: string;
    floorId: string;
    dimensions: RoomDimensionsDTO;
    doorPosition: PositionDTO;
    doorOrientation: string;
}
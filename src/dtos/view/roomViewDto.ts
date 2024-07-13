
export interface RoomViewDto {
    domainId?: string;
    name: string;
    description: string;
    category: string;
    buildingCode?: string;
    floorNumber: number;
    initialX: number;
    initialY: number;
    finalX: number;
    finalY: number;
    doorX: number;
    doorY: number;
    doorOrientation: string;
}
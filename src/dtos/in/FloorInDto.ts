import {Building} from "../../interfaces/building";

export default interface FloorInDto {
    domainId: string;
    floorNumber: number;
    floorDescription?: string;
    building: Building;
    floorPlan?: JSON;
}


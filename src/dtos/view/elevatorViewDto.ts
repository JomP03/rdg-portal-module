export default interface ElevatorViewDto {
    buildingCode?: string;
    uniqueNumber: number;
    brand?: string;
    model?: string;
    floors: string[];
    xposition: number;
    yposition: number;
    orientation: string;
    description?: string;
}   
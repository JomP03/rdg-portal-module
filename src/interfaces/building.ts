interface Dimensions {
    width: number;
    length: number;
}
export interface Building {
    domainId?: string;
    buildingCode?: string;
    buildingName?: string;
    buildingDescription?: string;
    buildingDimensions: Dimensions;
}
export interface MapData {
    groundTextureUrl: string;
    wallTextureUrl: string;
    elevatorModel : string;
    doorModel : string;
    doorFrameModel : string;
    passageModel : string;
    size: {
        width: number;
        height: number;
    };
    map: number[][];
    initialPosition: number[];
    initialDirection: number;
    connections: {
        connectionType: string;
        connectionCoords: number[];
        destFloorIds: { [key: number]: string }[];
        destFloorInitiCoords: number[];
        destFloorInitiDirection: number;
    }[];
    floorElements: {
        initCoords: number[];
        finalCoords: number[];
        displayName: string;
    }[];
    tryTime: number;
    isAnimationMode: boolean;
    path: string;
}
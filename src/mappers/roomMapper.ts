import {RoomViewDto} from "../dtos/view/roomViewDto";
import {RoomOutDto} from "../dtos/out/roomOutDto";
import {RoomInDto} from "../dtos/in/RoomInDto";


const mapRoomInToRoomView = (room: RoomInDto): RoomViewDto => {
    const { floor, dimensions, doorPosition, ...rest } = room;
    return {
        ...rest,
        buildingCode: floor.building.buildingCode,
        floorNumber: floor.floorNumber,
        initialY: dimensions.initialPosition.yPosition,
        initialX: dimensions.initialPosition.xPosition,
        finalY: dimensions.finalPosition.yPosition,
        finalX: dimensions.finalPosition.xPosition,
        doorX: doorPosition.xPosition,
        doorY: doorPosition.yPosition
    };
};


const mapRoomDataToRoomOut = (name: string, category: string, description: string, floorId: string,
                              initialX: number, initialY: number, finalX: number, finalY: number,
                              doorX: number, doorY: number, doorOrientation: string): RoomOutDto => {
    return {
        name,
        category,
        description,
        floorId,
        dimensions: {
            initialPosition: { xPosition: initialX, yPosition: initialY },
            finalPosition: { xPosition: finalX, yPosition: finalY }
        },
        doorPosition: { xPosition: doorX, yPosition: doorY },
        doorOrientation
    };
};

export { mapRoomInToRoomView, mapRoomDataToRoomOut };

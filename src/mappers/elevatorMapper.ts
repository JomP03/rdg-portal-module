import ElevatorInDto from "../dtos/in/ElevatorInDto";
import ElevatorOutDto from "../dtos/out/elevatorOutDto";
import ElevatorViewDto  from "../dtos/view/elevatorViewDto";


const mapElevatorInToElevatorView = (elevator: ElevatorInDto): ElevatorViewDto => {
    const {building, floors, ...rest } = elevator;

    const floorsString = floors ? floors.map(floor => floor.floorNumber + ',') : [];
    // remove last comma
    if (floorsString.length > 0) {
        floorsString[floorsString.length - 1] = floorsString[floorsString.length - 1].slice(0, -1);
    }
    
    return {
        ...rest,
        buildingCode: elevator.building.buildingCode,
        floors: floorsString,
        xposition: elevator.elevatorPosition.xposition,
        yposition: elevator.elevatorPosition.yposition
    };
};


const mapElevatorDataToElevatorOut = (brand?: string, model?: string, serialNumber?: string,
                                        description?: string, xpos?: number, ypos?: number, orientation?: string, building?: string,
                                        floors?: string[]): ElevatorOutDto => {

    let elevatorPosition = {
        xposition: xpos,
        yposition: ypos
    };
    

    return {
        brand,
        model,
        serialNumber,
        description,
        elevatorPosition,
        orientation,
        building,
        floors
    };
};


export {mapElevatorInToElevatorView, mapElevatorDataToElevatorOut};
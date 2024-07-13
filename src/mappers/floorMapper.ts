import FloorInDto from "../dtos/in/FloorInDto";
import FloorViewDto from "../dtos/view/floorViewDto";
import FloorOutDto from "../dtos/out/floorOutDto";


const mapFloorInToFloorView = (floorIn: FloorInDto): FloorViewDto => {
  const { building,  ...rest} = floorIn;
  return {
    ...rest,
    buildingCode: floorIn.building.buildingCode,
    floorPlan: floorIn.floorPlan ? "loaded" : "no floor plan"
  };
};


const mapFloorDataToFloorOut = (floorDescription?: string, floorNumber?: number, floorPlan?: JSON,
                                buildingId?: string): FloorOutDto => {
  // For creation
  if (!floorPlan) {
    return {
      floorDescription,
      floorNumber,
      buildingId,
    };
  }

  return {
    floorDescription,
    floorNumber,
    floorPlan,
    buildingId,
  };
};


export {mapFloorInToFloorView, mapFloorDataToFloorOut};

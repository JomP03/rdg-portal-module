import { PassageInDto } from '../dtos/in/PassageInDto';
import { PassageOutDTO } from '../dtos/out/passageOutDto';
import { PassageViewDto } from '../dtos/view/passageViewDto';

const mapPassageInToPassageView = (passage: PassageInDto): PassageViewDto => {
  const { passageStartPoint, passageEndPoint, ...rest } = passage;
  return {
    ...rest,
    startPointBuilding: passageStartPoint.floor.building.buildingCode?.toString(),
    startPointFloor: passageStartPoint.floor.floorNumber,
    endPointBuilding: passageEndPoint.floor.building.buildingCode?.toString(),
    endPointFloor: passageEndPoint.floor.floorNumber,
    sPFirstCoordinateX: passageStartPoint.firstCoordinates.x,
    sPFirstCoordinateY: passageStartPoint.firstCoordinates.y,
    sPLastCoordinateX: passageStartPoint.lastCoordinates.x,
    sPLastCoordinateY: passageStartPoint.lastCoordinates.y,
    ePFirstCoordinateX: passageEndPoint.firstCoordinates.x,
    ePFirstCoordinateY: passageEndPoint.firstCoordinates.y,
    ePLastCoordinateX: passageEndPoint.lastCoordinates.x,
    ePLastCoordinateY: passageEndPoint.lastCoordinates.y,
  };
};

const mapPassageDataToPassageOut = (
  startPointFloorId: string,
  startPointfirstCoordinatesX: number,
  startPointfirstCoordinatesY: number,
  startPointlastCoordinatesX: number,
  startPointlastCoordinatesY: number,
  endPointFloorId: string,
  endPointfirstCoordinatesX: number,
  endPointfirstCoordinatesY: number,
  endPointlastCoordinatesX: number,
  endPointlastCoordinatesY: number,
): PassageOutDTO => {
  return {
    passageStartPoint: {
      floorId: startPointFloorId,
      firstCoordinates: {
        x: startPointfirstCoordinatesX,
        y: startPointfirstCoordinatesY,
      },
      lastCoordinates: {
        x: startPointlastCoordinatesX,
        y: startPointlastCoordinatesY,
      },
    },
    passageEndPoint: {
      floorId: endPointFloorId,
      firstCoordinates: {
        x: endPointfirstCoordinatesX,
        y: endPointfirstCoordinatesY,
      },
      lastCoordinates: {
        x: endPointlastCoordinatesX,
        y: endPointlastCoordinatesY,
      },
    },
  };
};

export { mapPassageInToPassageView, mapPassageDataToPassageOut };
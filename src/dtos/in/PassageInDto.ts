import Floor from "../../interfaces/floor";

interface CoordinatesDTO {
  x : number;
  y : number;
}

interface PassagePointDTO {
floor: Floor;
firstCoordinates: CoordinatesDTO;
lastCoordinates: CoordinatesDTO;
}

export interface PassageInDto {
domainId? : string;
passageStartPoint: PassagePointDTO;
passageEndPoint: PassagePointDTO;
}
interface CoordinatesDTO {
    x : number;
    y : number;
}

interface PassagePointDTO {
  floorId: string;
  firstCoordinates: CoordinatesDTO;
  lastCoordinates: CoordinatesDTO;
}

export interface PassageOutDTO {
  domainId? : string;
  passageStartPoint: PassagePointDTO;
  passageEndPoint: PassagePointDTO;
}
import FloorInDto from "../dtos/in/FloorInDto";


export const floorsMock: FloorInDto[] = [
  {
    domainId: '1',
    floorNumber: 1,
    building: {
      domainId: '1',
      buildingName: 'Building 1',
      buildingCode: 'Code1',
      buildingDimensions: {
        width: 1,
        length: 1,
      },
    },
    floorDescription: 'Floor 1',
  },
    {
      domainId: '2',
      floorNumber: 2,
      building: {
        domainId: '2',
        buildingName: 'Building 2',
        buildingCode: 'Code2',
        buildingDimensions: {
          width: 2,
          length: 2,
      }
    },
      floorDescription: 'Floor 2',
  }
];

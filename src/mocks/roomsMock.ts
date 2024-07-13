import {RoomInDto} from "../dtos/in/RoomInDto";

export const roomsMock: RoomInDto[] = [
  {
    domainId: '1',
    name: 'Room 1',
    category: 'Category 1',
    floor: {
      domainId: '1',
      floorNumber: 1,
      building: {
        domainId: '1',
        buildingName: 'Building 1',
        buildingCode: 'BuildingCode 1',
        buildingDimensions: {
          width: 1,
          length: 1,
        }
      }
    },
    description: 'Description 1',
    dimensions: {
      initialPosition: {
        xPosition: 1,
        yPosition: 1,
      },
      finalPosition: {
        xPosition: 1,
        yPosition: 1,
      }
    },
    doorPosition: {
      xPosition: 1,
      yPosition: 1,
    },
    doorOrientation: 'DoorOrientation 1',
  },
  {
    domainId: '2',
    name: 'Room 2',
    category: 'Category 2',
    floor: {
      domainId: '2',
      floorNumber: 2,
      building: {
        domainId: '2',
        buildingName: 'Building 2',
        buildingCode: 'BuildingCode 2',
        buildingDimensions: {
          width: 2,
          length: 2,
        },
      },
    },
    description: 'Description 2',
    dimensions: {
      initialPosition: {
        xPosition: 2,
        yPosition: 2,
      },
      finalPosition: {
        xPosition: 2,
        yPosition: 2,
      },
    },
    doorPosition: {
      xPosition: 2,
      yPosition: 2,
    },
    doorOrientation: 'DoorOrientation 2',
  },
];

export const newRoom: RoomInDto = {
  domainId: '3',
  name: 'Room 3',
  category: 'OTHER',
  floor: {
    domainId: '3',
    floorNumber: 3,
    building: {
      domainId: '3',
      buildingName: 'Building 3',
      buildingCode: 'BuildingCode 3',
      buildingDimensions: {
        width: 3,
        length: 3,
      },
    },
  },
  description: 'Description 3',
  dimensions: {
    initialPosition: {
      xPosition: 3,
      yPosition: 3,
    },
    finalPosition: {
      xPosition: 4,
      yPosition: 4,
    },
  },
  doorPosition: {
    xPosition: 4,
    yPosition: 4,
  },
  doorOrientation: 'EAST',
};
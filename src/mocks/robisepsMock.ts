import RobisepInDTO from "../dtos/in/RobisepInDTO";


export const robisepsMock: RobisepInDTO[] = [
  {
    domainId: "1",
    nickname: "Robisep 1",
    robisepType: {
      domainId: "1",
      designation: "RobisepType 1",
      brand: "RobisepBrand",
      model: "1",
      tasksType: ['TRANSPORT'],
    },
    room: {
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
    serialNumber: "1",
    code: "1",
    description: "Descripton 1",
    state: "ACTIVE",
  },
  {
    domainId: "2",
    nickname: "Robisep 2",
    robisepType: {
      domainId: "2",
      designation: "RobisepType 2",
      brand: "RobisepBrand",
      model: "2",
      tasksType: ['TRANSPORT'],
    },
    room: {
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
        }
      },
      doorPosition: {
        xPosition: 2,
        yPosition: 2,
      },
      doorOrientation: 'DoorOrientation 2',
    },
    serialNumber: "2",
    code: "2",
    description: "Descripton 2",
    state: "ACTIVE",
  },
]
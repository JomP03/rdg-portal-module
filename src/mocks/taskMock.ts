import TaskInDto from "../dtos/in/TaskInDto";

export const tasksMock: TaskInDto[] = [
    {
        domainId: 'surveillance',
        robisepType: {
            domainId: '1',
            designation: 'SurveillanceRobisep',
            brand: 'SurveillanceRobiseps',
            model: 'SurveillanceRobisepX421',
            tasksType: ['SURVEILLANCE'],
        },
        taskCode: 123,
        email: 'teste1@isep.ipp.pt',
        state: 'REQUESTED',
        surveillanceTask: {
            emergencyPhoneNumber: '912345678',
            startingPointToWatch: {
                domainId: '1',
                name: 'StartingPointToWatch1',
                description: 'StartingPointToWatch1',
                category: 'OFFICE',
                floor: {
                    domainId: '1',
                    floorNumber: 9,
                    building: {
                        domainId: '1',
                        buildingName: 'Building 1',
                        buildingCode: 'Building 1',
                        buildingDimensions: {
                            width: 1,
                            length: 1,
                        }
                    }
                },
                dimensions: {
                    initialPosition: {
                        xPosition: 1,
                        yPosition: 1,
                    },
                    finalPosition: {
                        xPosition: 1,
                        yPosition: 1,
                    },
                },
                doorPosition: {
                    xPosition: 1,
                    yPosition: 1,
                },
                doorOrientation: 'NORTH',
            },
            endingPointToWatch: {
                domainId: '2',
                name: 'EndingPointToWatch2',
                description: 'EndingPointToWatch2',
                category: 'OFFICE',
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
                doorOrientation: 'NORTH',
            },
        },
    }
];
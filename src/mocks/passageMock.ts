import {PassageInDto} from "../dtos/in/PassageInDto";

export const passagesMock: PassageInDto[] = [
    {
        domainId: '1',
        passageStartPoint: {
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
            firstCoordinates: {
                x: 1,
                y: 1,
            },
            lastCoordinates: {
                x: 1,
                y: 1,
            }
        },
        passageEndPoint: {
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
            firstCoordinates: {
                x: 2,
                y: 2,
            },
            lastCoordinates: {
                x: 2,
                y: 2,
            }
        }
    },
    {
        domainId: '2',
        passageStartPoint: {
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
            firstCoordinates: {
                x: 3,
                y: 3,
            },
            lastCoordinates: {
                x: 3,
                y: 3,
            }
        },
        passageEndPoint: {
            floor: {
                domainId: '4',
                floorNumber: 4,
                building: {
                    domainId: '4',
                    buildingName: 'Building 4',
                    buildingCode: 'BuildingCode 4',
                    buildingDimensions: {
                        width: 4,
                        length: 4,
                    },
                },
            },
            firstCoordinates: {
                x: 4,
                y: 4,
            },
            lastCoordinates: {
                x: 4,
                y: 4,
            }
        }
    },
]

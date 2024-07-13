import ElevatorInDto from "../dtos/in/ElevatorInDto";

export const elevatorsMock: ElevatorInDto[] = [
    {
        domainId: '1',
        uniqueNumber: 1,
        brand: 'brand 1',
        model: 'model 1',
        serialNumber: 'serialNumber 1',
        description: 'description 1',
        elevatorPosition: {
            xposition: 11,
            yposition: 12,
        },
        orientation: 'orientation 1',
        building: {
            domainId: '1',
            buildingName: 'buildingName 1',
            buildingCode: 'buildingCode 1',
            buildingDimensions: {
                width: 1,
                length: 1,
            },
        },
        floors: [
            {
                domainId: '1',
                floorNumber: 34,
                building: {
                    domainId: '1',
                    buildingName: 'buildingName 1',
                    buildingCode: 'buildingCode 1',
                    buildingDimensions: {
                        width: 1,
                        length: 1,
                    },
                },
            },
            {
                domainId: '2',
                floorNumber: 35,
                building: {
                    domainId: '2',
                    buildingName: 'buildingName 2',
                    buildingCode: 'buildingCode 2',
                    buildingDimensions: {
                        width: 2,
                        length: 2,
                    },
                },
            },
        ],
    },
    {
        domainId: '2',
        uniqueNumber: 2,
        brand: 'brand 2',
        model: 'model 2',
        serialNumber: 'serialNumber 2',
        description: 'description 2',
        elevatorPosition: {
            xposition: 14,
            yposition: 15,
        },
        orientation: 'orientation 2',
        building: {
            domainId: '2',
            buildingName: 'buildingName 2',
            buildingCode: 'buildingCode 2',
            buildingDimensions: {
                width: 2,
                length: 2,
            },
        },
        floors: [
            {
                domainId: '3',
                floorNumber: 3,
                building: {
                    domainId: '3',
                    buildingName: 'buildingName 3',
                    buildingCode: 'buildingCode 3',
                    buildingDimensions: {
                        width: 3,
                        length: 3,
                    },
                },
            },
            {
                domainId: '4',
                floorNumber: 4,
                building: {
                    domainId: '4',
                    buildingName: 'buildingName 4',
                    buildingCode: 'buildingCode 4',
                    buildingDimensions: {
                        width: 4,
                        length: 4,
                    },
                },
            },
        ],
    },
];

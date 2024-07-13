import { render, fireEvent } from '@testing-library/react';
import ElevatorsTable from "./ElevatorsTable";
import ElevatorInDto from "../../../../../dtos/in/ElevatorInDto";
import {Building} from "../../../../../interfaces/building";
import Floor from "../../../../../interfaces/floor";

/*
export default interface ElevatorInDto {
    domainId: string;
    uniqueNumber: number;
    brand?: string;
    model?: string;
    serialNumber?: string;
    description?: string;
    elevatorPosition: ElevatorPositionDTO;
    orientation: string;
    building: Building;
    floors: Floor[];
}
*/

const elevators: ElevatorInDto[] = [
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


describe('ElevatorsTable', () => {
    it('should render the ElevatorsTable component', () => {
        const {getByText} = render(<ElevatorsTable elevators={elevators}  isFilterOn={0} setIsFilterOn={() => {}}
                                                   error={null} loading={false}
                                                   refreshData={() => {
                                                   }}/>);
        expect(getByText('Building')).toBeInTheDocument();
        expect(getByText('Number')).toBeInTheDocument();
        expect(getByText('Served Floors')).toBeInTheDocument();
        expect(getByText('Brand')).toBeInTheDocument();
        expect(getByText('Model')).toBeInTheDocument();
        expect(getByText('Serial Number')).toBeInTheDocument();
        expect(getByText('X Position')).toBeInTheDocument();
        expect(getByText('Y Position')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Orientation')).toBeInTheDocument();
    });

    it('renders elevator data when elevators array is not empty', () => {
        const { getByText } = render(<ElevatorsTable elevators={elevators}  isFilterOn={0} setIsFilterOn={() => {}}
                                                     error={null} loading={false} refreshData={() => {}} />);
        expect(getByText('buildingCode 1')).toBeInTheDocument();
        expect(getByText('buildingCode 2')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('brand 1')).toBeInTheDocument();
        expect(getByText('brand 2')).toBeInTheDocument();
        expect(getByText('model 1')).toBeInTheDocument();
        expect(getByText('model 2')).toBeInTheDocument();
        expect(getByText('serialNumber 1')).toBeInTheDocument();
        expect(getByText('serialNumber 2')).toBeInTheDocument();
    });

    it('renders refresh button', () => {
        const {getByText} = render(<ElevatorsTable elevators={elevators} error={null} loading={false} isFilterOn={-1} setIsFilterOn={() => {}}
                                                   refreshData={() => {
                                                   }}/>);
        expect(getByText('Refresh')).toBeInTheDocument();
    });

    it('refresh button', () => {
        const refreshData = jest.fn();
        const {getByText} = render(<ElevatorsTable elevators={elevators} error={null} loading={false}
                                                   refreshData={refreshData} isFilterOn={-1} setIsFilterOn={() => {}}/>);
        fireEvent.click(getByText('Refresh'));
        expect(refreshData).toHaveBeenCalledTimes(2);
    });

    it('previous and next buttons', () => {
        const { getByTitle } = render(<ElevatorsTable elevators={elevators} isFilterOn={0} setIsFilterOn={() => {}}
                                                      error={null} loading={false} refreshData={() => {}} />);
        expect(getByTitle('Previous Page')).toBeInTheDocument();
        expect(getByTitle('Next Page')).toBeInTheDocument();
    });


});


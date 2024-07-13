import {fireEvent, render} from "@testing-library/react";
import React from "react";
import RequestTaskTable from "./RequestTaskTable";
import TaskInDto from "../../../../../dtos/in/TaskInDto";

const tasks: TaskInDto[] = [
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

describe('RequestTaskTable', () => {
    test('renders request task table', () => {
        const {getByText} = render(<RequestTaskTable tasks={tasks} error={null} loading={false} isFilterOn={0} refreshData={() => {
        }}/>);

        expect(getByText('Task Code')).toBeInTheDocument();
        expect(getByText('Task Type')).toBeInTheDocument();
        expect(getByText('Robisep Type')).toBeInTheDocument();
        expect(getByText('State')).toBeInTheDocument();
        expect(getByText('Goal')).toBeInTheDocument();
    });

    test('data is placed in the table', () => {
        const { getByText } = render(<RequestTaskTable tasks={tasks} error={null} loading={false} isFilterOn={0}  refreshData={()=>{}}/>);

        expect(getByText('123')).toBeInTheDocument();
        expect(getByText('SURVEILLANCE')).toBeInTheDocument();
        expect(getByText('SurveillanceRobisep')).toBeInTheDocument();
        expect(getByText('REQUESTED')).toBeInTheDocument();
        expect(getByText('Start: StartingPointToWatch1 - End: EndingPointToWatch2')).toBeInTheDocument();
    });

    test('renders refresh button', () => {
        const { getByText } = render(<RequestTaskTable tasks={tasks} error={null} loading={false} isFilterOn={-1}  refreshData={()=>{}}/>);

        expect(getByText('Refresh')).toBeInTheDocument();
    });

    test('refresh button works', () => {
        const refreshData = jest.fn();
        const { getByText } = render(<RequestTaskTable tasks={tasks} error={null} loading={false} isFilterOn={-1}  refreshData={refreshData}/>);

        fireEvent.click(getByText('Refresh'));
        expect(refreshData).toHaveBeenCalledTimes(1);
    });

    test('previous and next buttons', () => {
        const { getByTitle } = render(<RequestTaskTable tasks={tasks} error={null} loading={false} isFilterOn={0}  refreshData={()=>{}}/>);

        expect(getByTitle('Previous Page')).toBeInTheDocument();
        expect(getByTitle('Next Page')).toBeInTheDocument();
    });
});
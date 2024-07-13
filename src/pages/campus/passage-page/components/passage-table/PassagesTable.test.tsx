import {PassageInDto} from "../../../../../dtos/in/PassageInDto";
import {fireEvent, render} from "@testing-library/react";
import React from "react";
import PassagesTable from "./PassagesTable";

const passages: PassageInDto[] = [
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
];

describe('PassagesTable', () => {

    // Basic page rendering
    test('renders passages table', () => {
        const {getByText} = render(
            <PassagesTable passages={passages} isFilterOn={0} setIsFilterOn={()=>{}}
                           error={null} loading={false} refreshData={()=>{}}/>
        );


        // Check if all columns are rendered
        expect(getByText('StartPointBuilding')).toBeInTheDocument();
        expect(getByText('StartPointFloor')).toBeInTheDocument();
        expect(getByText('EndPointBuilding')).toBeInTheDocument();
        expect(getByText('EndPointFloor')).toBeInTheDocument();
        expect(getByText('Action')).toBeInTheDocument();
    });

    // Check if the data is placed in the table
    test('data is placed in the table', () => {
        const { getByText, getAllByText } = render(<PassagesTable passages={passages} isFilterOn={0} setIsFilterOn={()=>{}}
                                                                  error={null} loading={false} refreshData={()=>{}}/>);

        expect(getByText('BuildingCode 1')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('BuildingCode 2')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('BuildingCode 3')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
        expect(getByText('BuildingCode 4')).toBeInTheDocument();
        expect(getByText('4')).toBeInTheDocument();
    });

    // Check if the page has a refresh button
    test('renders refresh button', () => {
        const { getByText } = render(<PassagesTable passages={passages} isFilterOn={-1} setIsFilterOn={()=>{}}
                                                    error={null} loading={false} refreshData={()=>{}}/>);

        expect(getByText('Refresh')).toBeInTheDocument();
    });

    // Check if the refresh button is working
    test('refresh button', () => {
        const refreshData = jest.fn();
        const { getByText } = render(<PassagesTable passages={passages}  isFilterOn={-1} setIsFilterOn={()=>{}}
                                                    error={null} loading={false} refreshData={refreshData}/>);

        expect(getByText('Refresh')).toBeInTheDocument();
        fireEvent.click(getByText('Refresh'));
        expect(refreshData).toHaveBeenCalledTimes(2);
    });

    // Check if the page has a previous and next button
    test('previous and next buttons', () => {
        const { getByTitle } = render(<PassagesTable passages={passages} isFilterOn={0} setIsFilterOn={()=>{}}
                                                     error={null} loading={false} refreshData={()=>{}}/>);

        expect(getByTitle('Previous Page')).toBeInTheDocument();
        expect(getByTitle('Next Page')).toBeInTheDocument();
    });
});
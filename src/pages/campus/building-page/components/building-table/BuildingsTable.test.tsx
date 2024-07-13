import {fireEvent, render} from "@testing-library/react";
import React from "react";
import BuildingsTable from "./BuildingsTable";
import {Building} from "../../../../../interfaces/building";

const buildings: Building[] = [
    {
        domainId: '1',
        buildingName: 'First Building',
        buildingCode: 'FB',
        buildingDimensions: {
            width: 0,
            length: 1,
        }
    },
    {
        domainId: '2',
        buildingName: 'Second Building',
        buildingCode: 'SB',
        buildingDimensions: {
            width: 2,
            length: 3,
        },
    }
];

describe('BuildingsTable', () => {
    test('renders buildings table', () => {
        const { getByText, getAllByText } = render(
            <BuildingsTable buildings={buildings} error={null} loading={false} isFilterOn={0} setIsFilterOn={() => {}}  refreshData={()=>{}}/>
        );

        expect(getAllByText('Code')).toHaveLength(1);
        expect(getAllByText('Name')).toHaveLength(3);
        expect(getAllByText('Width')).toHaveLength(1);
        expect(getAllByText('Length')).toHaveLength(1);
        expect(getByText('Action')).toBeInTheDocument();
    });

    // Check if the data is placed in the table
    test('data is placed in the table', () => {
        const { getByText, getAllByText } = render(<BuildingsTable buildings={buildings} error={null} loading={false} isFilterOn={0} setIsFilterOn={() => {}}  refreshData={()=>{}}/>);

        expect(getByText('FB')).toBeInTheDocument();
        expect(getByText('First Building')).toBeInTheDocument();
        expect(getByText('0')).toBeInTheDocument();
        expect(getByText('1')).toBeInTheDocument();

        expect(getByText('SB')).toBeInTheDocument();
        expect(getByText('Second Building')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
    });

    // Check if the page has a refresh button
    test('renders refresh button', () => {
        const { getByText } = render(<BuildingsTable buildings={buildings} error={null} loading={false} isFilterOn={-1} setIsFilterOn={() => {}}  refreshData={()=>{}}/>);

        expect(getByText('Refresh')).toBeInTheDocument();
    });

    // Check if refresh button is working
    test('refresh button', () => {
        const refreshData = jest.fn();
        const { getByText } = render(<BuildingsTable buildings={buildings} error={null} loading={false} isFilterOn={-1}
                                                     setIsFilterOn={() => {}}  refreshData={refreshData}/>);

        const refreshButton = getByText('Refresh');
        fireEvent.click(refreshButton);
        expect(refreshData).toHaveBeenCalledTimes(2);
    });

    // Check if the page has a Previous Page and Next Page button
    test('previous and next buttons', () => {
        const { getByTitle } = render(<BuildingsTable buildings={buildings} error={null} loading={false} isFilterOn={0} setIsFilterOn={() => {}} refreshData={()=>{}}/>);

        expect(getByTitle('Previous Page')).toBeInTheDocument();
        expect(getByTitle('Next Page')).toBeInTheDocument();
    });
});
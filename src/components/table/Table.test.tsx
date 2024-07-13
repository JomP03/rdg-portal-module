import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';


const mockColumns = [
    { Header: 'Column1', accessor: 'column1' },
    { Header: 'Column2', accessor: 'column2' },
];

const mockData = [
    { column1: 'Test content 1', column2: 'Test content 2' },
];

const mockEntityFilters = <div>Entity Filters</div>;
const mockTableEntity = 'Test Entity';

describe('Table', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <Table
                columns={mockColumns}
                data={mockData}
                isFilterable={true}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                refreshData={() => {}}
            />
        );

        // Check if row content is rendered
        mockData.forEach((row) => {
            Object.values(row).forEach((content) => {
                expect(getByText(content)).toBeInTheDocument();
            });
        });
    });

    /*it('calls handleEdit when edit button is clicked', () => {
        const handleEdit = jest.fn();
        const { getByAltText } = render(
            <Table
                columns={mockColumns}
                data={mockData}
                isEditable={true}
                isFilterable={true}
                handleEdit={handleEdit}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                refreshData={() => {}}
            />
        );

        // Simulate a click on the edit button
        fireEvent.click(getByAltText('Image Not Found'));

        // Check if handleEdit was called
        expect(handleEdit).toHaveBeenCalledWith(mockData[0]);
    });*/
});

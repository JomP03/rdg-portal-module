import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableHeader from './TableHeader'; // adjust this import to your file structure

// Mock data for the test
const mockColumns = [
    { Header: 'Column 1', accessor: 'column1' },
    { Header: 'Column 2', accessor: 'column2' },
    // add more columns as needed
];

const mockEntityFilters = <div>Entity Filters</div>; // replace with your actual filters
const mockTableEntity = 'Test Entity'; // replace with your actual entity

describe('TableHeader', () => {
    it('renders without crashing', () => {
        const { getByText, getByTitle } = render(
            <TableHeader
                columns={mockColumns}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                isEditable={true}
                isFilterable={true}
            />
        );

        // Check if column headers are rendered
        mockColumns.forEach((column) => {
            expect(getByText(column.Header)).toBeInTheDocument();
        });

        // Check if 'Action' is rendered when isEditable is true
        expect(getByText('Action')).toBeInTheDocument();

        // Check if filter button is rendered when isFilterable is true
        const filterButton = getByTitle('Filter Menu');
        expect(filterButton).toBeInTheDocument();

        // Simulate a click on the filter button
        fireEvent.click(filterButton);

        // Check if filter box is displayed after clicking the filter button
        expect(getByText('Entity Filters')).toBeInTheDocument();
    });

    it('renders without edit action', () => {
        const { queryByText, getByText, getByTitle } = render(
            <TableHeader
                columns={mockColumns}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                isEditable={false}
                isFilterable={true}
            />
        );

        // Check if column headers are rendered
        mockColumns.forEach((column) => {
            expect(getByText(column.Header)).toBeInTheDocument();
        });

        // Check if 'Action' is rendered when isEditable is true
        expect(queryByText('Action')).toBeNull();

        // Check if filter button is rendered when isFilterable is true
        const filterButton = getByTitle('Filter Menu');
        expect(filterButton).toBeInTheDocument();

        // Simulate a click on the filter button
        fireEvent.click(filterButton);

        // Check if filter box is displayed after clicking the filter button
        expect(getByText('Entity Filters')).toBeInTheDocument();
    });


    it('renders without filter', () => {
        const { getByText, queryByTitle } = render(
            <TableHeader
                columns={mockColumns}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                isEditable={true}
                isFilterable={false}
            />
        );

        // Check if column headers are rendered
        mockColumns.forEach((column) => {
            expect(getByText(column.Header)).toBeInTheDocument();
        });

        // Check if 'Action' is rendered when isEditable is true
        expect(getByText('Action')).toBeInTheDocument();

        // Check if filter button is rendered when isFilterable is true
        const filterButton = queryByTitle('Filter Menu');
        expect(filterButton).toBeNull();
    });


    it('renders without filter and edit action', () => {
        const { queryByText, getByText, queryByTitle } = render(
            <TableHeader
                columns={mockColumns}
                entityFilters={mockEntityFilters}
                tableEntity={mockTableEntity}
                isEditable={false}
                isFilterable={false}
            />
        );

        // Check if column headers are rendered
        mockColumns.forEach((column) => {
            expect(getByText(column.Header)).toBeInTheDocument();
        });

        // Check if 'Action' is rendered when isEditable is true
        expect(queryByText('Action')).toBeNull();

        // Check if filter button is rendered when isFilterable is true
        const filterButton = queryByTitle('Filter Menu');
        expect(filterButton).toBeNull();
    });
});

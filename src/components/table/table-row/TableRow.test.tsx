import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableRow from './TableRow'; // adjust this import to your file structure

// Mock data for the test
const mockRowContent = {
    column1: 'Test content 1',
    column2: 'Test content 2',
    // add more content as needed
};

const mockColumns = [
    { Header: 'Column1', accessor: 'column1' },
    { Header: 'Column2', accessor: 'column2' },
    // add more columns as needed
];

describe('TableRow', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <TableRow
                rowContent={mockRowContent}
                columns={mockColumns}
                isEditable={false}
            />
        );

        // Check if row content is rendered
        Object.values(mockRowContent).forEach((content) => {
            expect(getByText(content)).toBeInTheDocument();
        });
    });

    it('calls handleEdit when edit button is clicked', () => {
        const handleEdit = jest.fn();
        const { getByAltText } = render(
            <TableRow
                rowContent={mockRowContent}
                columns={mockColumns}
                isEditable={true}
                handleEdit={handleEdit}
            />
        );

        // Simulate a click on the edit button
        fireEvent.click(getByAltText('Image Not Found'));

        // Check if handleEdit was called
        expect(handleEdit).toHaveBeenCalledWith(mockRowContent);
    });
});

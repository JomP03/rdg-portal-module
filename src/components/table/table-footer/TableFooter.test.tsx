import { render, fireEvent } from '@testing-library/react';
import TableFooter from './TableFooter';

test('renders table footer and handles page navigation', () => {
    const onPreviousPageMock = jest.fn();
    const onNextPageMock = jest.fn();
    const refreshDataMock = jest.fn();
    const props = {
        currentPage: 1,
        totalPages: 5,
        onPreviousPage: onPreviousPageMock,
        onNextPage: onNextPageMock,
        refreshData: refreshDataMock,
        isFilterOn: -1,
    };
    const { getByTitle, getByText } = render(<TableFooter {...props} />);

    // Check if the current page and total pages are rendered
    expect(getByText('Page 1 of 5')).toBeInTheDocument();

    // Simulate a click on the "Next Page" button
    const nextButton = getByTitle('Next Page');
    fireEvent.click(nextButton);
    // Check if the onNextPage function has been called
    expect(onNextPageMock).toHaveBeenCalled();

    // Simulate a click on the "Previous Page" button
    const prevButton = getByTitle('Previous Page');
    fireEvent.click(prevButton);
    // Check if the onPreviousPage function has been called
    expect(onPreviousPageMock)
});

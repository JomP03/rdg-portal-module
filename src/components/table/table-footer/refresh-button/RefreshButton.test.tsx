import { render, fireEvent } from '@testing-library/react';
import RefreshButton from './RefreshButton';

test('renders refresh button and handles click', () => {
    const refreshDataMock = jest.fn();
    const props = {
        refreshData: refreshDataMock,
        isFilterOn: -1
    };
    const { getByText } = render(<RefreshButton {...props} />);

    // Check if the button is rendered
    expect(getByText('Refresh')).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(getByText('Refresh'));

    // Check if the refreshData function has been called
    expect(refreshDataMock).toHaveBeenCalled();
});

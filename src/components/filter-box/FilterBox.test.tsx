import { render, fireEvent } from '@testing-library/react';
import FilterBox from './FilterBox';

test('renders filter box and handles close request', () => {
    const onCloseMock = jest.fn();
    const props = {
        isOpen: true,
        onClose: onCloseMock,
        anchorElement: document.createElement('div'),
        filters: <div>Test Filters</div>,
        filterEntity: 'Test Entity'
    };
    const { getByText, getByTestId } = render(<FilterBox {...props} />);

    // Check if the filter box is rendered
    expect(getByText('Filter Test Entitys')).toBeInTheDocument();
    expect(getByText('Test Filters')).toBeInTheDocument();

});

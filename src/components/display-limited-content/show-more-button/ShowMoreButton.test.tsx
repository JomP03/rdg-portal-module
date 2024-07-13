import { render, fireEvent } from '@testing-library/react';
import ShowMoreButton from './ShowMoreButton';

test('renders button and handles click', () => {
    const onClickMock = jest.fn();
    const props = {
        onClick: onClickMock,
        showMore: false,
        color: 'blue'
    };
    const { getByText } = render(<ShowMoreButton {...props} />);

    // Check if the button is rendered
    expect(getByText('Show More')).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(getByText('Show More'));

    // Check if the onClick function has been called
    expect(onClickMock).toHaveBeenCalled();
});

import { render, fireEvent } from '@testing-library/react';
import FormButton from './FormButton';

test('renders button and handles click', () => {
    const onClickMock = jest.fn();
    const props = {
        label: 'Test Checkbox',
        onClick: onClickMock,
        isDisabled: false
    };
    const { getByText } = render(<FormButton {...props} />);

    // Check if the button is rendered
    expect(getByText('Test Checkbox')).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(getByText('Test Checkbox'));

    // Check if the onClick function has been called
    expect(onClickMock).toHaveBeenCalled();
});

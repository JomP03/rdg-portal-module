import { render, fireEvent } from '@testing-library/react';
import LogoutButton from './LogoutButton';

test('renders logout button and handles click', () => {
    const onClickMock = jest.fn();
    const props = {
        label: 'Logout',
        onClick: onClickMock
    };
    const { getByText } = render(<LogoutButton {...props} />);

    // Check if the button is rendered
    expect(getByText('Logout')).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(getByText('Logout'));

    // Check if the onClick function has been called
    expect(onClickMock).toHaveBeenCalled();
});

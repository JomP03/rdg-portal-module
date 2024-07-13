import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserMenuBox from './UserMenuBox'; // adjust this import to your file structure

describe('UserMenuBox', () => {
    it('renders without crashing', () => {
        const { getByText } = render(
            <UserMenuBox
                isOpen={true}
                onClose={() => {}}
                anchorElement={null}
                logoutAction={() => {}}
            />
        );

        // Check if the title is rendered
        expect(getByText('User Menu')).toBeInTheDocument();
    });

    it('calls logoutAction when the logout button is clicked', () => {
        const logoutAction = jest.fn();
        const { getByText } = render(
            <UserMenuBox
                isOpen={true}
                onClose={() => {}}
                anchorElement={null}
                logoutAction={logoutAction}
            />
        );

        // Simulate a click on the logout button
        fireEvent.click(getByText('Logout'));

        // Check if logoutAction was called
        expect(logoutAction).toHaveBeenCalled();
    });
});

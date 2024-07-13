import {render} from "@testing-library/react";
import ProfilePage from "./ProfilePage";


describe('ProfilePage', () => {
    const jwtDecode = require('jwt-decode');
    const useApiRequest = require('../../../hooks/useApiRequest');

    beforeEach(() => {

        const useUserGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');

        useUserGetSpy.mockReturnValue({
            data: undefined,
            loading: false,
            sendData: jest.fn(),
            refreshData: jest.fn(),
        });

        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: jest.fn(),
        });
        // Create a spy for the jwtDecode hook
        const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');
        // Simulate the jwtDecode hook
        jwtDecodeSpy.mockReturnValue({
            sub: '1',
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    test('renders profile page', () => {
        const { getByText} = render(<ProfilePage/>);

        // Check if the page panel is rendered
        expect(getByText('My Profile')).toBeInTheDocument();

        // Check if the Name, Email, Nif and Phone Number labels are rendered
        expect(getByText('Name:')).toBeInTheDocument();
        expect(getByText('Email:')).toBeInTheDocument();
        expect(getByText('Phone Number:')).toBeInTheDocument();
        expect(getByText('Nif:')).toBeInTheDocument();

    });
    
});


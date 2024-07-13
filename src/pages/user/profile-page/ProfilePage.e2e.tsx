import ProfilePage from "./ProfilePage";
import { fireEvent, queryByAltText, render, waitFor } from "@testing-library/react";
import { requestsMock } from "../../../mocks/signUpRequestsMock";


describe('SignUpPage', () => {

    describe('Sucessful', () => {

        const refreshData = jest.fn();
        const sendData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');
        const jwtDecode = require('jwt-decode');
        const navigate = require('react-router');
        const logout = require('../../../hooks/useLogout');


        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
            const useUserGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
            const useLogoutSpy = jest.spyOn(logout, 'useLogout');
            const navigateSpy = jest.spyOn(navigate, 'useNavigate');


            // Create a spy for the jwtDecode hook
            const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');

            // Simulate the usePost hook
            usePatchSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });

            // Simulate the useGet hook
            useUserGetSpy.mockReturnValue({
                data:
                {
                    id: '123456789',
                    name: 'joao',
                    email: 'joao@isep.ipp.pt',
                    nif: '204883300',
                    roleName: 'ENDUSER',
                    phoneNumber: '912345678',
                    iamId: '123456789',
                },
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the useGet hook
            useGetSpy.mockReturnValue({
                data: requestsMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the jwtDecode hook
            jwtDecodeSpy.mockReturnValue({
                sub: '1',
            });

            useLogoutSpy.mockReturnValue({
                logoutAction: jest.fn(),
            });

            navigateSpy.mockReturnValue({
                navigate: jest.fn(),
            });




        });

        it('Render with correct info', async () => {

            const { getByText, getAllByAltText, queryByText } = render(<ProfilePage />);

            // Check if the page panel is rendered
            expect(getByText('My Profile')).toBeInTheDocument();

            // Check if the Name, Email, Nif and Phone Number labels are rendered
            expect(getByText('Name:')).toBeInTheDocument();
            expect(getByText('Email:')).toBeInTheDocument();
            expect(getByText('Phone Number:')).toBeInTheDocument();
            expect(getByText('Nif:')).toBeInTheDocument();

            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();

            expect(queryByText('joao')).toBeInTheDocument();
            expect(queryByText('joao@isep.ipp.pt')).toBeInTheDocument();
            expect(queryByText('204883300')).toBeInTheDocument();
            expect(queryByText('912345678')).toBeInTheDocument();

        });

        it('Edit user data', async () => {

            const { getAllByAltText, getAllByText, getByText, getByLabelText } = render(<ProfilePage />);

            // Wait for the table to build the header
            expect(getAllByText('Name:')[0]).toBeInTheDocument();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);


            // Wait for the modal to open
            const editButton = getByText('Edit Profile');
            expect(editButton).toBeInTheDocument();


            const name = getByLabelText('Name*');
            const nif = getByLabelText('Nif*');
            const phoneNumber = getByLabelText('Phone Number*');

            // Simulate the user typing in the fields
            fireEvent.input(name, { target: { value: 'This is a test name' } });
            expect(name).toHaveValue('This is a test name');

            fireEvent.input(nif, { target: { value: 'This is a test nif' } });
            expect(nif).toHaveValue('This is a test nif');

            fireEvent.input(phoneNumber, { target: { value: 'This is a test phone number' } });
            expect(phoneNumber).toHaveValue('This is a test phone number');


            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
            });

        });

    });

    describe('Failure', () => {
        let error = {};

        const refreshData = jest.fn();
        const sendData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');
        const jwtDecode = require('jwt-decode');
        const navigate = require('react-router');
        const logout = require('../../../hooks/useLogout');


        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
            const useUserGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
            const useLogoutSpy = jest.spyOn(logout, 'useLogout');
            const navigateSpy = jest.spyOn(navigate, 'useNavigate');


            // Create a spy for the jwtDecode hook
            const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');

            // Simulate the usePost hook
            usePatchSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });

            // Simulate the useGet hook
            useUserGetSpy.mockReturnValue({
                data: undefined,
                error: error,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the useGet hook
            useGetSpy.mockReturnValue({
                data: requestsMock,
                error: error,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the jwtDecode hook
            jwtDecodeSpy.mockReturnValue({
                sub: '1',
            });

            useLogoutSpy.mockReturnValue({
                logoutAction: jest.fn(),
            });

            navigateSpy.mockReturnValue({
                navigate: jest.fn(),
            });




        });

        it('Render page with no data', async () => {

            const { queryByText, queryByAltText } = render(<ProfilePage />);


            const button = queryByAltText('Image Not Found');
            expect(button).not.toBeInTheDocument();

            expect(queryByText('joao')).not.toBeInTheDocument();
            expect(queryByText('joao@isep.ipp.pt')).not.toBeInTheDocument();
            expect(queryByText('204883300')).not.toBeInTheDocument();
            expect(queryByText('912345678')).not.toBeInTheDocument();

        });

        it('Edit Profile', async () => {

            const { queryByAltText } = render(<ProfilePage />);


            // Cant edit profile since the button wont appear, because it only appears when user is a ENDUSER
            // and since there is no data, the user is not a ENDUSER

            // Expect button to not be in the document
            const button = queryByAltText('Image Not Found');
            expect(button).not.toBeInTheDocument();

        });

    });


});
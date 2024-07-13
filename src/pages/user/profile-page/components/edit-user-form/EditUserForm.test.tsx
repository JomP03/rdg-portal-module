import EditUserForm from "./EditUserForm";
import {fireEvent, render} from "@testing-library/react";

describe('ManageSignUpRequestForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');
    const jwtDecode = require('jwt-decode');

    beforeEach(() => {
        // Create a spy for the usePost hook
        const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
        const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');
        // Simulate the usePost hook
        usePatchSpy.mockReturnValue({
            data: undefined,
            loading: false,
            sendData: sendData,  // Simulate sendData()
        });
        // Simulate the useGet hook
        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: refreshData,
        });
        // Simulate the jwtDecode hook
        jwtDecodeSpy.mockReturnValue({
            sub: '1',
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    it('should render all the fields correctly', () => {
        const {getAllByText, getAllByRole} = render(
            <EditUserForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={{
                    id: "1",
                    name: "1",
                    nif: "1",
                    phoneNumber: "1",
                    email: "1",
                    iamId: "1",
                }}
                role={'ENDUSER'}
            />
        );


        // Test if the fields are being rendered correctly
        expect(getAllByText('Name*')[0]).toBeInTheDocument();
        expect(getAllByText('Nif*')[0]).toBeInTheDocument();
        expect(getAllByText('Phone Number*')[0]).toBeInTheDocument();


        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(3);
        const button = getAllByRole('button');
        expect(button.length).toBe(1);
        
    });

    it('edit button should work correctly', () => {
        const {getAllByText, getByLabelText, getByText} = render(
            <EditUserForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={{
                    id: "1",
                    name: "1",
                    nif: "1",
                    phoneNumber: "1",
                    email: "1",
                    iamId: "1",
                }}
                role={'ENDUSER'}
            />
        );

        
        const name = getByLabelText('Name*');
        const nif = getByLabelText('Nif*');
        const phoneNumber = getByLabelText('Phone Number*');

        // Simulate the user typing in the fields
        fireEvent.input(name, {target: {value: 'This is a test name'}});
        expect(name).toHaveValue('This is a test name');

        fireEvent.input(nif, {target: {value: 'This is a test nif'}});
        expect(nif).toHaveValue('This is a test nif');

        fireEvent.input(phoneNumber, {target: {value: 'This is a test phone number'}});
        expect(phoneNumber).toHaveValue('This is a test phone number');


        const editButton = getByText('Edit Profile');
        expect(editButton).toBeInTheDocument();

        
        // Simulate the user clicking in the accept button
        fireEvent.click(editButton);
       

    });


});
import ManageSignUpRequestForm from "./ManageSignUpRequestForm";
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
        const {getByText, getAllByRole, getByLabelText} = render(
            <ManageSignUpRequestForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={{
                    name: "1",
                    email: "1",
                }}
            />
        );


        // Test if the fields are being rendered correctly
        expect(getByText('User:')).toBeInTheDocument();
        expect(getByText('User Email:')).toBeInTheDocument();

        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(1);
        const button = getAllByRole('button');
        expect(button.length).toBe(2);
        expect(getByLabelText('Comment*')).toBeInTheDocument();
        
    });

    it('accept button should work correctly', () => {
        const {getByText, getByLabelText} = render(
            <ManageSignUpRequestForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={{
                    name: "1",
                    email: "1",
                    nif: "1",
                    phoneNumber: "1",
                    id: "1",
                    iamId: "1",
                }}
            />
        );

        
        const comment = getByLabelText('Comment*');

        // Simulate the user typing in the fields
        fireEvent.input(comment, {target: {value: 'This is a test comment'}});
        expect(comment).toHaveValue('This is a test comment');


        const acceptButton = getByText('Accept');
        expect(acceptButton).toBeInTheDocument();

        
        // Simulate the user clicking in the accept button
        fireEvent.click(acceptButton);
       

    });


});
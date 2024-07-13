import CreateBuildingForm from "./CreateBuildingForm";
import {fireEvent, render} from "@testing-library/react";

describe('CreateBuildingForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {
        // Create a spy for the usePost hook
        const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
        // Simulate the usePost hook
        usePostSpy.mockReturnValue({
            sendData: sendData,  // Simulate sendData()
            loading: false,
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    test('Check that the fields are being rendered correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <CreateBuildingForm
                refreshData={refreshData}
            />
        );

        // Test if the fields are being rendered correctly
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(5);
        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Code*')).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByLabelText('Width*')).toBeInTheDocument();
        expect(getByLabelText('Length*')).toBeInTheDocument();
        expect(getByText('Create Building')).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, getByLabelText} = render(
            <CreateBuildingForm
                refreshData={refreshData}
            />
        );

        const name = getByLabelText('Name');
        const code = getByLabelText('Code*');
        const description = getByLabelText('Description');
        const width = getByLabelText('Width*');
        const length = getByLabelText('Length*');


        // Simulate user input
        fireEvent.change(name, {target: {value: 'testName'}});
        fireEvent.change(code, {target: {value: 'testCode'}});
        fireEvent.change(description, {target: {value: 'testDescription'}});
        fireEvent.change(width, {target: {value: 20}});
        fireEvent.change(length, {target: {value: 23}});



        // Test if the formButton works
        const formButton = getByText('Create Building');
        fireEvent.click(formButton);
    });
});
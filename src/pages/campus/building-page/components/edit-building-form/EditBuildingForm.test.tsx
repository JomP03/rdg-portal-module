import React from "react";
import EditBuildingForm from "./EditBuildingForm";
import {fireEvent, render} from "@testing-library/react";

describe('EditBuildingForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {
        // Create a spy for the usePost hook
        const usePatchSpy = jest.spyOn(useApiRequest, 'useDataPatch');
        // Simulate the usePost hook
        usePatchSpy.mockReturnValue({
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
            <EditBuildingForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={ {
                    buildingCode: "",
                    buildingName: "test",
                    buildingDescription: "test",
                    width: "1",
                    length: "1",
                }}
            />
        );
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(5);
        expect(getByLabelText('Code*')).toBeInTheDocument();
        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByLabelText('Width*')).toBeInTheDocument();
        expect(getByLabelText('Length*')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, getByLabelText} = render(
            <EditBuildingForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={ {
                    buildingCode: "",
                    buildingName: "test",
                    buildingDescription: "test",
                    width: "1",
                    length: "1",
                }}
            />
        );

        const name = getByLabelText('Name');
        const description = getByLabelText('Description');
        const width = getByLabelText('Width*');
        const length = getByLabelText('Length*');
        fireEvent.input(name, {target: {value: 'test'}});
        expect(name).toHaveValue('test');
        fireEvent.input(description, {target: {value: 'test'}});
        expect(description).toHaveValue('test');
        fireEvent.input(width, {target: {value: '1'}});
        expect(width).toHaveValue('1');
        fireEvent.input(length, {target: {value: '1'}});
        expect(length).toHaveValue('1');

        const submitButton = getByText('Submit');
        fireEvent.click(submitButton);
    });
});
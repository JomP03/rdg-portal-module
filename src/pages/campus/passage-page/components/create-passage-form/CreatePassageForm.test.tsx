import CreatePassageForm from "./CreatePassageForm";
import React from "react";
import {fireEvent, render} from "@testing-library/react";


describe('CreatePassageForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {
        // Create a spy for the usePost hook
        const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
        // Simulate the usePost hook
        usePostSpy.mockReturnValue({
            sendData: sendData,  // Simulate sendData()
            loading: false,
        });
        // Simulate the useGet hook
        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: refreshData,
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    test('Check that the fields are being rendered correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <CreatePassageForm
                refreshData={refreshData}
            />
        );
        const startPointBuildingComboBox = container.querySelector('#mui-component-select-startPointBuilding');
        const startPointfloorComboBox = container.querySelector('#mui-component-select-startPointFloor');
        const endPointBuildingComboBox = container.querySelector('#mui-component-select-endPointBuilding');
        const endPointfloorComboBox = container.querySelector('#mui-component-select-endPointFloor');

        // Test if the fields are being rendered correctly
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(8);
        const comboBox = getAllByRole('combobox');
        expect(comboBox.length).toBe(4);
        expect(comboBox[0]).toBe(startPointBuildingComboBox);
        expect(comboBox[1]).toBe(startPointfloorComboBox);
        expect(comboBox[2]).toBe(endPointBuildingComboBox);
        expect(comboBox[3]).toBe(endPointfloorComboBox);
        expect(startPointBuildingComboBox).toBeInTheDocument();
        expect(startPointfloorComboBox).toBeInTheDocument();
        expect(getByLabelText('Coordinate X*')).toBeInTheDocument();
        expect(getByLabelText('Coordinate Y*')).toBeInTheDocument();
        expect(endPointBuildingComboBox).toBeInTheDocument();
        expect(endPointfloorComboBox).toBeInTheDocument();
        expect(getByText('Create Passage')).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, getByLabelText, container} = render(
            <CreatePassageForm
                refreshData={refreshData}
            />
        );

        const startPointBuildingComboBox = container.querySelector('#mui-component-select-startPointBuilding');
        const startPointfloorComboBox = container.querySelector('#mui-component-select-startPointFloor');
        const endPointBuildingComboBox = container.querySelector('#mui-component-select-endPointBuilding');
        const endPointfloorComboBox = container.querySelector('#mui-component-select-endPointFloor');

        const coordinateX = getByLabelText('Coordinate X*');
        const coordinateY = getByLabelText('Coordinate Y*');
        const createPassageButton = getByText('Create Passage');

        // Simulate the user typing in the fields
        fireEvent.input(coordinateX, {target: {value: '0'}});
        expect(coordinateX).toHaveValue('0');
        fireEvent.input(coordinateY, {target: {value: '1'}});
        expect(coordinateY).toHaveValue('1');

        startPointBuildingComboBox!.textContent = 'Building 1';
        startPointfloorComboBox!.textContent = 'Floor 1';
        endPointBuildingComboBox!.textContent = 'Building 2';
        endPointfloorComboBox!.textContent = 'Floor 2';

        // Check if the fields have been entered correctly
        expect(startPointBuildingComboBox!.textContent).toBe('Building 1');
        expect(startPointfloorComboBox!.textContent).toBe('Floor 1');
        expect(endPointBuildingComboBox!.textContent).toBe('Building 2');
        expect(endPointfloorComboBox!.textContent).toBe('Floor 2');

        // Simulate the user clicking the create passage button
        fireEvent.click(createPassageButton);
    });
});
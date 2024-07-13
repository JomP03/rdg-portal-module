import CreateElevatorForm from "./CreateElevatorForm";
import React from "react";
import {fireEvent, render} from "@testing-library/react";


describe('CreateElevatorForm', () => {
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

    it('Check that the fields are being rendered correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <CreateElevatorForm
                refreshData={refreshData}
            />
        );

        // Test if the fields are being rendered correctly
        const buildingComboBox = container.querySelector('#mui-component-select-building');
        const floorsComboBox = container.querySelector('#mui-component-select-floors');
        const orientationComboBox = container.querySelector('#mui-component-select-orientation');

        // Test if the fields are being rendered correctly
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(6);
        const comboBox = getAllByRole('combobox');
        expect(comboBox.length).toBe(3);
        expect(comboBox[0]).toBe(buildingComboBox);
        expect(comboBox[1]).toBe(floorsComboBox);
        expect(buildingComboBox).toBeInTheDocument();
        expect(floorsComboBox).toBeInTheDocument();
        expect(getByLabelText('Coordinate X*')).toBeInTheDocument();
        expect(getByLabelText('Coordinate Y*')).toBeInTheDocument();
        expect(orientationComboBox).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByLabelText('Serial Number')).toBeInTheDocument();
        expect(getByLabelText('Brand')).toBeInTheDocument();
        expect(getByLabelText('Model')).toBeInTheDocument();
        expect(getByText('Create Elevator')).toBeInTheDocument();
    });

    it('should have the formButton works', () => {
        const {getByText, getByLabelText, container} = render(
            <CreateElevatorForm
                refreshData={refreshData}
            />
        );

        const buildingComboBox = container.querySelector('#mui-component-select-building');
        const floorsComboBox = container.querySelector('#mui-component-select-floors');
        const orientationComboBox = container.querySelector('#mui-component-select-orientation');

        const coordinateX = getByLabelText('Coordinate X*');
        const coordinateY = getByLabelText('Coordinate Y*');
        const description = getByLabelText('Description');
        const serialNumber = getByLabelText('Serial Number');
        const brand = getByLabelText('Brand');
        const model = getByLabelText('Model');
        const createElevatorButton = getByText('Create Elevator');

        // Simulate the user typing in the fields
        fireEvent.input(coordinateX, {target: {value: '0'}});
        expect(coordinateX).toHaveValue('0');
        fireEvent.input(coordinateY, {target: {value: '1'}});
        expect(coordinateY).toHaveValue('1');
        fireEvent.input(description, {target: {value: 'description'}});
        expect(description).toHaveValue('description');
        fireEvent.input(serialNumber, {target: {value: 'serialNumber'}});
        expect(serialNumber).toHaveValue('serialNumber');
        fireEvent.input(brand, {target: {value: 'brand'}});
        expect(brand).toHaveValue('brand');
        fireEvent.input(model, {target: {value: 'model'}});
        expect(model).toHaveValue('model');

        buildingComboBox!.textContent = 'Building1';
        floorsComboBox!.textContent = '1';
        orientationComboBox!.textContent = "NORTH";

        // Check if the fields have been entered correctly
        expect(buildingComboBox!.textContent).toBe('Building1');
        expect(floorsComboBox!.textContent).toBe('1');
        expect(orientationComboBox!.textContent).toBe("NORTH");

        // Simulate the user clicking on the button
        fireEvent.click(createElevatorButton);

    });

});
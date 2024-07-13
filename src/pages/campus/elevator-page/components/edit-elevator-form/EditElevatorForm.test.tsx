import EditElevatorForm from "./EditElevatorForm";
import {fireEvent, render} from "@testing-library/react";

describe('EditElevatorForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {
        // Create a spy for the usePost hook
        const usePatchSpy = jest.spyOn(useApiRequest, 'useDataPatch');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
        // Simulate the usePost hook
        usePatchSpy.mockReturnValue({
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

    it('should render all the fields correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <EditElevatorForm
                refreshData={refreshData}
                handleCloseModal={jest.fn()}
                formData={{
                    buildingCode: "1",
                    floors: "1",
                    coordinateX: "1",
                    coordinateY: "1",
                    orientation: "NORTH",
                    description: "1",
                    serialNumber: "1",
                    brand: "1",
                    model: "1",
                }}
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
    });

    it('formButton should work correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <EditElevatorForm
                refreshData={refreshData}
                handleCloseModal={jest.fn().mockReturnValue(true)}
                formData={{
                    buildingCode: "1",
                    floors: "1",
                    coordinateX: "1",
                    coordinateY: "1",
                    orientation: "NORTH",
                    description: "1",
                    serialNumber: "1",
                    brand: "1",
                    model: "1",
                }}
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
        const editButton = getByText('Edit Elevator');

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
        fireEvent.click(editButton);

    });


});
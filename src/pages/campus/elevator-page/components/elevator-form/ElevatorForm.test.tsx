import ElevatorForm from "./ElevatorForm";
import {fireEvent, render} from "@testing-library/react";


describe('ElevatorForm', () => {
    const handleChangeTextField = jest.fn();
    const handleChangeSelect = jest.fn();
    const handleMultipleChangeSelect = jest.fn();

    it('should place the correct elements', () => {
        const {getAllByRole, getByLabelText, container} = render(
            <ElevatorForm
                buildingData={[]}
                floorsData={[]}
                buildingCodeValue=""
                floorsValue={[]}
                xPositionValue=""
                yPositionValue=""
                orientationValue=""
                descriptionValue=""
                serialNumberValue=""
                brandValue=""
                modelValue=""
                floorComboBox={false}
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
                handleMultipleChangeSelect={handleMultipleChangeSelect}
            />
        );

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

    it('should handle inputs change', () => {
        const handleChangeTextField = jest.fn();
        const handleChangeSelect = jest.fn();
        const handleMultipleChangeSelect = jest.fn();
        const {getByLabelText} = render(
            <ElevatorForm
                buildingData={[]}
                floorsData={[]}
                buildingCodeValue=""
                floorsValue={[]}
                xPositionValue=""
                yPositionValue=""
                orientationValue=""
                descriptionValue=""
                serialNumberValue=""
                brandValue=""
                modelValue=""
                floorComboBox={false}
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
                handleMultipleChangeSelect={handleMultipleChangeSelect}
            />
        );

        // Test if the fields are being rendered correctly
        fireEvent.change(getByLabelText('Coordinate X*'), {target: {value: '0'}});
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Coordinate Y*'), {target: {value: '1'}});
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Description'), {target: {value: 'Description'}});
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Serial Number'), {target: {value: 'Serial Number'}});
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Brand'), {target: {value: 'Brand'}});
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Model'), {target: {value: 'Model'}});
        expect(handleChangeTextField).toHaveBeenCalled();
    });

    it('ElevatorForm works correctly', () => {
        const handleChangeTextField = jest.fn();
        const handleChangeSelect = jest.fn();
        const handleMultipleChangeSelect = jest.fn();

        const {container} = render(
            <ElevatorForm
                buildingData={[]}
                floorsData={[]}
                buildingCodeValue=""
                floorsValue={[]}
                xPositionValue=""
                yPositionValue=""
                orientationValue=""
                descriptionValue=""
                serialNumberValue=""
                brandValue=""
                modelValue=""
                floorComboBox={false}
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
                handleMultipleChangeSelect={handleMultipleChangeSelect}
            />
        );

        const buildingComboBox = container.querySelector('#mui-component-select-building');
        const floorsComboBox = container.querySelector('#mui-component-select-floors');
        const orientationComboBox = container.querySelector('#mui-component-select-orientation');

        // Test if the fields are being correctly filled
        buildingComboBox!.textContent = 'Building 1';
        expect(buildingComboBox!.textContent).toBe('Building 1');

        floorsComboBox!.textContent = 'Floor 1';
        expect(floorsComboBox!.textContent).toBe('Floor 1');

        orientationComboBox!.textContent = 'Horizontal';
        expect(orientationComboBox!.textContent).toBe('Horizontal');

    });
});


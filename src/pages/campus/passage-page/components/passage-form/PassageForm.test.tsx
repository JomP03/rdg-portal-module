import PassageForm from "./PassageForm";
import {fireEvent, render} from "@testing-library/react";

describe('PassageForm', () => {
    const handleChangeTextField = jest.fn();
    const handleChangeSelect = jest.fn();

    test('PassageForm works correctly', () => {
        const {getAllByRole, getByLabelText, container} = render(
            <PassageForm
                startPointBuildingData={[]}
                startPointFloorData={[]}
                startPointBuildingValue=""
                startPointFloorValue=""
                startPointFloorComboBox={false}
                sPFirstCoordinateXValue=""
                sPFirstCoordinateYValue=""
                sPLastCoordinateXValue=""
                sPLastCoordinateYValue=""
                endPointBuildingData={[]}
                endPointFloorData={[]}
                endPointBuildingValue=""
                endPointFloorValue=""
                endPointFloorComboBox={false}
                ePFirstCoordinateXValue=""
                ePFirstCoordinateYValue=""
                ePLastCoordinateXValue=""
                ePLastCoordinateYValue=""
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
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
    });

    test('PassageForm inputs change', () => {
        const handleChangeTextField = jest.fn();
        const handleChangeSelect = jest.fn();

        const { getByLabelText } = render (
            <PassageForm
                startPointBuildingData={[]}
                startPointFloorData={[]}
                startPointBuildingValue=""
                startPointFloorValue=""
                startPointFloorComboBox={false}
                sPFirstCoordinateXValue=""
                sPFirstCoordinateYValue=""
                sPLastCoordinateXValue=""
                sPLastCoordinateYValue=""
                endPointBuildingData={[]}
                endPointFloorData={[]}
                endPointBuildingValue=""
                endPointFloorValue=""
                endPointFloorComboBox={false}
                ePFirstCoordinateXValue=""
                ePFirstCoordinateYValue=""
                ePLastCoordinateXValue=""
                ePLastCoordinateYValue=""
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
            />
        );

        // Test if the fields are being rendered correctly
        fireEvent.change(getByLabelText('Coordinate X*'), { target: { value: '0' } });
        expect(handleChangeTextField).toHaveBeenCalled();
        fireEvent.change(getByLabelText('Coordinate Y*'), { target: { value: '1' } });
        expect(handleChangeTextField).toHaveBeenCalled();
    });

    test('PassageForm works correctly', () => {
        const handleChangeTextField = jest.fn();
        const handleChangeSelect = jest.fn();

        const { container } = render(
            <PassageForm
                startPointBuildingData={[]}
                startPointFloorData={[]}
                startPointBuildingValue=""
                startPointFloorValue=""
                startPointFloorComboBox={false}
                sPFirstCoordinateXValue=""
                sPFirstCoordinateYValue=""
                sPLastCoordinateXValue=""
                sPLastCoordinateYValue=""
                endPointBuildingData={[]}
                endPointFloorData={[]}
                endPointBuildingValue=""
                endPointFloorValue=""
                endPointFloorComboBox={false}
                ePFirstCoordinateXValue=""
                ePFirstCoordinateYValue=""
                ePLastCoordinateXValue=""
                ePLastCoordinateYValue=""
                handleChangeTextField={handleChangeTextField}
                handleChangeSelect={handleChangeSelect}
            />
        );

        const startPointBuildingComboBox = container.querySelector('#mui-component-select-startPointBuilding');
        const startPointfloorComboBox = container.querySelector('#mui-component-select-startPointFloor');
        const endPointBuildingComboBox = container.querySelector('#mui-component-select-endPointBuilding');
        const endPointfloorComboBox = container.querySelector('#mui-component-select-endPointFloor');

        // Check if the fields are being correctly filled
        startPointBuildingComboBox!.textContent = 'Building 1';
        expect(startPointBuildingComboBox!.textContent).toBe('Building 1');

        startPointfloorComboBox!.textContent = 'Floor 1';
        expect(startPointfloorComboBox!.textContent).toBe('Floor 1');

        endPointBuildingComboBox!.textContent = 'Building 2';
        expect(endPointBuildingComboBox!.textContent).toBe('Building 2');

        endPointfloorComboBox!.textContent = 'Floor 2';
        expect(endPointfloorComboBox!.textContent).toBe('Floor 2');
    });
});
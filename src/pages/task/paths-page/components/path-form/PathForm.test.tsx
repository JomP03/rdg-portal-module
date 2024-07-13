import {fireEvent, render} from "@testing-library/react";
import PathForm from "./PathForm";

describe('PathForm', () => {
    test('PathForm works correctly', () => {
        const handleChangeSelect = jest.fn();

        const{ getAllByRole, container } = render(
            <PathForm
                originBuildingData={[]}
                originFloorData={[]}
                originRoomData={[]}
                originBuildingValue= ""
                originBuildingComboBox={false}
                originFloorValue= ""
                originFloorComboBox={false}
                originRoomValue= ""
                originRoomComboBox={false}
                destinationBuildingData={[]}
                destinationFloorData={[]}
                destinationRoomData={[]}
                destinationBuildingValue= ""
                destinationBuildingComboBox={false}
                destinationFloorValue= ""
                destinationFloorComboBox={false}
                destinationRoomValue= ""
                destinationRoomComboBox={false}
                handleChangeSelect={handleChangeSelect}
            />
        );

        const originBuildingComboBox = container.querySelector('#mui-component-select-originBuilding');
        const originFloorComboBox = container.querySelector('#mui-component-select-originFloor');
        const originRoomComboBox = container.querySelector('#mui-component-select-originRoom');
        const destinationBuildingComboBox = container.querySelector('#mui-component-select-destinationBuilding');
        const destinationFloorComboBox = container.querySelector('#mui-component-select-destinationFloor');
        const destinationRoomComboBox = container.querySelector('#mui-component-select-destinationRoom');

        const comboBox = getAllByRole('combobox');
        expect(comboBox.length).toBe(6);
        expect(originBuildingComboBox).toBeInTheDocument();
        expect(originFloorComboBox).toBeInTheDocument();
        expect(originRoomComboBox).toBeInTheDocument();
        expect(destinationBuildingComboBox).toBeInTheDocument();
        expect(destinationFloorComboBox).toBeInTheDocument();
        expect(destinationRoomComboBox).toBeInTheDocument();
        expect(comboBox[0]).toBe(originBuildingComboBox);
        expect(comboBox[1]).toBe(originFloorComboBox);
        expect(comboBox[2]).toBe(originRoomComboBox);
        expect(comboBox[3]).toBe(destinationBuildingComboBox);
        expect(comboBox[4]).toBe(destinationFloorComboBox);
        expect(comboBox[5]).toBe(destinationRoomComboBox);
    });

    test('PathForm works correctly', () => {
        const handleChangeSelect = jest.fn();

        const{ container } = render(
            <PathForm
                originBuildingData={[]}
                originFloorData={[]}
                originRoomData={[]}
                originBuildingValue= ""
                originBuildingComboBox={false}
                originFloorValue= ""
                originFloorComboBox={false}
                originRoomValue= ""
                originRoomComboBox={false}
                destinationBuildingData={[]}
                destinationFloorData={[]}
                destinationRoomData={[]}
                destinationBuildingValue= ""
                destinationBuildingComboBox={false}
                destinationFloorValue= ""
                destinationFloorComboBox={false}
                destinationRoomValue= ""
                destinationRoomComboBox={false}
                handleChangeSelect={handleChangeSelect}
            />
        );

        const originBuildingComboBox = container.querySelector('#mui-component-select-originBuilding');
        const originFloorComboBox = container.querySelector('#mui-component-select-originFloor');
        const originRoomComboBox = container.querySelector('#mui-component-select-originRoom');
        const destinationBuildingComboBox = container.querySelector('#mui-component-select-destinationBuilding');
        const destinationFloorComboBox = container.querySelector('#mui-component-select-destinationFloor');
        const destinationRoomComboBox = container.querySelector('#mui-component-select-destinationRoom');

        // Test if the fields are being rendered correctly
        originBuildingComboBox!.textContent = 'Building';
        expect(originBuildingComboBox!.textContent).toBe('Building');
        originFloorComboBox!.textContent = 'Floor';
        expect(originFloorComboBox!.textContent).toBe('Floor');
        originRoomComboBox!.textContent = 'Room 1';
        expect(originRoomComboBox!.textContent).toBe('Room 1');
        destinationBuildingComboBox!.textContent = 'Building';
        expect(destinationBuildingComboBox!.textContent).toBe('Building');
        destinationFloorComboBox!.textContent = 'Floor';
        expect(destinationFloorComboBox!.textContent).toBe('Floor');
        destinationRoomComboBox!.textContent = 'Room 2';
        expect(destinationRoomComboBox!.textContent).toBe('Room 2');
    });
});
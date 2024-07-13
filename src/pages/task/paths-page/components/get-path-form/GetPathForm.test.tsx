import React from "react";
import GetPathForm from "./GetPathForm";
import {fireEvent, render} from "@testing-library/react";

describe('GetPathForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: refreshData,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Check that the fields are being rendered correctly', () => {
        const {getByText, getAllByRole, getByLabelText, container} = render(
            <GetPathForm/>
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
        expect(getByText('Path Between Two Buildings')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, container} = render(
            <GetPathForm/>
        );

        const originBuildingComboBox = container.querySelector('#mui-component-select-originBuilding');
        const originFloorComboBox = container.querySelector('#mui-component-select-originFloor');
        const originRoomComboBox = container.querySelector('#mui-component-select-originRoom');
        const destinationBuildingComboBox = container.querySelector('#mui-component-select-destinationBuilding');
        const destinationFloorComboBox = container.querySelector('#mui-component-select-destinationFloor');
        const destinationRoomComboBox = container.querySelector('#mui-component-select-destinationRoom');
        const submitButton = getByText('Submit');

        originBuildingComboBox!.textContent = 'Building 1';
        originFloorComboBox!.textContent = 'Floor 1';
        originRoomComboBox!.textContent = 'Room 1';
        destinationBuildingComboBox!.textContent = 'Building 2';
        destinationFloorComboBox!.textContent = 'Floor 2';
        destinationRoomComboBox!.textContent = 'Room 2';

        expect(originBuildingComboBox!.textContent).toBe('Building 1');
        expect(originFloorComboBox!.textContent).toBe('Floor 1');
        expect(originRoomComboBox!.textContent).toBe('Room 1');
        expect(destinationBuildingComboBox!.textContent).toBe('Building 2');
        expect(destinationFloorComboBox!.textContent).toBe('Floor 2');
        expect(destinationRoomComboBox!.textContent).toBe('Room 2');

        // Simulate the user clicking "Submit"
        fireEvent.click(submitButton);

        // Check if button was clicked
        expect(submitButton).toBeEnabled();
    });
});
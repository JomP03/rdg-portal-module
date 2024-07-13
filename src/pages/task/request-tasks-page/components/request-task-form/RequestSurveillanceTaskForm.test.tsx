import React from "react";
import {fireEvent, render} from "@testing-library/react";
import RequestSurveillanceTaskForm from "./RequestSurveillanceTaskForm";

describe('RequestSurveillanceTaskForm', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');
    const jwtDecode = require('jwt-decode');

    beforeEach(() => {
        const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
        const useJwtDecode = jest.spyOn(jwtDecode, 'jwtDecode');
        usePostSpy.mockReturnValue({
            sendData: sendData,
            loading: false,
        });

        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: refreshData,
        });

        useJwtDecode.mockReturnValue({
            sub: '123456789'
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Check that the fields are being rendered correctly', () => {
        const {getAllByRole, getByLabelText, container} = render(
            <RequestSurveillanceTaskForm
                refreshData={refreshData}
            />
        );

        const building = container.querySelector('#mui-component-select-building');
        const floor = container.querySelector('#mui-component-select-floor');
        const startingRoom = container.querySelector('#mui-component-select-startingRoom');
        const endingRoom = container.querySelector('#mui-component-select-endingRoom');
        const robisepType = container.querySelector('#mui-component-select-robisepType');
        const emergencyPhoneNumber = getByLabelText('Emergency Phone Number*');

        const textField = getAllByRole('textbox');
        const comboBox = getAllByRole('combobox');

        expect(textField.length).toBe(1);
        expect(comboBox.length).toBe(5);
        expect(comboBox[0]).toBe(building);
        expect(comboBox[1]).toBe(floor);
        expect(comboBox[2]).toBe(startingRoom);
        expect(comboBox[3]).toBe(endingRoom);
        expect(comboBox[4]).toBe(robisepType);
        expect(emergencyPhoneNumber).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, getByLabelText, container} = render(<RequestSurveillanceTaskForm refreshData={refreshData}/>);

        const building = container.querySelector('#mui-component-select-building');
        const floor = container.querySelector('#mui-component-select-floor');
        const startingRoom = container.querySelector('#mui-component-select-startingRoom');
        const endingRoom = container.querySelector('#mui-component-select-endingRoom');
        const robisepType = container.querySelector('#mui-component-select-robisepType');
        const emergencyPhoneNumber = getByLabelText('Emergency Phone Number*');
        const formButton = getByText('Create Surveillance Task');

        fireEvent.input(emergencyPhoneNumber, {target: {value: '912345678'}});
        building!.textContent = 'Building1';
        floor!.textContent = 'Floor1';
        startingRoom!.textContent = 'Room1';
        endingRoom!.textContent = 'Room2';
        robisepType!.textContent = 'SurveillanceRobisep';
        fireEvent.click(formButton);

        expect(building!.textContent).toBe('Building1');
        expect(floor!.textContent).toBe('Floor1');
        expect(startingRoom!.textContent).toBe('Room1');
        expect(endingRoom!.textContent).toBe('Room2');
        expect(robisepType!.textContent).toBe('SurveillanceRobisep');
        expect(emergencyPhoneNumber).toHaveValue('912345678');
    });
});
import React from "react";
import RequestPickUpAndDeliveryTaskForm from "./RequestPickUpAndDeliveryTaskForm";
import {fireEvent, render} from "@testing-library/react";
describe('RequestPickUpAndDeliveryTaskForm', () => {
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
            <RequestPickUpAndDeliveryTaskForm
                refreshData={refreshData}
            />
        );

        const pickUpBuilding = container.querySelector('#mui-component-select-pickUpBuilding');
        const pickUpFloor = container.querySelector('#mui-component-select-pickUpFloor');
        const pickUpRoom = container.querySelector('#mui-component-select-pickUpRoom');
        const deliveryBuilding = container.querySelector('#mui-component-select-deliveryBuilding');
        const deliveryFloor = container.querySelector('#mui-component-select-deliveryFloor');
        const deliveryRoom = container.querySelector('#mui-component-select-deliveryRoom');
        const robisepType = container.querySelector('#mui-component-select-robisepType');

        const textField = getAllByRole('textbox');
        const comboBox = getAllByRole('combobox');

        expect(textField.length).toBe(6);
        expect(comboBox.length).toBe(7);
        expect(comboBox[0]).toBe(pickUpBuilding);
        expect(comboBox[1]).toBe(pickUpFloor);
        expect(comboBox[2]).toBe(pickUpRoom);
        expect(comboBox[3]).toBe(deliveryBuilding);
        expect(comboBox[4]).toBe(deliveryFloor);
        expect(comboBox[5]).toBe(deliveryRoom);
        expect(comboBox[6]).toBe(robisepType);
        expect(getByLabelText('Phone Number*')).toBeInTheDocument();
        expect(getByLabelText('Personal Name*')).toBeInTheDocument();
        expect(getByLabelText('Confirmation Code*')).toBeInTheDocument();
        expect(getByLabelText('Description*')).toBeInTheDocument();
        expect(pickUpBuilding).toBeInTheDocument();
        expect(pickUpFloor).toBeInTheDocument();
        expect(pickUpRoom).toBeInTheDocument();
        expect(deliveryBuilding).toBeInTheDocument();
        expect(deliveryFloor).toBeInTheDocument();
        expect(deliveryRoom).toBeInTheDocument();
        expect(robisepType).toBeInTheDocument();
    });

    test('Check that formButton works', () => {
        const {getByText, getByLabelText, getAllByLabelText, container} = render(
            <RequestPickUpAndDeliveryTaskForm
                refreshData={refreshData}
            />
        );

        const pickUpBuilding = container.querySelector('#mui-component-select-pickUpBuilding');
        const pickUpFloor = container.querySelector('#mui-component-select-pickUpFloor');
        const pickUpRoom = container.querySelector('#mui-component-select-pickUpRoom');
        const deliveryBuilding = container.querySelector('#mui-component-select-deliveryBuilding');
        const deliveryFloor = container.querySelector('#mui-component-select-deliveryFloor');
        const deliveryRoom = container.querySelector('#mui-component-select-deliveryRoom');
        const robisepType = container.querySelector('#mui-component-select-robisepType');

        const phoneNumber = getByLabelText('Phone Number*');
        const personalName = getByLabelText('Personal Name*');
        const confirmationCode = getByLabelText('Confirmation Code*');
        const description = getByLabelText('Description*');
        const createPickUpAndDeliveryTask = getByText('Create Pickup and Delivery Task');

        // Simulate the user typing in the fields
        fireEvent.input(phoneNumber, {target: {value: '912345678'}});
        expect(phoneNumber).toHaveValue('912345678');
        fireEvent.input(personalName, {target: {value: 'John Doe'}});
        expect(personalName).toHaveValue('John Doe');
        fireEvent.input(confirmationCode, {target: {value: '1234'}});
        expect(confirmationCode).toHaveValue('1234');
        fireEvent.input(description, {target: {value: 'Test Description'}});
        expect(description).toHaveValue('Test Description');
        pickUpBuilding!.textContent = 'Building 1';
        pickUpFloor!.textContent = 'Floor 1';
        pickUpRoom!.textContent = 'Room 1';
        deliveryBuilding!.textContent = 'Building 2';
        deliveryFloor!.textContent = 'Floor 2';
        deliveryRoom!.textContent = 'Room 2';
        robisepType!.textContent = 'Type A';

        // Simulate the user clicking the button
        fireEvent.click(createPickUpAndDeliveryTask);

        // Check if the fields have been entered correctly
        expect(pickUpBuilding!.textContent).toBe('Building 1');
        expect(pickUpFloor!.textContent).toBe('Floor 1');
        expect(pickUpRoom!.textContent).toBe('Room 1');
        expect(deliveryBuilding!.textContent).toBe('Building 2');
        expect(deliveryFloor!.textContent).toBe('Floor 2');
        expect(deliveryRoom!.textContent).toBe('Room 2');
        expect(robisepType!.textContent).toBe('Type A');
        expect(createPickUpAndDeliveryTask).toBeInTheDocument();
    });
});
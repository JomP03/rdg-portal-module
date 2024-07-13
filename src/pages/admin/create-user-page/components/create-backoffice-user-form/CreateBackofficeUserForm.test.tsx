import {fireEvent, render} from "@testing-library/react";
import CreateBackofficeUserForm from "./CreateBackofficeUserForm";

describe('CreateBackofficeUserForm', () => {
    const sendData = jest.fn();
    const useApiRequest = require('../../../../../hooks/useApiRequest');
    const jwtDecode = require('jwt-decode');

    beforeEach(() => {
        const usePostSpy = jest.spyOn(useApiRequest, 'useUserPost');
        const useGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
        const useJwtDecode = jest.spyOn(jwtDecode, 'jwtDecode');
        usePostSpy.mockReturnValue({
            sendData: sendData,
            loading: false,
        });
        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: jest.fn(),
        });
        useJwtDecode.mockReturnValue({
            sub: '123456789'
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Check that the fields are being rendered correctly', () => {
        const {getAllByRole, getByLabelText, getByText, container} = render(<CreateBackofficeUserForm/>);

        const email = getByLabelText('Email*');
        const name = getByLabelText('Name*');
        const phoneNumber = getByLabelText('Phone Number*');
        const role = container.querySelector('#mui-component-select-userRoleId');

        const textField = getAllByRole('textbox');
        const comboBox = getAllByRole('combobox');

        expect(textField.length).toBe(3);
        expect(comboBox.length).toBe(1);
        expect(comboBox[0]).toBe(role);
    });

    test('Check that formButton works' , () => {
        const {getByText, getByLabelText, container} = render(<CreateBackofficeUserForm/>);

        const email = getByLabelText('Email*');
        const name = getByLabelText('Name*');
        const phoneNumber = getByLabelText('Phone Number*');
        const role = container.querySelector('#mui-component-select-userRoleId');
        const formButton = getByText('Create User');

       fireEvent.input(email, {target: {value: 'email@isep.ipp.pt'}});
       expect(email).toHaveValue('email@isep.ipp.pt');
       fireEvent.input(name, {target: {value: 'name'}});
       expect(name).toHaveValue('name');
       fireEvent.input(phoneNumber, {target: {value: '912345678'}});
       role!.textContent = 'Campus Manager';
       fireEvent.click(formButton);

       expect(phoneNumber).toHaveValue('912345678');
       expect(role!.textContent).toBe('Campus Manager');
    });
});
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import CreateUserPage from "./CreateUserPage";

describe('CreateUserPage', () => {
    describe('Success', () => {
        const sendData = jest.fn();
        const refreshData = jest.fn();
        const jwtDecode = require('jwt-decode');
        const useApiRequest = require('../../../hooks/useApiRequest');

        beforeEach(() => {
            const usePostSpy = jest.spyOn(useApiRequest, 'useUserPost');
            const useGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
            const useJwtDecode = jest.spyOn(jwtDecode, 'jwtDecode');
            usePostSpy.mockReturnValue({
                sendData: sendData,
                loading: false,
            });
            useGetSpy.mockReturnValue({
                data: { users: [
                    {
                        id: '123456789',
                        name: 'joao',
                        email: 'joao@isep.ipp.pt',
                        nif: '204883300',
                        roleName: 'CAMPUS_MANAGER',
                        phoneNumber: '912345678',
                        iamId: '123456789',
                    }
                ]},
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });
            useJwtDecode.mockReturnValue({
                sub: '123456789'
            });
        });

        it('Render with Create Backoffice User Form', async () => {
            const { getAllByText, getByLabelText, getByPlaceholderText, getAllByRole, container} = render(<CreateUserPage/>);

            const email = getByLabelText('Email*');
            fireEvent.input(email, { target: { value: 'email@isep.ipp.pt' } });
            const name = getByLabelText('Name*');
            fireEvent.input(name, { target: { value: 'name' } });
            const phoneNumber = getByLabelText('Phone Number*');
            fireEvent.input(phoneNumber, { target: { value: '912345678' } });
            const password = getByPlaceholderText('Password*');
            fireEvent.input(password, { target: { value: 'password' } });
            const role = container.querySelector('#mui-component-select-userRoleId');
            role!.textContent = 'Campus Manager';

            const button = getAllByRole('button')[0];
            fireEvent.click(button);

            await waitFor(()=> {
                expect(refreshData).toHaveBeenCalled();
            });
        });
    });
    describe('Failure', () => {
        let error = {};
        const sendData = jest.fn();
        const refreshData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');
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
                error: error,
                loading: false,
                refreshData: refreshData,
            });
            useJwtDecode.mockReturnValue({
                sub: '123456789'
            });
        });

        it('Render with error', async () => {
            const { getAllByText, getByLabelText, getByPlaceholderText, getAllByRole, container} = render(<CreateUserPage/>);

            const email = getByLabelText('Email*');
            fireEvent.input(email, { target: { value: 'email@isep.ipp.pt' } });
            const name = getByLabelText('Name*');
            fireEvent.input(name, { target: { value: 'name' } });
            const phoneNumber = getByLabelText('Phone Number*');
            fireEvent.input(phoneNumber, { target: { value: '912345678' } });
            const password = getByPlaceholderText('Password*');
            fireEvent.input(password, { target: { value: 'password' } });

            const button = getAllByRole('button')[0];
            fireEvent.click(button);

            await waitFor(()=> {
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });
        });
    });
});
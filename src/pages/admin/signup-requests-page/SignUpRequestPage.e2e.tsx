import SignUpRequestPage from "./SignUpRequestPage";
import {fireEvent, getByPlaceholderText, render, waitFor} from "@testing-library/react";
import {requestsMock} from "../../../mocks/signUpRequestsMock";
import exp from "constants";
import { send } from "process";

describe('SignUpPage', () => {

    describe('Sucessful', () => {

        const refreshData = jest.fn();
        const sendData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');
        const jwtDecode = require('jwt-decode');

        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
            const useUserGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');

            // Create a spy for the jwtDecode hook
            const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');

            // Simulate the usePost hook
            usePatchSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });

            // Simulate the useGet hook
            useUserGetSpy.mockReturnValue({
                data: requestsMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the useGet hook
            useGetSpy.mockReturnValue({
                data: requestsMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the jwtDecode hook
            jwtDecodeSpy.mockReturnValue({
                sub: '1',
            });
        });

        it('Render with table', async () => {

            const {getByText, getAllByText} = render(<SignUpRequestPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Name')[0]).toBeInTheDocument();
            expect(getAllByText('Email')[0]).toBeInTheDocument();
            expect(getAllByText('Nif')[0]).toBeInTheDocument();
            expect(getAllByText('Phone Number')[0]).toBeInTheDocument();

            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 1 of 1')).toBeInTheDocument();

          
            expect(getAllByText('email 1')[0]).toBeInTheDocument();
            expect(getAllByText('email 2')[0]).toBeInTheDocument();
            expect(getAllByText('name 1')[0]).toBeInTheDocument();
            expect(getAllByText('name 2')[0]).toBeInTheDocument();
            expect(getAllByText('nif 1')[0]).toBeInTheDocument();
            expect(getAllByText('nif 2')[0]).toBeInTheDocument();
            expect(getAllByText('phoneNumber 1')[0]).toBeInTheDocument();
            expect(getAllByText('phoneNumber 2')[0]).toBeInTheDocument();
              
        });

        it('Approve Request', async () => {

            const {getAllByAltText, getAllByText, getByText} = render(<SignUpRequestPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Name')[0]).toBeInTheDocument();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Accept');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
            });

        });

        it('Reject Request', async () => {

            const {getAllByAltText, getAllByText, getByText} = render(<SignUpRequestPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Name')[0]).toBeInTheDocument();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Reject');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
            });

        });
    });


    describe('Failure', () => {
        let error = {};

        const refreshData = jest.fn();
        const sendData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');
        const jwtDecode = require('jwt-decode');

        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
            const useUserGetSpy = jest.spyOn(useApiRequest, 'useUserGet');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');

            // Create a spy for the jwtDecode hook
            const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');

            // Simulate the usePost hook
            usePatchSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });

            // Simulate the useGet hook
            useUserGetSpy.mockReturnValue({
                data: undefined,
                error: error,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the useGet hook
            useGetSpy.mockReturnValue({
                data: undefined,
                error: error,
                loading: false,
                refreshData: refreshData,
            });

            // Simulate the jwtDecode hook
            jwtDecodeSpy.mockReturnValue({
                sub: '1',
            });
        });

        it('Render table with no data', async () => {

            const {getByText, queryByText} = render(<SignUpRequestPage/>);

            // Wait for the table to build the header
            expect(queryByText('Name')).toBeNull();
   

            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 0 of 0')).toBeInTheDocument();

          
            expect(queryByText('email 1')).not.toBeInTheDocument();
            expect(queryByText('email 2')).not.toBeInTheDocument();
            expect(queryByText('name 1')).not.toBeInTheDocument();
            expect(queryByText('name 2')).not.toBeInTheDocument();
            expect(queryByText('nif 1')).not.toBeInTheDocument();
            expect(queryByText('nif 2')).not.toBeInTheDocument();
            expect(queryByText('phoneNumber 1')).not.toBeInTheDocument();
            expect(queryByText('phoneNumber 2')).not.toBeInTheDocument();
              
        });

       it('Approve Request', async () => {

            const {getAllByAltText, getByText, queryByText} = render(<SignUpRequestPage/>);

       
            // Wait for the table to build the header
            expect(queryByText('Name')).toBeNull();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Accept');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });

        });

        it('Reject Request', async () => {

            const {getAllByAltText, getByText, queryByText} = render(<SignUpRequestPage/>);

            // Wait for the table to build the header
            expect(queryByText('Name')).toBeNull();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Reject');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });

        });
        
    });

});
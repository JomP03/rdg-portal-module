import {tasksMock} from "../../../mocks/taskMock";
import React from "react";
import RequestTaskPage from "./RequestTaskPage";
import {fireEvent, getAllByText, render, waitFor} from "@testing-library/react";
import jwtDecode from "jwt-decode/build/esm";

describe('RequestTaskPage', () => {
    describe('Success', () => {
        const refreshData = jest.fn();
        const sendData = jest.fn();
        const jwtDecode = require('jwt-decode');
        const useApiRequest = require('../../../hooks/useApiRequest');

        beforeEach(() => {
            const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
            const useJwtDecode = jest.spyOn(jwtDecode, 'jwtDecode');
            usePostSpy.mockReturnValue({
                sendData: sendData,
                loading: false,
            });

            useGetSpy.mockReturnValue({
                data: tasksMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });

            useJwtDecode.mockReturnValue({
                sub: '123456789'
            });
        });

        it('Render with table', async () => {
            const { getByText } = render(<RequestTaskPage/>);

            await waitFor(()=> {
                tasksMock.map((task) => {
                    expect(getByText(task.taskCode)).toBeInTheDocument();
                    expect(getByText(task.robisepType.tasksType[0])).toBeInTheDocument();
                    expect(getByText(task.robisepType.designation)).toBeInTheDocument();
                    expect(getByText(task.state)).toBeInTheDocument();
                    expect(getByText('Start: ' + task.surveillanceTask?.startingPointToWatch.name + ' - End: ' + task.surveillanceTask?.endingPointToWatch.name)).toBeInTheDocument();
                });
            });
        });

        it('Render with Request Surveillance Task Form', async () => {
            const { getByText, getByLabelText, getAllByText, getAllByLabelText, container} = render(<RequestTaskPage/>);

            const taskType = container.querySelector('#mui-component-select-taskType');
            // simulate click to open select
            fireEvent.mouseDown(taskType!);
            // select the first option
            const option = getAllByText('SURVEILLANCE')[1];
            fireEvent.click(option);

            const building = container.querySelector('#mui-component-select-building');
            const floor = container.querySelector('#mui-component-select-floor');
            const startingRoom = container.querySelector('#mui-component-select-startingRoom');
            const endingRoom = container.querySelector('#mui-component-select-endingRoom');
            const robisepType = container.querySelector('#mui-component-select-robisepType');
            const emergencyPhoneNumber = getByLabelText('Emergency Phone Number*');

            building!.textContent = 'Building 1';
            floor!.textContent = '9';
            startingRoom!.textContent = 'StartingPointToWatch1';
            endingRoom!.textContent = 'EndingPointToWatch2';
            robisepType!.textContent = 'SurveillanceRobisep';
            fireEvent.input(emergencyPhoneNumber, {target: {value: '912345678'}})

            const button = getByText('Create Surveillance Task');
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
            const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
            const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
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
            render(<RequestTaskPage/>);

            await waitFor(()=> {
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });
        });
    });
});
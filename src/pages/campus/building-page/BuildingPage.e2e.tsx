import {render, waitFor, fireEvent} from '@testing-library/react';
import BuildingPage from "./BuildingPage";
import {buildingsMock} from "../../../mocks/buildingsMock";

describe('BuildingPage', () => {

    describe('List All', () => {

        describe('Successful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: undefined,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should render all the data in the table', async () => {

                const {getByText, getAllByText} = render(<BuildingPage/>);

                // Wait for the table to build the header
                expect(getAllByText('Code')[0]).toBeInTheDocument();
                expect(getAllByText('Name')[0]).toBeInTheDocument();
                expect(getAllByText('Description')[0]).toBeInTheDocument();
                expect(getAllByText('Width')[0]).toBeInTheDocument();
                expect(getAllByText('Length')[0]).toBeInTheDocument();
                expect(getAllByText('Action')[0]).toBeInTheDocument();

                expect(getByText('Refresh')).toBeInTheDocument();
                expect(getByText('Page 1 of 1')).toBeInTheDocument();

                await waitFor(() => {
                    buildingsMock.map(building => {
                        expect(getByText(building.buildingName!)).toBeInTheDocument();
                        expect(getByText(building.buildingCode!)).toBeInTheDocument();
                        expect(getByText(building.buildingDimensions.length)).toBeInTheDocument();
                        expect(getByText(building.buildingDimensions.width)).toBeInTheDocument();
                    });
                });
            });
        });

        describe('Unsuccessful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: undefined,
                    error: 'Error',
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should render an error message', async () => {

                const {getByText} = render(<BuildingPage/>);

                await waitFor(() => {
                    expect(getByText('No Buildings available to display')).toBeInTheDocument();
                });
            });


        });

    });

    describe('Create', () => {

        describe('Successful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: undefined,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should create a new building', async () => {

                const {getByText, getByLabelText, getAllByText} = render(<BuildingPage/>);

                // Wait for the table to build the header
                expect(getAllByText('Code')[0]).toBeInTheDocument();
                expect(getAllByText('Name')[0]).toBeInTheDocument();
                expect(getAllByText('Description')[0]).toBeInTheDocument();
                expect(getAllByText('Width')[0]).toBeInTheDocument();
                expect(getAllByText('Length')[0]).toBeInTheDocument();
                expect(getAllByText('Action')[0]).toBeInTheDocument();

                // No data to render
                await waitFor(() => {
                    expect(getByLabelText('Code*')).toBeInTheDocument();
                    expect(getByLabelText('Name')).toBeInTheDocument();
                    expect(getByLabelText('Description')).toBeInTheDocument();
                    expect(getByLabelText('Width*')).toBeInTheDocument();
                    expect(getByLabelText('Length*')).toBeInTheDocument();
                });

                fireEvent.change(getByLabelText('Code*'), {target: {value: 'Code'}});
                fireEvent.change(getByLabelText('Name'), {target: {value: 'New Created'}});
                fireEvent.change(getByLabelText('Description'), {target: {value: 'Description'}});
                fireEvent.change(getByLabelText('Width*'), {target: {value: '1'}});
                fireEvent.change(getByLabelText('Length*'), {target: {value: '1'}});

                fireEvent.click(getByText('Create Building'));

                // Check if sendDate is called
                await waitFor(() => {
                    expect(refreshData).toHaveBeenCalled();
                    expect(sendData).toHaveBeenCalled();
                });

            });
        });

        describe('Unsuccessful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            let error = {};
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: error,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should error', async () => {

                const {getByText, getByLabelText, getAllByText} = render(<BuildingPage/>);

                // Wait for the table to build the header
                expect(getAllByText('Code')[0]).toBeInTheDocument();
                expect(getAllByText('Name')[0]).toBeInTheDocument();
                expect(getAllByText('Description')[0]).toBeInTheDocument();
                expect(getAllByText('Width')[0]).toBeInTheDocument();
                expect(getAllByText('Length')[0]).toBeInTheDocument();

                // No data to render
                await waitFor(() => {
                    expect(getByLabelText('Code*')).toBeInTheDocument();
                    expect(getByLabelText('Name')).toBeInTheDocument();
                    expect(getByLabelText('Description')).toBeInTheDocument();
                    expect(getByLabelText('Width*')).toBeInTheDocument();
                    expect(getByLabelText('Length*')).toBeInTheDocument();
                });

                fireEvent.change(getByLabelText('Code*'), {target: {value: 'Code'}});
                fireEvent.change(getByLabelText('Name'), {target: {value: 'New Created'}});
                fireEvent.change(getByLabelText('Description'), {target: {value: 'Description'}});
                fireEvent.change(getByLabelText('Width*'), {target: {value: '1'}});
                fireEvent.change(getByLabelText('Length*'), {target: {value: '1'}});

                fireEvent.click(getByText('Create Building'));

                // Check if sendDate is called
                await waitFor(() => {
                    expect(refreshData).toHaveBeenCalled();
                    expect(sendData).toHaveBeenCalled();
                    expect(error).not.toBeNull();
                });

            });


        });

    });

    describe('Update', () => {
        describe('Successful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: undefined,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should update a building', async () => {

                const {getAllByAltText, getAllByText, getByText} = render(<BuildingPage/>);

                // Wait for the table to build the header
                expect(getAllByText('Code')[0]).toBeInTheDocument();

                // Click on the edit modal button
                const button = getAllByAltText('Image Not Found')[0];
                expect(button).toBeInTheDocument();
                fireEvent.click(button);

                // Wait for the modal to open
                const editButton = getByText('Submit');
                expect(editButton).toBeInTheDocument();

                // Click on the edit button
                fireEvent.click(editButton);

                // Wait for the modal to close
                await waitFor(() => {
                    expect(refreshData).toHaveBeenCalled();
                });

            });
        });

        describe('Unsuccessful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');
            let error = {};

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: error,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should not update a building', async () => {

                const {getAllByAltText, getAllByText, getByText} = render(<BuildingPage/>);

                // Wait for the table to build the header
                expect(getAllByText('Code')[0]).toBeInTheDocument();

                // Click on the edit modal button
                const button = getAllByAltText('Image Not Found')[0];
                expect(button).toBeInTheDocument();
                fireEvent.click(button);

                // Wait for the modal to open
                const editButton = getByText('Submit');
                expect(editButton).toBeInTheDocument();

                // Click on the edit button
                fireEvent.click(editButton);

                // Wait for the modal to close
                await waitFor(() => {
                    expect(error).not.toBeNull();
                });

            });



        });
    });

    describe('List with filter', () => {
        describe('Successful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: buildingsMock,
                    error: undefined,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('should filter data', async () => {

                const {getByTitle, getByText} = render(<BuildingPage/>);

                const filterButton = getByTitle('Filter Menu');
                fireEvent.click(filterButton);

                await waitFor(() => {
                    expect(getByText('By Min and Max Floors')).toBeInTheDocument();
                });

                const filter = getByText('Apply');

                fireEvent.click(filter);

                await waitFor(() => {
                    expect(refreshData).toHaveBeenCalled();
                });
            });
        });

        describe('Unsuccessful', () => {
            const refreshData = jest.fn();
            const sendData = jest.fn();
            const useApiRequest = require('../../../hooks/useApiRequest');

            beforeEach(() => {
                // Create a spy for the usePost hook
                const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
                const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
                // Simulate the usePost hook
                usePostSpy.mockReturnValue({
                    sendData: sendData(),
                    loading: false,
                });
                // Simulate the useGet hook
                useGetSpy.mockReturnValue({
                    data: undefined,
                    error: undefined,
                    loading: false,
                    refreshData: refreshData,
                });
            });

            it('Filter Building', async () => {

                const {queryByTitle} = render(<BuildingPage/>);

                expect(queryByTitle('Filter Menu')).toBeNull();
            });
        });
    });




});

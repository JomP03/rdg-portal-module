import ElevatorPage from "./ElevatorPage";
import {fireEvent, getByPlaceholderText, render, waitFor} from "@testing-library/react";
import {elevatorsMock} from "../../../mocks/elevatorsMock";

describe('ElevatorPage', () => {

    describe('Sucessful', () => {

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
                data: elevatorsMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });
        });

        it('Render with table', async () => {

            const {getByText, getAllByText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Building')[0]).toBeInTheDocument();
            expect(getAllByText('Number')[0]).toBeInTheDocument();
            expect(getAllByText('Served Floors')[0]).toBeInTheDocument();
            expect(getAllByText('Brand')[0]).toBeInTheDocument();
            expect(getAllByText('Model')[0]).toBeInTheDocument();
            expect(getAllByText('Serial Number')[0]).toBeInTheDocument();
            expect(getAllByText('X Position')[0]).toBeInTheDocument();
            expect(getAllByText('Y Position')[0]).toBeInTheDocument();
            expect(getAllByText('Description')[0]).toBeInTheDocument();
            expect(getAllByText('Orientation')[0]).toBeInTheDocument();

            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 1 of 1')).toBeInTheDocument();

            await waitFor(() => {
                elevatorsMock.map((elevator) => {
                    expect(getAllByText(elevator.building.buildingCode!)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.uniqueNumber)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.brand!)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.model!)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.serialNumber!)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.elevatorPosition.xposition)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.elevatorPosition.yposition)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.description!)[0]).toBeInTheDocument();
                    expect(getAllByText(elevator.orientation)[0]).toBeInTheDocument();
                });
            });
        });

        it('Edit Elevator', async () => {

            const {getAllByAltText, getAllByText, getByText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Building')[0]).toBeInTheDocument();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Edit Elevator');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
            });

        });


        it('Filter Elevator', async () => {

            const {getByText, getByTitle, getAllByText} = render(<ElevatorPage/>);

            const filterButton = getByTitle('Filter Menu');
            fireEvent.click(filterButton);

            await waitFor(() => {
                expect(getByText('By Building')).toBeInTheDocument();

            });

            const button = getAllByText('Apply')[0];
            expect(button).toBeInTheDocument();

            // Click on the apply button
            fireEvent.click(button);

            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
            });
        });


        it('Render with Create Form', async () => {

            const {getByText, getByPlaceholderText, getAllByPlaceholderText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(getByText('Create Elevator')).toBeInTheDocument();

            // Check if the form is rendered
            expect(getAllByPlaceholderText('Enter Model')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Brand')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Serial Number')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Description')[0]).toBeInTheDocument();

            const button = getByText('Create Elevator');
            expect(button).toBeInTheDocument();

            // Click on the create button
            fireEvent.click(button);

            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
            });

        });



    });


    describe('Failure', () => {
        let error = {};

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
                error: error,
                loading: false,
                refreshData: refreshData,
            });
        });

        it('Render with table with no data', async () => {

            const {getByText, getAllByText, queryAllByText, queryByText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(queryByText('Number')).toBeNull();


            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 0 of 0')).toBeInTheDocument();

            await waitFor(() => {
                elevatorsMock.map((elevator) => {
                    expect(queryByText(elevator.building.buildingCode!)).not.toBeInTheDocument();
                    expect(queryByText(elevator.uniqueNumber)).not.toBeInTheDocument();
                    expect(queryByText(elevator.brand!)).not.toBeInTheDocument();
                    expect(queryByText(elevator.model!)).not.toBeInTheDocument();
                    expect(queryByText(elevator.serialNumber!)).not.toBeInTheDocument();
                    expect(queryByText(elevator.elevatorPosition.xposition)).not.toBeInTheDocument();
                    expect(queryByText(elevator.elevatorPosition.yposition)).not.toBeInTheDocument();
                    expect(queryByText(elevator.description!)).not.toBeInTheDocument();
                });
            });

        });


        it('Edit Elevator', async () => {

            const {getAllByAltText, getAllByText, getByText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(getAllByText('Building')[0]).toBeInTheDocument();

            // Click on the edit modal button
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();
            fireEvent.click(button);

            // Wait for the modal to open
            const editButton = getByText('Edit Elevator');
            expect(editButton).toBeInTheDocument();

            // Click on the edit button
            fireEvent.click(editButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });

        });


        it('Filter Elevator', async () => {

            const {queryByTitle} = render(<ElevatorPage/>);

            expect(queryByTitle('Filter Menu')).toBeNull();
        });

        it('Render with Create Form', async () => {

            const {getByText, getByPlaceholderText, getAllByPlaceholderText} = render(<ElevatorPage/>);

            // Wait for the table to build the header
            expect(getByText('Create Elevator')).toBeInTheDocument();

            // Check if the form is rendered
            expect(getAllByPlaceholderText('Enter Model')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Brand')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Serial Number')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Description')[0]).toBeInTheDocument();

            const button = getByText('Create Elevator');
            expect(button).toBeInTheDocument();

            // Click on the create button
            fireEvent.click(button);

            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });

        });

    });

});
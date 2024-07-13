import {passagesMock} from "../../../mocks/passageMock";
import {fireEvent, queryByText, render, waitFor} from "@testing-library/react";
import React from "react";
import PassagePage from "./PassagePage";

describe('PassagePage', () => {
    describe('Success', () => {
        const refreshData = jest.fn();
        const sendData = jest.fn();
        const useApiRequest = require('../../../hooks/useApiRequest');

        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
            const useGetPassagesSpy = jest.spyOn(useApiRequest, 'useDataGet');
            // Simulate the usePost hook
            usePostSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });
            // Simulate the useGet hook
            useGetPassagesSpy.mockReturnValue({
                data: passagesMock,
                error: undefined,
                loading: false,
                refreshData: refreshData,
            });
        });

        it('Render with table', async () => {
            const {getByText, getAllByText} = render(<PassagePage/>);

            // Wait for the table to build the header
            expect(getAllByText('StartPointBuilding')[0]).toBeInTheDocument();
            expect(getAllByText('StartPointFloor')[0]).toBeInTheDocument();
            expect(getAllByText('EndPointBuilding')[0]).toBeInTheDocument();
            expect(getAllByText('EndPointFloor')[0]).toBeInTheDocument();
            expect(getAllByText('Action')[0]).toBeInTheDocument();

            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 1 of 1')).toBeInTheDocument();

            await waitFor(() => {
                passagesMock.map((passage) => {
                    expect(getAllByText(passage.passageStartPoint.floor.building.buildingCode!)[0]).toBeInTheDocument();
                    expect(getAllByText(passage.passageStartPoint.floor.floorNumber)[0]).toBeInTheDocument();
                    expect(getAllByText(passage.passageEndPoint.floor.building.buildingCode!)[0]).toBeInTheDocument();
                    expect(getAllByText(passage.passageEndPoint.floor.floorNumber)[0]).toBeInTheDocument();
                });
            });
        });

        it('Edit Passage', async () => {
            const {getAllByText, getByText, container , getAllByAltText} = render(<PassagePage/>);

            // Wait for the table to build the header
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();

            // Open the Edit Modal
            fireEvent.click(button);

            // Wait for the modal to open
            const startPointBuildingComboBox = container.querySelector('#mui-component-select-startPointBuilding');
            const startPointfloorComboBox = container.querySelector('#mui-component-select-startPointFloor');
            const sPFirstCoordinateXTextField = getAllByText('Coordinate X*')[0];
            const sPFirstCoordinateYTextField = getAllByText('Coordinate Y*')[0];
            const sPLastCoordinateXTextField = getAllByText('Coordinate X*')[1];
            const sPLastCoordinateYTextField = getAllByText('Coordinate Y*')[1];
            const endPointBuildingComboBox = container.querySelector('#mui-component-select-endPointBuilding');
            const endPointfloorComboBox = container.querySelector('#mui-component-select-endPointFloor');
            const ePFirstCoordinateXTextField = getAllByText('Coordinate X*')[2];
            const ePFirstCoordinateYTextField = getAllByText('Coordinate Y*')[2];
            const ePLastCoordinateXTextField = getAllByText('Coordinate X*')[3];
            const ePLastCoordinateYTextField = getAllByText('Coordinate Y*')[3];

            startPointBuildingComboBox!.textContent = "SB";
            startPointfloorComboBox!.textContent = "0";
            sPFirstCoordinateXTextField.textContent = "20";
            sPFirstCoordinateYTextField.textContent = "21";
            sPLastCoordinateXTextField.textContent = "22";
            sPLastCoordinateYTextField.textContent = "23";
            endPointBuildingComboBox!.textContent = "EB";
            endPointfloorComboBox!.textContent = "1";
            ePFirstCoordinateXTextField.textContent = "24";
            ePFirstCoordinateYTextField.textContent = "25";
            ePLastCoordinateXTextField.textContent = "26";
            ePLastCoordinateYTextField.textContent = "27";

            // click on the submit button
            const submitButton = getByText('Submit');
            fireEvent.click(submitButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
            });
        });

        it('Filter Passage', async () => {
            const {getByText, getAllByText, getByTitle} = render(<PassagePage/>);

            const filterButton = getByTitle('Filter Menu');
            fireEvent.click(filterButton);

            await waitFor(() => {
                expect(getByText('Filter Passages')).toBeInTheDocument();
                expect(getByText('Between Buildings')).toBeInTheDocument();
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
            const {getByText, getByLabelText, getAllByPlaceholderText, getAllByLabelText} = render(<PassagePage/>);

            // Wait for the table to build the header
            expect(getByText('Create a Passage')).toBeInTheDocument();

            // Check if the form is rendered
            expect(getAllByLabelText('Building')[0]).toBeInTheDocument();
            expect(getAllByLabelText('Building')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate X')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate Y')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate X')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate Y')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate X')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate Y')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate X')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate Y')[1]).toBeInTheDocument();
            const button = getByText('Create Passage');
            expect(button).toBeInTheDocument();

            fireEvent.click(button);

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

        beforeEach(() => {
            // Create a spy for the usePost hook
            const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
            const useGetPassagesSpy = jest.spyOn(useApiRequest, 'useDataGet');
            // Simulate the usePost hook
            usePostSpy.mockReturnValue({
                sendData: sendData(),
                loading: false,
            });
            // Simulate the useGet hook
            useGetPassagesSpy.mockReturnValue({
                data: undefined,
                error: error,
                loading: false,
                refreshData: refreshData,
            });
        });

        it('Render with table with no data', async () => {
            const {getByText, getAllByText, queryByText} = render(<PassagePage/>);

            // Wait for the table to build the header
            expect(queryByText('StartPointBuilding')).toBeNull();
            expect(queryByText('StartPointFloor')).toBeNull();
            expect(queryByText('EndPointBuilding')).toBeNull();
            expect(queryByText('EndPointFloor')).toBeNull();
            expect(queryByText('Action')).toBeNull();

            expect(getByText('Refresh')).toBeInTheDocument();
            expect(getByText('Page 0 of 0')).toBeInTheDocument();

            await waitFor(() => {
                passagesMock.map((passage) => {
                    expect(queryByText(passage.passageStartPoint.floor.building.buildingCode!)).toBeNull();
                    expect(queryByText(passage.passageStartPoint.floor.floorNumber)).toBeNull();
                    expect(queryByText(passage.passageEndPoint.floor.building.buildingCode!)).toBeNull();
                    expect(queryByText(passage.passageEndPoint.floor.floorNumber)).toBeNull();
                });
            });
        });

        it('Edit Passage', async () => {
            const {getAllByText, getByText, container , getAllByAltText} = render(<PassagePage/>);

            // Wait for the table to build the header
            const button = getAllByAltText('Image Not Found')[0];
            expect(button).toBeInTheDocument();

            // Open the Edit Modal
            fireEvent.click(button);

            // Wait for the modal to open
            const startPointBuildingComboBox = container.querySelector('#mui-component-select-startPointBuilding');
            const startPointfloorComboBox = container.querySelector('#mui-component-select-startPointFloor');
            const sPFirstCoordinateXTextField = getAllByText('Coordinate X*')[0];
            const sPFirstCoordinateYTextField = getAllByText('Coordinate Y*')[0];
            const sPLastCoordinateXTextField = getAllByText('Coordinate X*')[1];
            const sPLastCoordinateYTextField = getAllByText('Coordinate Y*')[1];
            const endPointBuildingComboBox = container.querySelector('#mui-component-select-endPointBuilding');
            const endPointfloorComboBox = container.querySelector('#mui-component-select-endPointFloor');
            const ePFirstCoordinateXTextField = getAllByText('Coordinate X*')[2];
            const ePFirstCoordinateYTextField = getAllByText('Coordinate Y*')[2];
            const ePLastCoordinateXTextField = getAllByText('Coordinate X*')[3];
            const ePLastCoordinateYTextField = getAllByText('Coordinate Y*')[3];

            startPointBuildingComboBox!.textContent = "SB";
            startPointfloorComboBox!.textContent = "0";
            sPFirstCoordinateXTextField.textContent = "20";
            sPFirstCoordinateYTextField.textContent = "21";
            sPLastCoordinateXTextField.textContent = "22";
            sPLastCoordinateYTextField.textContent = "23";
            endPointBuildingComboBox!.textContent = "EB";
            endPointfloorComboBox!.textContent = "1";
            ePFirstCoordinateXTextField.textContent = "24";
            ePFirstCoordinateYTextField.textContent = "25";
            ePLastCoordinateXTextField.textContent = "26";
            ePLastCoordinateYTextField.textContent = "27";

            // click on the submit button
            const submitButton = getByText('Submit');
            fireEvent.click(submitButton);

            // Wait for the modal to close
            await waitFor(() => {
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });
        });

        it('Filter Passage', async () => {
            const {queryByTitle} = render(<PassagePage/>);

            expect(queryByTitle('Filter Menu')).toBeNull();
        });

        it('Render with Create Form', async () => {
            const {getByText, getByLabelText, getAllByPlaceholderText, getAllByLabelText} = render(<PassagePage/>);

            // Wait for the table to build the header
            expect(getByText('Create a Passage')).toBeInTheDocument();

            // Check if the form is rendered
            expect(getAllByLabelText('Building')[0]).toBeInTheDocument();
            expect(getAllByLabelText('Building')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate X')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate Y')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate X')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter First Coordinate Y')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate X')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate Y')[0]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate X')[1]).toBeInTheDocument();
            expect(getAllByPlaceholderText('Enter Last Coordinate Y')[1]).toBeInTheDocument();
            const button = getByText('Create Passage');
            expect(button).toBeInTheDocument();

            fireEvent.click(button);

            await waitFor(() => {
                expect(sendData).toHaveBeenCalled();
                expect(refreshData).toHaveBeenCalled();
                expect(error).not.toBeNull();
            });
        });
    });
});
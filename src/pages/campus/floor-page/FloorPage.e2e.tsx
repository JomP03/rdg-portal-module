import {fireEvent, getAllByPlaceholderText, render, waitFor} from "@testing-library/react";
import FloorPage from "./FloorPage";
import {floorsMock} from "../../../mocks/floorsMock";


describe('Success', () => {

  describe('RoomPage', () => {
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
        data: floorsMock,
        error: undefined,
        loading: false,
        refreshData: refreshData,
      });
    });

    it('Render with table', async () => {
      const {getByText, getAllByText, getByTitle} = render(<FloorPage/>);

      // Wait for the table to build the header
      expect(getByText('Building Code')).toBeInTheDocument();
      expect(getAllByText('Floor Number')[0]).toBeInTheDocument();
      expect(getAllByText('Floor Description')[0]).toBeInTheDocument();
      expect(getAllByText('Floor Plan')[0]).toBeInTheDocument();
      expect(getByText('Action')).toBeInTheDocument();
      expect(getByTitle('Filter Menu')).toBeInTheDocument();

      expect(getByText('Refresh')).toBeInTheDocument();
      expect(getByText('Page 1 of 1')).toBeInTheDocument();

      await waitFor(() => {
        floorsMock.map((floor) => {
          expect(getByText(floor.floorNumber)).toBeInTheDocument();
          expect(getByText(floor.floorDescription!)).toBeInTheDocument();
          expect(getAllByText('no floor plan')[0]).toBeInTheDocument();
        });
      });
    });

    it('Edit Floor', async () => {
      const {getAllByAltText, getByText, getAllByPlaceholderText} = render(<FloorPage/>);

      const button = getAllByAltText('Image Not Found')[0];
      expect(button).toBeInTheDocument();

      // Open the Edit Modal
      fireEvent.click(button);

      // Wait for the modal to open
      const fileButton = getByText('Select a Floor Plan');
      expect(fileButton).toBeInTheDocument();
      const submitButton = getByText('Submit');
      expect(submitButton).toBeInTheDocument();

      // Check if the form is filled with the correct data
      expect(getByText('Edit the Floor')).toBeInTheDocument();
      expect(getAllByPlaceholderText('Enter a Floor Number')[0]).toBeInTheDocument();
      expect(getAllByPlaceholderText('Enter a Floor Description')[0]).toBeInTheDocument();

      // Click on the disable button
      fireEvent.click(submitButton);

      // Wait for the modal to close
      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
      });
    });

    it('Filter Floor', async () => {
      const {getByTitle, getByText, getAllByText} = render(<FloorPage/>);

      const filterButton = getByTitle('Filter Menu');
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(getByText('Filter Floors')).toBeInTheDocument();
        expect(getByText('Floors With Passage By Building')).toBeInTheDocument();
        expect(getByText('Floors With Elevator By Building')).toBeInTheDocument();
      });

      const button = getAllByText('Apply')[0];
      expect(button).toBeInTheDocument();

      // Click on the apply button
      fireEvent.click(button);

      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
      });
    });


    it('Render with Create Floor', async () => {
      const {getByText, getAllByPlaceholderText} = render(<FloorPage/>);

      // Form Title
      expect(getByText('Create a Floor')).toBeInTheDocument();

      // Check if the form is rendered
      expect(getAllByPlaceholderText('Enter a Floor Number')[0]).toBeInTheDocument();
      expect(getAllByPlaceholderText('Enter a Floor Description')[0]).toBeInTheDocument();

      const createButton = getByText('Create a Floor');
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(sendData).toHaveBeenCalled();
        expect(refreshData).toHaveBeenCalled();
      });
    });
  });
});
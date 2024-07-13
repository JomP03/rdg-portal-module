import {render, waitFor, fireEvent} from '@testing-library/react';
import RoomPage from "./RoomPage";
import {roomsMock} from "../../../../mocks/roomsMock";


describe('RoomPage', () => {

  describe('Successful', () => {
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../hooks/useApiRequest');

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
        data: roomsMock,
        error: undefined,
        loading: false,
        refreshData: refreshData,
      });
    });

    it('Render with table', async () => {

      const {getByText, getAllByText} = render(<RoomPage/>);

      // Wait for the table to build the header
      expect(getAllByText('Name')[0]).toBeInTheDocument();
      expect(getAllByText('Category')[0]).toBeInTheDocument();
      expect(getAllByText('Building')[0]).toBeInTheDocument();
      expect(getAllByText('Floor')[0]).toBeInTheDocument();
      expect(getAllByText('Description')[0]).toBeInTheDocument();
      expect(getByText('InitialX')).toBeInTheDocument();
      expect(getByText('InitialY')).toBeInTheDocument();
      expect(getByText('FinalX')).toBeInTheDocument();
      expect(getByText('FinalY')).toBeInTheDocument();
      expect(getByText('DoorX')).toBeInTheDocument();
      expect(getByText('DoorY')).toBeInTheDocument();
      expect(getAllByText('Door Orientation')[0]).toBeInTheDocument();

      expect(getByText('Refresh')).toBeInTheDocument();
      expect(getByText('Page 1 of 1')).toBeInTheDocument();

      await waitFor(() => {
        roomsMock.map(room => {
          expect(getByText(room.name)).toBeInTheDocument();
          expect(getByText(room.category)).toBeInTheDocument();
          expect(getByText(room.floor.building.buildingCode!)).toBeInTheDocument();
          expect(getAllByText(room.floor.floorNumber!)[0]).toBeInTheDocument();
          expect(getByText(room.description)).toBeInTheDocument();
          expect(getAllByText(room.dimensions.initialPosition.xPosition.toString())[0]).toBeInTheDocument();
          expect(getAllByText(room.dimensions.initialPosition.yPosition.toString())[0]).toBeInTheDocument();
          expect(getAllByText(room.dimensions.finalPosition.xPosition.toString())[0]).toBeInTheDocument();
          expect(getAllByText(room.dimensions.finalPosition.yPosition.toString())[0]).toBeInTheDocument();
          expect(getAllByText(room.doorPosition.xPosition.toString())[0]).toBeInTheDocument();
          expect(getAllByText(room.doorPosition.yPosition.toString())[0]).toBeInTheDocument();
          expect(getByText(room.doorOrientation)).toBeInTheDocument();
        });
      });
    });


    it('Render with Create Form', async () => {
      const {getByText, getAllByText, getByPlaceholderText} = render(<RoomPage/>);

      expect(getByText('Create a Room')).toBeInTheDocument();
      expect(getByText('Dimensions')).toBeInTheDocument();
      expect(getByText('Initial Coordinates')).toBeInTheDocument();
      expect(getByText('Final Coordinates')).toBeInTheDocument();
      expect(getByText('Door Position')).toBeInTheDocument();

      // Check if the form is rendered
      expect(getByText('Create a Room')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Name')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Description')).toBeInTheDocument();
      expect(getAllByText('X Coordinate*')[0]).toBeInTheDocument();
      expect(getAllByText('Y Coordinate*')[0]).toBeInTheDocument();
      const button = getByText('Create Room');

      fireEvent.click(button);

      // Check if sendDate is called
      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
        expect(sendData).toHaveBeenCalled();
      });
    });

  });


  describe('Error', () => {
    let error = {};
    const refreshData = jest.fn();
    const sendData = jest.fn();
    const useApiRequest = require('../../../../hooks/useApiRequest');

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

    it('Render with table', async () => {

      const {getByText, getAllByText, queryByText} = render(<RoomPage/>);

      // Wait for the table to build the header
      expect(getAllByText('Name*')[0]).toBeInTheDocument();
      expect(getAllByText('Category')[0]).toBeInTheDocument();
      expect(getAllByText('Building')[0]).toBeInTheDocument();
      expect(getAllByText('Floor')[0]).toBeInTheDocument();
      expect(getAllByText('Description*')[0]).toBeInTheDocument();
      expect(queryByText('InitialX*')).toBeNull();
      expect(queryByText('InitialY*')).toBeNull();
      expect(queryByText('FinalX*')).toBeNull();
      expect(queryByText('FinalY*')).toBeNull();
      expect(queryByText('DoorX*')).toBeNull();
      expect(queryByText('DoorY*')).toBeNull();

      expect(getByText('No Rooms available to display')).toBeInTheDocument();
      expect(getByText('Refresh')).toBeInTheDocument();
      expect(getByText('Page 0 of 0')).toBeInTheDocument();

      // No data to render
      await waitFor(() => {
        roomsMock.map(room => {
          expect(queryByText(room.name)).toBeNull();
          expect(queryByText(room.category)).toBeNull();
          expect(queryByText(room.floor.building.buildingCode!)).toBeNull();
          expect(queryByText(room.floor.floorNumber!)).toBeNull();
          expect(queryByText(room.description)).toBeNull();
          expect(queryByText(room.dimensions.initialPosition.xPosition.toString())).toBeNull();
          expect(queryByText(room.dimensions.initialPosition.yPosition.toString())).toBeNull();
          expect(queryByText(room.dimensions.finalPosition.xPosition.toString())).toBeNull();
          expect(queryByText(room.dimensions.finalPosition.yPosition.toString())).toBeNull();
          expect(queryByText(room.doorPosition.xPosition.toString())).toBeNull();
          expect(queryByText(room.doorPosition.yPosition.toString())).toBeNull();
          expect(queryByText(room.doorOrientation)).toBeNull();
        });
      });
      expect(error).not.toBeNull();
    });


    it('Render with Create Form - Error', async () => {
      const {getByText, getAllByText, getByPlaceholderText} = render(<RoomPage/>);

      expect(getByText('Create a Room')).toBeInTheDocument();
      expect(getByText('Dimensions')).toBeInTheDocument();
      expect(getByText('Initial Coordinates')).toBeInTheDocument();
      expect(getByText('Final Coordinates')).toBeInTheDocument();
      expect(getByText('Door Position')).toBeInTheDocument();

      // Check if the form is rendered
      expect(getByText('Create a Room')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Name')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Description')).toBeInTheDocument();
      expect(getAllByText('X Coordinate*')[0]).toBeInTheDocument();
      expect(getAllByText('Y Coordinate*')[0]).toBeInTheDocument();
      const button = getByText('Create Room');

      fireEvent.click(button);

      // Check if sendDate is called
      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
        expect(sendData).toHaveBeenCalled();
        expect(error).not.toBeNull();
      });
    });
  });
});


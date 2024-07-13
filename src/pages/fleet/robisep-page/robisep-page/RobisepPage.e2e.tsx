import RobisepPage from "./RobisepPage";
import {fireEvent, getByPlaceholderText, render, waitFor} from "@testing-library/react";
import {robisepsMock} from "../../../../mocks/robisepsMock";


describe('RobisepPage', () => {

  describe('Sucessful', () => {
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
        data: robisepsMock,
        error: undefined,
        loading: false,
        refreshData: refreshData,
      });
    });

    it('Render with table', async () => {

      const {getByText, getAllByText} = render(<RobisepPage/>);

      // Wait for the table to build the header
      expect(getAllByText('Nickname')[0]).toBeInTheDocument();
      expect(getAllByText('Serial Number')[0]).toBeInTheDocument();
      expect(getAllByText('Code')[0]).toBeInTheDocument();
      expect(getAllByText('Descripton')[0]).toBeInTheDocument();
      expect(getAllByText('State')[0]).toBeInTheDocument();
      expect(getAllByText('Robisep Type')[0]).toBeInTheDocument();
      expect(getAllByText('Action')[0]).toBeInTheDocument();

      expect(getByText('Refresh')).toBeInTheDocument();
      expect(getByText('Page 1 of 1')).toBeInTheDocument();

      await waitFor(() => {
        robisepsMock.map((robisep) => {
          expect(getAllByText(robisep.nickname)[0]).toBeInTheDocument();
          expect(getAllByText(robisep.serialNumber)[0]).toBeInTheDocument();
          expect(getAllByText(robisep.code)[0]).toBeInTheDocument();
          expect(getAllByText(robisep.description!)[0]).toBeInTheDocument();
          expect(getAllByText(robisep.state)[0]).toBeInTheDocument();
          expect(getAllByText(robisep.robisepType.designation)[0]).toBeInTheDocument();
        });
      });
    });


    it('Edit Robisep', async () => {

      const {getAllByAltText, getByText} = render(<RobisepPage/>);

      // Wait for the table to build the header

      const button = getAllByAltText('Image Not Found')[0];
      expect(button).toBeInTheDocument();

      // Open the Edit Modal
      fireEvent.click(button);

      // Wait for the modal to open
      const disableButton = getByText('Disable Robisep');
      expect(disableButton).toBeInTheDocument();

      // Click on the disable button
      fireEvent.click(disableButton);

      // Wait for the modal to close
      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
      });
    });


    it('Filter Robisep', async () => {

      const {getByText, getByTitle, getAllByText} = render(<RobisepPage/>);

      const filterButton = getByTitle('Filter Menu');
      fireEvent.click(filterButton);

      await waitFor(() => {
        expect(getByText('Filter Robiseps')).toBeInTheDocument();
        expect(getByText('By Nickname')).toBeInTheDocument();
        expect(getByText('By Task Type')).toBeInTheDocument();
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

      const {getByText, getByPlaceholderText} = render(<RobisepPage/>);

      // Wait for the table to build the header
      expect(getByText('Create a Robisep')).toBeInTheDocument();

      // Check if the form is rendered
      expect(getByPlaceholderText('Enter Nickname')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Serial Number')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Code')).toBeInTheDocument();
      const button = getByText('Create Robisep');
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

    it('Render with table with no data', async () => {

      const {getByText, getAllByText, queryByText} = render(<RobisepPage/>);

      // Wait for the table to build the header
      expect(getAllByText('Nickname*')[0]).toBeInTheDocument();
      expect(getAllByText('Serial Number*')[0]).toBeInTheDocument();
      expect(getAllByText('Code*')[0]).toBeInTheDocument();
      expect(getAllByText('Description')[0]).toBeInTheDocument();
      expect(queryByText('State')).toBeNull();
      expect(queryByText('Robisep Type')).toBeNull();
      expect(queryByText('Action')).toBeNull();

      expect(getByText('Refresh')).toBeInTheDocument();
      expect(getByText('Page 0 of 0')).toBeInTheDocument();

      await waitFor(() => {
        robisepsMock.map((robisep) => {
          expect(queryByText(robisep.nickname)).toBeNull();
          expect(queryByText(robisep.serialNumber)).toBeNull();
          expect(queryByText(robisep.code)).toBeNull();
          expect(queryByText(robisep.description!)).toBeNull();
          expect(queryByText(robisep.state)).toBeNull();
          expect(queryByText(robisep.robisepType.designation)).toBeNull();
        });
      });
    });


    it('Edit Robisep', async () => {

      const {getAllByAltText, getByText} = render(<RobisepPage/>);

      // Wait for the table to build the header

      const button = getAllByAltText('Image Not Found')[0];
      expect(button).toBeInTheDocument();

      // Open the Edit Modal
      fireEvent.click(button);

      // Wait for the modal to open
      const disableButton = getByText('Disable Robisep');
      expect(disableButton).toBeInTheDocument();

      // Click on the disable button
      fireEvent.click(disableButton);

      // Wait for the modal to close
      await waitFor(() => {
        expect(refreshData).toHaveBeenCalled();
        expect(error).not.toBeNull();
      });
    });


    it('Render with Create Form', async () => {

      const {getByText, getByPlaceholderText} = render(<RobisepPage/>);

      // Wait for the table to build the header
      expect(getByText('Create a Robisep')).toBeInTheDocument();

      // Check if the form is rendered
      expect(getByPlaceholderText('Enter Nickname')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Serial Number')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter Code')).toBeInTheDocument();
      const button = getByText('Create Robisep');
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
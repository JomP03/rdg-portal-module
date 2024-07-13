
import {robisepTypesMock} from "../../../../mocks/robisepTypesMock";
import {fireEvent, render, waitFor} from "@testing-library/react";
import RobisepTypePage from "./RobisepTypePage";


describe('RobisepType', () => {

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
      data: robisepTypesMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  it('Render with table', async () => {

      const {getByText, getAllByText} = render(<RobisepTypePage/>);

      // Wait for the table to build the header
      expect(getAllByText('Designation')[0]).toBeInTheDocument();
      expect(getAllByText('Brand')[0]).toBeInTheDocument();
      expect(getAllByText('Model')[0]).toBeInTheDocument();
      expect(getAllByText('Task Types')[0]).toBeInTheDocument();

    expect(getByText('Refresh')).toBeInTheDocument();
    expect(getByText('Page 1 of 1')).toBeInTheDocument();

    await waitFor(() => {
      robisepTypesMock.map((robisepType) => {
        expect(getByText(robisepType.designation)).toBeInTheDocument();
        expect(getByText(robisepType.brand)).toBeInTheDocument();
        expect(getByText(robisepType.model)).toBeInTheDocument();
        const taskTypes = "PICKUP AND DELIVERY, SURVEILLANCE";
        expect(getAllByText(taskTypes)[0]).toBeInTheDocument();
      });
    });
  });


  it('Render with Create Form', async () => {
    const {getByText, getByLabelText} = render(<RobisepTypePage/>);

    expect(getByText('Create a Robisep Type')).toBeInTheDocument();

    // Check if the form is rendered
    expect(getByLabelText('Designation*')).toBeInTheDocument();
    expect(getByLabelText('Brand*')).toBeInTheDocument();
    expect(getByLabelText('Model*')).toBeInTheDocument();
    const button = getByText('Create Robisep Type');

    fireEvent.click(button);

    await waitFor(() => {
      expect(refreshData).toHaveBeenCalled();
      expect(sendData).toHaveBeenCalled();
    });
  });
});
import {fireEvent, render} from "@testing-library/react";
import {floorsMock} from "../../../../../mocks/floorsMock";
import CreateFloorForm from "./CreateFloorForm";


describe('CreateFloorForm', () => {

  const refreshData = jest.fn();
  const sendData = jest.fn();
  const useApiRequest = require('../../../../../hooks/useApiRequest');

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

  it('Basic render', () => {
    const {getByText, getByPlaceholderText} = render(<CreateFloorForm refreshData={refreshData}/>);

    // Check if the form is rendered
    expect(getByPlaceholderText('Enter a Floor Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter a Floor Description')).toBeInTheDocument();

    // Check if the buttons are rendered
    const button = getByText('Create Floor');
    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);

    // Check if the button is enabled
    expect(button).toBeEnabled();
  });

});
import CreateRobisepForm from "./CreateRobisepForm";
import {fireEvent, getByPlaceholderText, render} from "@testing-library/react";
import {robisepsMock} from "../../../../../mocks/robisepsMock";


describe('CreateRobisepForm', () => {

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
      data: robisepsMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  it('Basic render', () => {
    const {getByText, getByPlaceholderText} = render(<CreateRobisepForm refreshData={refreshData}/>);

    // Check if the form is rendered
    expect(getByPlaceholderText('Enter Nickname')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Serial Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Code')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Description')).toBeInTheDocument();

    // Check if the buttons are rendered
    const button = getByText('Create Robisep');
    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);

    // Check if the button is enabled
    expect(button).toBeEnabled();
  });

});
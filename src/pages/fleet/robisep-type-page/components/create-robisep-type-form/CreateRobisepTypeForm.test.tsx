import CreateRobisepTypeForm from "./CreateRobisepTypeForm";
import {fireEvent, render} from "@testing-library/react";
import {robisepTypesMock} from "../../../../../mocks/robisepTypesMock";
import CreateRoomForm from "../../../../campus/room-page/components/create-room-form/CreateRoomForm";


describe('CreateRobisepTypeForm', () => {


  const refreshData = jest.fn();
  const sendData = jest.fn();
  const useApiRequest = require('../../../../../hooks/useApiRequest');

  beforeEach(() => {
    // Create a spy for the usePost hook
    const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
    const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
    // Simulate the usePost hook
    usePostSpy.mockReturnValue({
      sendData: sendData,  // Simule a função sendData
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

  test('Check that the fields are being rendered correctly', () => {

    const {getByText, getAllByRole, getByLabelText, container} = render(
      <CreateRobisepTypeForm
        refreshData={refreshData}
      />
    );

    const taskTypeComboBox = container.querySelector('#mui-component-select-tasksType');

    // Test if the fields are being rendered correctly
    const textField = getAllByRole('textbox');
    expect(textField.length).toBe(3);
    const comboBox = getAllByRole('combobox');
    expect(comboBox.length).toBe(1);
    expect(comboBox[0]).toBe(taskTypeComboBox);
    expect(getByLabelText('Designation*')).toBeInTheDocument();
    expect(getByLabelText('Brand*')).toBeInTheDocument();
    expect(getByLabelText('Model*')).toBeInTheDocument();
    expect(getByLabelText('Task Types')).toBeInTheDocument();
    expect(getByText('Create Robisep Type')).toBeInTheDocument();
  });


  test('Check that formButton works correctly', async () => {
    const {getByText} = render(
      <CreateRobisepTypeForm
        refreshData={refreshData}
      />
    );
    const formButton = getByText('Create Robisep Type');
    expect(formButton).toBeInTheDocument();
    fireEvent.click(formButton);

    expect(formButton).toBeEnabled();
  });

  test('Check that refreshData is automatically called', () => {

    render(
      <CreateRoomForm
        refreshData={refreshData}
      />
    );

    // Check if refreshData has been called
    expect(refreshData).toHaveBeenCalledTimes(1);

  });
});
import {render, fireEvent, getByText} from '@testing-library/react';
import CreateRoomForm from './CreateRoomForm';
import {buildingsMock} from "../../../../../mocks/buildingsMock";
import {floorsMock} from "../../../../../mocks/floorsMock";

describe('CreateRoomForm', () => {


  const refreshData = jest.fn();
  const sendData = jest.fn();
  const useApiRequest = require('../../../../../hooks/useApiRequest');

  beforeEach(() => {
    // Create a spy for the usePost hook
    const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
    const useGetBuildingSpy = jest.spyOn(useApiRequest, 'useDataGet');
    const useGetFloorSpy = jest.spyOn(useApiRequest, 'useDataGet');
    // Simulate the usePost hook
    usePostSpy.mockReturnValue({
      sendData: sendData,  // Simule a função sendData
      loading: false,
    });
    // Simulate the useGet hook
    useGetBuildingSpy.mockReturnValue({
      data: buildingsMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
    useGetFloorSpy.mockReturnValue({
      data: floorsMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  test('Check that the fields are being rendered correctly', () => {

    const {getByText, getAllByRole, getByLabelText, container} = render(
      <CreateRoomForm
        refreshData={refreshData}
      />
    );

    const categoryComboBox = container.querySelector('#mui-component-select-category');
    const buildingComboBox = container.querySelector('#mui-component-select-building');
    const floorComboBox = container.querySelector('#mui-component-select-floor');
    const doorOrientationComboBox = container.querySelector('#mui-component-select-doorOrientation');

    // Test if the fields are being rendered correctly
    const textField = getAllByRole('textbox');
    expect(textField.length).toBe(8);
    const comboBox = getAllByRole('combobox');
    expect(comboBox.length).toBe(4);
    expect(comboBox[0]).toBe(categoryComboBox);
    expect(comboBox[1]).toBe(buildingComboBox);
    expect(comboBox[2]).toBe(floorComboBox);
    expect(comboBox[3]).toBe(doorOrientationComboBox);
    expect(getByLabelText('Name*')).toBeInTheDocument();
    expect(categoryComboBox).toBeInTheDocument();
    expect(buildingComboBox).toBeInTheDocument();
    expect(floorComboBox).toBeInTheDocument();
    expect(getByLabelText('Description*')).toBeInTheDocument();
    expect(getByLabelText('X Coordinate*')).toBeInTheDocument();
    expect(getByLabelText('Y Coordinate*')).toBeInTheDocument();
    expect(doorOrientationComboBox).toBeInTheDocument();
    expect(getByText('Create Room')).toBeInTheDocument();
  });


  test('Check that formButton works', () => {

    const {getByText, getByLabelText, container} = render(
      <CreateRoomForm
        refreshData={refreshData}
      />
    );

    const categoryComboBox = container.querySelector('#mui-component-select-category');
    const buildingComboBox = container.querySelector('#mui-component-select-building');
    const floorComboBox = container.querySelector('#mui-component-select-floor');
    const doorOrientationComboBox = container.querySelector('#mui-component-select-doorOrientation');

    const name = getByLabelText('Name*');
    const description = getByLabelText('Description*');
    const xCoordinate = getByLabelText('X Coordinate*');
    const yCoordinate = getByLabelText('Y Coordinate*');
    const createRoomButton = getByText('Create Room');

    // Simulate the user entering the fields
    fireEvent.input(name, {target: {value: 'Test Name'}});
    expect(name).toHaveValue('Test Name');
    fireEvent.input(description, {target: {value: 'Test Description'}});
    expect(description).toHaveValue('Test Description');
    fireEvent.input(xCoordinate, {target: {value: 'Test X Coordinate'}});
    expect(xCoordinate).toHaveValue('Test X Coordinate');
    fireEvent.input(yCoordinate, {target: {value: 'Test Y Coordinate'}});
    expect(yCoordinate).toHaveValue('Test Y Coordinate');

    categoryComboBox!.textContent = 'Test Category';
    buildingComboBox!.textContent = 'Test Building';
    floorComboBox!.textContent = 'Test Floor';
    doorOrientationComboBox!.textContent = 'Test Door Orientation';

    // Check if the fields have been entered correctly
    expect(categoryComboBox!.textContent).toBe('Test Category');
    expect(buildingComboBox!.textContent).toBe('Test Building');
    expect(floorComboBox!.textContent).toBe('Test Floor');
    expect(doorOrientationComboBox!.textContent).toBe('Test Door Orientation');

    // Simulate the user clicking the button
    fireEvent.click(createRoomButton);

    // Check if button has been clicked
    expect(createRoomButton).toBeEnabled();

  });

  test('Check that building refreshData is automatically called', () => {

      render(
        <CreateRoomForm
          refreshData={refreshData}
        />
      );

      // Check if refreshData has been called
      expect(refreshData).toHaveBeenCalledTimes(1);

  });
});


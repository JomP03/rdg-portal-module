import {render, fireEvent} from '@testing-library/react';
import RoomForm from "./RoomForm";

describe('RoomForm', () => {

  // Basic page rendering
  test('RoomForm works correctly', () => {
    const handleChangeTextField = jest.fn();
    const handleChangeSelect = jest.fn();

    const { getAllByRole, getByLabelText, container } = render(
      <RoomForm
        nameValue=""
        categoryValue=""
        buildingValue=""
        floorValue=""
        floorComboBox={false}
        descriptionValue=""
        initialXValue=""
        initialYValue=""
        finalXValue=""
        finalYValue=""
        doorXValue=""
        doorYValue=""
        doorOrientationValue=""
        buildingsData={[]}
        floorsData={[]}
        handleChangeTextField={handleChangeTextField}
        handleChangeSelect={handleChangeSelect}
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
  });

  test('RoomForm inputs change', () => {
    const handleChangeTextField = jest.fn();
    const handleChangeSelect = jest.fn();

    const { getByLabelText } = render(
      <RoomForm
        nameValue=""
        categoryValue=""
        buildingValue=""
        floorValue=""
        floorComboBox={true}
        descriptionValue=""
        initialXValue=""
        initialYValue=""
        finalXValue=""

        finalYValue=""
        doorXValue=""
        doorYValue=""

        doorOrientationValue=""
        buildingsData={[]}
        floorsData={[]}
        handleChangeTextField={handleChangeTextField}
        handleChangeSelect={handleChangeSelect}
      />
    );



    // Test if the fields are being rendered correctly
    fireEvent.change(getByLabelText('Name*'), { target: { value: 'Test Name' } });
    expect(handleChangeTextField).toHaveBeenCalled();

    fireEvent.change(getByLabelText('Description*'), { target: { value: 'Test Description' } });
    expect(handleChangeTextField).toHaveBeenCalled();

    fireEvent.change(getByLabelText('X Coordinate*'), { target: { value: 'Test X Coordinate' } });
    expect(handleChangeTextField).toHaveBeenCalled();

    fireEvent.change(getByLabelText('Y Coordinate*'), { target: { value: 'Test Y Coordinate' } });
    expect(handleChangeTextField).toHaveBeenCalled();

  });


  test('RoomForm works correctly', () => {
    const handleChangeTextField = jest.fn();
    const handleChangeSelect = jest.fn();

    const { container } = render(
      <RoomForm
        nameValue=""
        categoryValue='Office'
        buildingValue=""
        floorValue=""
        floorComboBox={false}
        descriptionValue=""
        initialXValue=""
        initialYValue=""
        finalXValue=""
        finalYValue=""
        doorXValue=""
        doorYValue=""
        doorOrientationValue=""
        buildingsData={[]}
        floorsData={[]}
        handleChangeTextField={handleChangeTextField}
        handleChangeSelect={handleChangeSelect}
      />
    );

    const categoryComboBox = container.querySelector('#mui-component-select-category');
    const buildingComboBox = container.querySelector('#mui-component-select-building');
    const floorComboBox = container.querySelector('#mui-component-select-floor');
    const doorOrientationComboBox = container.querySelector('#mui-component-select-doorOrientation');

    // Check if the value of category
    categoryComboBox!.textContent = 'OFFICE';
    expect(categoryComboBox!.textContent).toBe('OFFICE');

    // Check if the value of building
    buildingComboBox!.textContent = 'x';
    expect(buildingComboBox!.textContent).toBe('x');

    // Check if the value of floor
    floorComboBox!.textContent = 'x';
    expect(floorComboBox!.textContent).toBe('x');

    // Check if the value of doorOrientation
    doorOrientationComboBox!.textContent = 'x';
    expect(doorOrientationComboBox!.textContent).toBe('x');
  });

});
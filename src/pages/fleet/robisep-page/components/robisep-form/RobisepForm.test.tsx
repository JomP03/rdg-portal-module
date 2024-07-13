import {fireEvent, render} from "@testing-library/react";
import RobisepForm from "./RobisepForm";


describe('RobisepForm', () => {

  const handleChangeTextField = jest.fn();
  const handleChangeSelect = jest.fn();
  const robisepTypeData = [{value: 'test', id: '1'}];
  const buildingData = [{value: 'test', id: '1'}];
  const floorData = [{value: 'test', id: '1'}];
  const roomData = [{value: 'test', id: '1'}];

  it('Basic render', () => {
    const {getByPlaceholderText} = render(<RobisepForm
      nicknameValue={''}
      serialNumber={''}
      codeValue={''}
      descriptonValue={''}
      robisepTypeValue={''}
      robisepTypeData={robisepTypeData}
      buildingData={buildingData}
      buildingValue={''}
      floorData={floorData}
      floorValue={''}
      roomData={roomData}
      roomValue={''}
      handleChangeTextField={handleChangeTextField}
      handleChangeSelect={handleChangeSelect}
    />);

    // Check if the form is rendered
    expect(getByPlaceholderText('Enter Nickname')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Serial Number')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Code')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter Description')).toBeInTheDocument();
  });

  it('Check that the values on textField change', async () => {
    const {getByPlaceholderText} = render(<RobisepForm
      nicknameValue={''}
      serialNumber={''}
      codeValue={''}
      descriptonValue={''}
      robisepTypeValue={''}
      robisepTypeData={robisepTypeData}
      buildingData={buildingData}
      buildingValue={''}
      floorData={floorData}
      floorValue={''}
      roomData={roomData}
      roomValue={''}
      handleChangeTextField={handleChangeTextField}
      handleChangeSelect={handleChangeSelect}
    />);
    const nickname = getByPlaceholderText('Enter Nickname');
    const serialNumber = getByPlaceholderText('Enter Serial Number');
    const code = getByPlaceholderText('Enter Code');
    const description = getByPlaceholderText('Enter Description');

    // Change the values
    fireEvent.change(nickname, {target: {value: 'test'}});
    fireEvent.change(serialNumber, {target: {value: 'test'}});
    fireEvent.change(code, {target: {value: 'test'}});
    fireEvent.change(description, {target: {value: 'test'}});
    expect(handleChangeTextField).toBeCalledTimes(4);
  });

});
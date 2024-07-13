

import { render, fireEvent } from '@testing-library/react';
import FloorForm from './FloorForm'; // Ajuste o caminho de importação conforme necessário

test('renders the TaskForm and checks the input fields and ComboBox', () => {
  const mockHandleChangeTextField = jest.fn();
  const mockHandleChangeSelect = jest.fn();
  const mockHandleUploadFile = jest.fn();

  const buildingData = [{ value: 'Building 1', id: '1' }, { value: 'Building 2', id: '2' }];
  const buildingValue = 'Building 1';
  const floorNumberValue = '1';
  const floorDescriptionValue = 'First Floor';
  const floorPlanValue = 'floorPlan.json';

  const { getByLabelText, getByPlaceholderText } = render(
    <FloorForm
      buildingData={buildingData}
      buildingValue={buildingValue}
      floorNumberValue={floorNumberValue}
      floorDescriptionValue={floorDescriptionValue}
      floorPlanValue={floorPlanValue}
      handleChangeTextField={mockHandleChangeTextField}
      handleChangeSelect={mockHandleChangeSelect}
      handleUploadFile={mockHandleUploadFile}
      disabledFields={{ building: false }}
      editMode={true}
    />
  );

  // Verifica se os campos de texto são renderizados com os valores corretos
  const floorNumberInput = getByPlaceholderText('Enter a Floor Number')as HTMLInputElement;
  expect(floorNumberInput.value).toBe(floorNumberValue);

  const floorDescriptionInput = getByPlaceholderText('Enter a Floor Description') as HTMLInputElement;
  expect(floorDescriptionInput.value).toBe(floorDescriptionValue);

  // Verifica se o ComboBox é renderizado com o valor correto
  const comboBox = getByLabelText('Building') as HTMLInputElement;
  expect(comboBox).toBeInTheDocument();
  // Simula a seleção de um ficheiro
  const file = new File(['file content'], 'testFile.json', { type: 'application/json' });
  fireEvent.change(getByLabelText('Select a Floor Plan'), { target: { files: [file] } });

  // Verifica se a função handleUploadFile foi chamada com o ficheiro correto
  expect(mockHandleUploadFile).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ files: [file] }) }));
});

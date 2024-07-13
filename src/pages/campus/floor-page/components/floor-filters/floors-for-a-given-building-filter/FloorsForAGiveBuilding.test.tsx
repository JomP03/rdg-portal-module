import { render } from '@testing-library/react';
import FloorsForAGivenBuildingFilter from "./FloorsForAGivenBuildingFilter"; // Ajuste o caminho de importação conforme necessário

test('renders the component and checks the ComboBox', () => {
  const mockOnChange = jest.fn();
  const selectedBuildingData = [{value: 'Building 1', id:'id'}, {value: 'Building 1', id:'id'}];
  const selectedBuildingValue = 'Building 1';

  const { getByLabelText } = render(
    <FloorsForAGivenBuildingFilter
      selectedBuildingValue={selectedBuildingValue}
      selectedBuildingData={selectedBuildingData}
      handleChangeSelect={mockOnChange}
    />
  );

  // Verifica se o ComboBox é renderizado com o valor correto
  const comboBox = getByLabelText('Building') as HTMLInputElement;
  expect(comboBox).toBeInTheDocument();
});

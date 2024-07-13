import { render, fireEvent } from '@testing-library/react';
import UploadButton from './UploadButton'; // Ajuste o caminho de importação conforme necessário

test('renders UploadButton and checks label and file upload', () => {
  const mockOnChange = jest.fn();
  const { getByText, getByAltText, getByLabelText } = render(<UploadButton
    label="Test Label" onChange={mockOnChange}
  value={''} name={'upload'}/>);

  // Verifica se o rótulo é renderizado corretamente
  const labelElement = getByText('Test Label');
  expect(labelElement).toBeInTheDocument();

  // Verifica se a imagem é renderizada corretamente
  const imageElement = getByAltText('Upload');
  expect(imageElement).toBeInTheDocument();

  // Simula a seleção de um ficheiro
  const file = new File(['file content'], 'testFile.json', { type: 'application/json' });
  fireEvent.change(getByLabelText('Test Label'), { target: { files: [file] } });

  // Verifica se a função onChange foi chamada com o ficheiro correto
  expect(mockOnChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.objectContaining({ files: [file] }) }));
});

test('checks if the upload button is disabled', () => {
  const { getByLabelText } = render(<UploadButton
    label="Test Label" disabled={true} onChange={() => {}}
    value={''} name={''}/>);

  // Verifica se o botão de upload está desativado
  const inputElement = getByLabelText('Test Label');
  expect(inputElement).toBeDisabled();
});

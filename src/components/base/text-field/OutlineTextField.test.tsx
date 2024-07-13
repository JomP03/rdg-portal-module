import { render, fireEvent } from '@testing-library/react';
import OutlinedTextField from './OutlinedTextField';

test('check if a change in the input calls the onChange function', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = render(
        <OutlinedTextField
            label="Test Label"
            placeholder="Test Placeholder"
            disabled={false}
            color="primary"
            width="100%"
            value="Test Value"
            onChange={mockOnChange}
            name="testName"
        />
    );

    const input = getByRole('textbox');
    expect(input).toHaveValue('Test Value');

    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalled();
});

test('check if the label is rendered', () => {
    const { getByLabelText } = render(
        <OutlinedTextField
            label="Test Label"
            placeholder="Test Placeholder"
            disabled={false}
            color="primary"
            width="100%"
            value="Test Value"
            onChange={() => {}}
            name="testName"
        />
    );

    const textbox = getByLabelText('Test Label*');
    expect(textbox).toBeInTheDocument();
});

test('check if the placeholder is rendered', () => {
    const { getByPlaceholderText } = render(
        <OutlinedTextField
            label="Test Label"
            placeholder="Test Placeholder"
            disabled={false}
            color="primary"
            width="100%"
            value="Test Value"
            onChange={() => {}}
            name="testName"
        />
    );

    const textbox = getByPlaceholderText('Test Placeholder');
    expect(textbox).toBeInTheDocument();
});

test('check if the textbox is disabled', () => {
    const { getByRole } = render(
        <OutlinedTextField
            label="Test Label"
            placeholder="Test Placeholder"
            disabled={true}
            color="primary"
            width="100%"
            value="Test Value"
            onChange={() => {}}
            name="testName"
        />
    );

    const textbox = getByRole('textbox');
    expect(textbox).toBeDisabled();
});

test('check if the textbox is enabled', () => {
    const { getByRole } = render(
        <OutlinedTextField
            label="Test Label"
            placeholder="Test Placeholder"
            disabled={false}
            color="primary"
            width="100%"
            value="Test Value"
            onChange={() => {}}
            name="testName"
        />
    );

    const textbox = getByRole('textbox');
    expect(textbox).toBeEnabled();
});

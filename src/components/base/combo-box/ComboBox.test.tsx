import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ComboBox from './ComboBox';

const mockData = [
    {value: 'Option 1', id: '1'},
    {value: 'Option 2', id: '2'},
    {value: 'Option 3', id: '3'},
];

test('renders ComboBox with default value', () => {
    const onChangeMock = jest.fn();

    render(
        <ComboBox
            data={mockData}
            label="Test Label"
            name="test-select"
            value="Option 1"
            onChange={onChangeMock}
        />
    );

    const selectedOption = screen.getByText('Option 1');
    expect(selectedOption).toBeInTheDocument();
});

test('displays the correct label', () => {
    render(
        <ComboBox
            data={mockData}
            label="Test Label"
            name="test-select"
            value=""
            onChange={() => {
            }}
        />
    );

    const label = screen.getByLabelText(/Test Label/i);
    expect(label).toBeInTheDocument();
});

test('calls onChange function with the selected option', () => {
    const onChangeMock = jest.fn();

    render(
        <ComboBox
            data={mockData}
            label="Test Label"
            name="test-select"
            value=""
            onChange={onChangeMock}
        />
    );

    const comboBox = screen.getByLabelText(/Test Label/i);

    // Open the dropdown
    fireEvent.mouseDown(comboBox);

    // Click on an option
    fireEvent.click(screen.getByText('Option 2'));

    // Ensure that the onChange function is called when an option is selected
    expect(onChangeMock).toBeCalled();
});



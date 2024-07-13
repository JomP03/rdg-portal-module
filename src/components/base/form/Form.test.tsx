import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

jest.mock('../../form-button/FormButton', () => jest.fn(({ onClick }) => <button onClick={onClick}>Submit</button>));

test('Unit Test: renders form and calls onSubmit when button is clicked', () => {
    const form = <div>Test Form</div>;
    const onSubmit = jest.fn();
    const { getByText } = render(
        <Form form={form} onSubmit={onSubmit} waitingForResponse={false} />
    );

    // Check if the form is rendered
    expect(getByText('Test Form')).toBeInTheDocument();

    // Simulate a click on the LoginButton
    fireEvent.click(getByText('Submit'));

    // Check if onSubmit was called
    expect(onSubmit).toHaveBeenCalled();
});


jest.unmock('../../form-button/FormButton');

test('Integration Test: renders form and calls onSubmit when button is clicked', () => {
    const form = <div>Test Form</div>;
    const onSubmit = jest.fn();
    const { getByText } = render(
        <Form form={form} onSubmit={onSubmit} waitingForResponse={false} />
    );

    // Check if the form is rendered
    expect(getByText('Test Form')).toBeInTheDocument();

    // Simulate a click on the LoginButton
    fireEvent.click(getByText('Submit'));

    // Check if onSubmit was called
    expect(onSubmit).toHaveBeenCalled();
});

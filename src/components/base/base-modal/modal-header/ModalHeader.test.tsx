import { fireEvent, render } from '@testing-library/react';
import ModalHeader from './ModalHeader';

// Unit test with mocks
jest.mock('../../title/Title', () => jest.fn(({ text }) => <div>{text}</div>));
jest.mock('../../image-button/ImageButton', () => jest.fn(({ onClick }) => <button onClick={onClick}>Close</button>));

test('Unit Test: renders title and calls onRequestClose when close button is clicked', () => {
    const onRequestClose = jest.fn();
    const title = 'Test Title';
    const { getByText, getByRole } = render(
        <ModalHeader title={title} onRequestClose={onRequestClose} />
    );

    // Check if the title is rendered
    expect(getByText(title)).toBeInTheDocument();

    // Simulate a click on the close button
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    // Check if onRequestClose was called
    expect(onRequestClose).toHaveBeenCalled();
});

// Integration test without mocks
jest.unmock('../../title/Title');
jest.unmock('../../image-button/ImageButton');

test('Integration Test: renders title and calls onRequestClose when close button is clicked', () => {
    const onRequestClose = jest.fn();
    const title = 'Test Title';
    const { getByText, getByRole } = render(
        <ModalHeader title={title} onRequestClose={onRequestClose} />
    );

    // Check if the title is rendered
    expect(getByText(title)).toBeInTheDocument();

    // Simulate a click on the close button
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    // Check if onRequestClose was called
    expect(onRequestClose).toHaveBeenCalled();
});

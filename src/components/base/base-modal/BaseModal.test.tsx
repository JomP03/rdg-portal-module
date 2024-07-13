import { render, fireEvent } from '@testing-library/react';
import BaseModal from './BaseModal';

jest.mock('./modal-header/ModalHeader', () => jest.fn(({ title, onRequestClose }) => <div onClick={onRequestClose}>{title}</div>));

test('Unit Test: renders title and content, and calls onRequestClose when overlay is clicked', () => {
    const onRequestClose = jest.fn();
    const title = 'Test Title';
    const content = 'Test Content';
    const { getByText, container } = render(
        <BaseModal isOpen={true} onRequestClose={onRequestClose} title={title} content={content} />
    );

    // Check if the title and content are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // Simulate a click on the overlay
    const overlay = container.firstChild;
    fireEvent.click(overlay!);

    // Check if onRequestClose was called
    expect(onRequestClose).toHaveBeenCalled();
});

jest.unmock('./modal-header/ModalHeader');

test('Integration Test: renders title and content, and calls onRequestClose when overlay is clicked', () => {
    const onRequestClose = jest.fn();
    const title = 'Test Title';
    const content = 'Test Content';
    const { getByText, container } = render(
        <BaseModal isOpen={true} onRequestClose={onRequestClose} title={title} content={content} />
    );

    // Check if the title and content are rendered
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();

    // Simulate a click on the overlay
    const overlay = container.firstChild;
    fireEvent.click(overlay!);

    // Check if onRequestClose was called
    expect(onRequestClose).toHaveBeenCalled();
});
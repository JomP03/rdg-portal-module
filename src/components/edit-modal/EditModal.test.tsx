import { render } from '@testing-library/react';
import EditModal from './EditModal';

test('renders modal and handles request close', () => {
    const onRequestCloseMock = jest.fn();
    const props = {
        id: 'test-modal',
        isOpen: true,
        onRequestClose: onRequestCloseMock,
        title: 'Test Modal',
        form: <div>Test Form</div>
    };
    const { getByText } = render(<EditModal {...props} />);

    // Check if the modal is rendered
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Test Form')).toBeInTheDocument();
});

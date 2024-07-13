import { render, fireEvent } from '@testing-library/react';
import DisplayLimitedContent from './DisplayLimitedContent';

test('renders content and handles show more/less clicks', () => {
    const props = {
        content: 'This is a test content. It is used for testing the DisplayLimitedContent component.',
        initialLimit: 10,
        maxLimit: 50,
        buttonColor: 'blue'
    };
    const { getByText, rerender } = render(<DisplayLimitedContent {...props} />);

    // Check if the truncated content is rendered
    expect(getByText(props.content.slice(0, props.initialLimit) + '(...)')).toBeInTheDocument();

    // Simulate a click on the "Show More" button
    const showMoreButton = getByText('Show More');
    fireEvent.click(showMoreButton);
    // Render the new state
    rerender(<DisplayLimitedContent {...props} />);
    // Check if the full content is rendered
    expect(getByText(props.content.slice(0, props.maxLimit))).toBeInTheDocument();

    // Simulate a click on the "Show Less" button
    const showLessButton = getByText('Show Less');
    fireEvent.click(showLessButton);
    // Render the new state
    rerender(<DisplayLimitedContent {...props} />);
    // Check if the truncated content is rendered again
    expect(getByText(props.content.slice(0, props.initialLimit) + '(...)')).toBeInTheDocument();
});

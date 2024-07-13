import React from 'react';
import { render } from '@testing-library/react';
import Span from './Span';

test('renders Span component with the provided text', () => {
    const text = 'Test Text';
    const { getByText } = render(<Span text={text} />);

    const spanElement = getByText(text);

    expect(spanElement).toBeInTheDocument();
});

test('applies the provided color style to the span', () => {
    const text = 'Test Text';
    const color = 'blue';
    const { getByText } = render(<Span text={text} color={color} />);

    const spanElement = getByText(text);

    expect(spanElement).toHaveStyle({ color });
});

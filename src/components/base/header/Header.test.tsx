import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders Header component with the provided text', () => {
    const text = 'Test Header';
    render(<Header text={text} />);

    const headerElement = screen.getByText(text);

    expect(headerElement).toBeInTheDocument();
});

test('applies the provided color to the Header component', () => {
    const text = 'Test Header';
    const color = 'red';
    render(<Header text={text} color={color} />);

    const headerElement = screen.getByText(text);

    expect(headerElement).toHaveStyle({ color: color });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ImageButton from './ImageButton';

test('renders ImageButton component with the provided image', () => {
    const imageUrl = 'test-image.jpg';
    render(<ImageButton imageUrl={imageUrl} onClick={() => {}} width="100px" height="50px" />);

    const imageElement = screen.getByAltText('Image Not Found');

    expect(imageElement).toHaveAttribute('src', imageUrl);
});

test('calls the onClick function when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<ImageButton imageUrl="test-image.jpg" onClick={onClickMock} width="100px" height="50px" />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
});

test('applies the provided width and height styles to the button', () => {
    const width = '100px';
    const height = '50px';
    render(<ImageButton imageUrl="test-image.jpg" onClick={() => {}} width={width} height={height} />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toHaveStyle({ width, height });
});

test('disables the button when disabled prop is true', () => {
    render(<ImageButton imageUrl="test-image.jpg" onClick={() => {}} width="100px" height="50px" disabled />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();
});

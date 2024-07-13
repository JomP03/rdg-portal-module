import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with label', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
        />
    );

    const button = screen.getByText(/Click me/i);

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ backgroundColor: '#ccc', color: '#000' });
});

test('calls onClick function when button is clicked', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('changes background color when mouse enters and leaves', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.mouseEnter(button);

    expect(button).toHaveStyle({ backgroundColor: '#ddd' });

    fireEvent.mouseLeave(button);

    expect(button).toHaveStyle({ backgroundColor: '#ccc' });
});

test('changes background color when mouse is pressed and released', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.mouseDown(button);

    expect(button).toHaveStyle({ backgroundColor: '#bbb' });

    fireEvent.mouseUp(button);

    expect(button).toHaveStyle({ backgroundColor: '#ddd' });
});

test('disables button when isDisabled is true', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
            isDisabled
        />
    );

    const button = screen.getByText(/Click me/i);

    expect(button).toBeDisabled();
});

test('does not call onClick function when button is clicked and isDisabled is true', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
            isDisabled
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(0);
});

test('does not change background color when mouse enters and leaves and isDisabled is true', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
            isDisabled
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.mouseEnter(button);

    expect(button).toHaveStyle({ backgroundColor: '#ccc' });

    fireEvent.mouseLeave(button);

    expect(button).toHaveStyle({ backgroundColor: '#ccc' });
});

test('does not change background color when mouse is pressed and released and isDisabled is true', () => {
    const onClickMock = jest.fn();

    render(
        <Button
            label="Click me"
            backgroundColor="#ccc"
            hoverColor="#ddd"
            activeColor="#bbb"
            textColor="#000"
            onClick={onClickMock}
            isDisabled
        />
    );

    const button = screen.getByText(/Click me/i);

    fireEvent.mouseDown(button);

    expect(button).toHaveStyle({ backgroundColor: '#ccc' });

    fireEvent.mouseUp(button);

    expect(button).toHaveStyle({ backgroundColor: '#ccc' });
});

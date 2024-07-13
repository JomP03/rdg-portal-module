import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Square from './Square';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('calls navigate function when clicked', () => {
    const text = 'Test Text';
    const path = '/test';
    const navigateMock = jest.fn();

    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const {container} = render(
        <Router>
            <Routes>
                <Route path="/test" element={<div>Test Page</div>}/>
                <Route path="/" element={<Square text={text} path={path} backgroundColor="red" hoverColor="blue"
                                                 activeColor="green" transformActive="scale(1.2)"/>}/>
            </Routes>
        </Router>
    );

    const squareElement = container.querySelector('.square');
    expect(squareElement).toBeInTheDocument();

    fireEvent.click(squareElement!);
    expect(navigateMock).toHaveBeenCalledWith(path);
});

test('changes background color when hovered', () => {
    const text = 'Test Text';
    const path = '/test';
    const backgroundColor = 'red';
    const hoverColor = 'blue';
    const activeColor = 'green';
    const transformActive = 'scale(1.2)';

    const { container } = render(
        <Square
            text={text} path={path} backgroundColor={backgroundColor}
            hoverColor={hoverColor} activeColor={activeColor} transformActive={transformActive}
        />
    );

    const squareElement = container.querySelector('.square');
    fireEvent.mouseEnter(squareElement!);
    expect(squareElement).toHaveStyle('background-color: blue');
});

test('changes background color when mouse leaves', () => {
    const text = 'Test Text';
    const path = '/test';
    const backgroundColor = 'red';
    const hoverColor = 'blue';
    const activeColor = 'green';
    const transformActive = 'scale(1.2)';

    const { container } = render(
        <Square
            text={text} path={path} backgroundColor={backgroundColor}
            hoverColor={hoverColor} activeColor={activeColor} transformActive={transformActive}
        />
    );

    const squareElement = container.querySelector('.square');
    fireEvent.mouseEnter(squareElement!);
    fireEvent.mouseLeave(squareElement!);
    expect(squareElement).toHaveStyle('background-color: red');
});

test('changes background color when mouse is pressed', () => {
    const text = 'Test Text';
    const path = '/test';
    const backgroundColor = 'red';
    const hoverColor = 'blue';
    const activeColor = 'green';
    const transformActive = 'scale(1.2)';

    const { container } = render(
        <Square
            text={text} path={path} backgroundColor={backgroundColor}
            hoverColor={hoverColor} activeColor={activeColor} transformActive={transformActive}
        />
    );

    const squareElement = container.querySelector('.square');
    fireEvent.mouseDown(squareElement!);
    expect(squareElement).toHaveStyle('background-color: green');
});

test('changes background color when mouse is released', () => {
    const text = 'Test Text';
    const path = '/test';
    const backgroundColor = 'red';
    const hoverColor = 'blue';
    const activeColor = 'green';
    const transformActive = 'scale(1.2)';

    const { container } = render(
        <Square
            text={text} path={path} backgroundColor={backgroundColor}
            hoverColor={hoverColor} activeColor={activeColor} transformActive={transformActive}
        />
    );

    const squareElement = container.querySelector('.square');
    fireEvent.mouseDown(squareElement!);
    fireEvent.mouseUp(squareElement!);
    expect(squareElement).toHaveStyle('background-color: blue');
});

test('changes transform when mouse is pressed', () => {
    const text = 'Test Text';
    const path = '/test';
    const backgroundColor = 'red';
    const hoverColor = 'blue';
    const activeColor = 'green';
    const transformActive = 'scale(1.2)';

    const { container } = render(
        <Square
            text={text} path={path} backgroundColor={backgroundColor}
            hoverColor={hoverColor} activeColor={activeColor} transformActive={transformActive}
        />
    );

    const squareElement = container.querySelector('.square');
    fireEvent.mouseDown(squareElement!);
    expect(squareElement).toHaveStyle('transform: scale(1.2)');
});

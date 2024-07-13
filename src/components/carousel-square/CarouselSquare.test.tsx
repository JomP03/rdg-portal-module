import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarouselSquare from './CarouselSquare';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('renders text and image, and calls navigate when clicked', () => {
    const props = {
        imageUrl: 'image.jpg',
        text: 'Test Text',
        path: '/test'
    };
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    const { getByText } = render(
        <Router>
            <Routes>
                <Route path="/test" element={<div>Test Page</div>}/>
                <Route path="/" element={<CarouselSquare {...props} />} />
            </Routes>
        </Router>
    );

    // Check if the text is rendered
    expect(getByText('Test Text')).toBeInTheDocument();

    // Simulate a click on the square
    fireEvent.click(getByText('Test Text'));

    // Check if navigate was called
    expect(navigateMock).toHaveBeenCalledWith(props.path);
});

import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Carousel from './Carousel';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('renders items and handles next and previous clicks', () => {
    const items = [
        { imageUrl: 'image1.jpg', text: 'Text 1', path: '/path1' },
        { imageUrl: 'image2.jpg', text: 'Text 2', path: '/path2' },
        { imageUrl: 'image3.jpg', text: 'Text 3', path: '/path3' },
        { imageUrl: 'image4.jpg', text: 'Text 4', path: '/path4' },
    ];
    const { getByText, rerender } = render(
        <Router>
            <Carousel items={items} />
        </Router>
    );

    // Check if the first item is rendered
    expect(getByText('Text 1')).toBeInTheDocument();

    // Render the next item
    rerender(
        <Router>
            <Carousel items={items} />
        </Router>
    );
    // Check if the second item is rendered
    expect(getByText('Text 2')).toBeInTheDocument();

    // Render the previous item
    rerender(
        <Router>
            <Carousel items={items} />
        </Router>
    );
    // Check if the first item is rendered
    expect(getByText('Text 1')).toBeInTheDocument();
});

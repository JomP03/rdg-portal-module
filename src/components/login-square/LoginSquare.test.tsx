import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginSquare from './LoginSquare';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

test('renders login square', () => {
    const props = {
        imageUrl: 'image.jpg',
        text: 'Test Text',
        path: '/test'
    };
    const { getByText } = render(
        <Router>
            <LoginSquare {...props} />
        </Router>
    );
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    // Check if the text is rendered
    expect(getByText('Test Text')).toBeInTheDocument();

    // Check if the image is rendered
    const image = document.querySelector('img');
    expect(image).toBeInTheDocument();
    // @ts-ignore
    expect(image.src).toContain('image.jpg');
});

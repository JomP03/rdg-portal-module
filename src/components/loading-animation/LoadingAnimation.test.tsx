import { render } from '@testing-library/react';
import LoadingAnimation from './LoadingAnimation';

test('renders loading animation', () => {
    const { getByAltText } = render(<LoadingAnimation />);

    // Check if the loading animation is rendered
    const loadingImage = getByAltText('Loading');
    expect(loadingImage).toBeInTheDocument();
});

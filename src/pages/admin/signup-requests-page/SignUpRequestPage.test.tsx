import {render} from "@testing-library/react";
import SignUpRequestPage from "./SignUpRequestPage";


describe('SignUpRequestPage', () => {
    test('renders signUp request page', () => {
        const { getByText, getByAltText } = render(<SignUpRequestPage/>);

        // Check if the page panel is rendered
        expect(getByText('Sign Up Requests')).toBeInTheDocument();
        expect(getByText('Manage Sign Up Requests')).toBeInTheDocument();
        expect(getByAltText('Image not found')).toBeInTheDocument();

        // Check if the title is rendered
        expect(getByText('All Requests')).toBeInTheDocument();
    });

    test('renders loading gif', () => {
        const { getAllByAltText } = render(<SignUpRequestPage/>);
        const loadingImages = getAllByAltText('Loading');

        loadingImages.forEach(image => {
            expect(image).toBeInTheDocument();
        });
    });
});


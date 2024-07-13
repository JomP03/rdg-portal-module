import {render} from "@testing-library/react";
import React from "react";
import PassagePage from "./PassagePage";
import {setAppElement} from "react-modal";

describe('PassagePage', () => {
    test('renders passage page', () => {
        const { getByText, getByAltText } = render(<PassagePage/>);

        // Check if the page panel is rendered
        expect(getByText('Passages')).toBeInTheDocument();
        expect(getByText('Create, Edit and List Passages')).toBeInTheDocument();
        expect(getByAltText('Image not found')).toBeInTheDocument();

        // Check if the title is rendered
        expect(getByText('All Passages')).toBeInTheDocument();
        expect(getByText('Create a Passage')).toBeInTheDocument();
    });

    test('renders loading gif', () => {
        const { getAllByAltText } = render(<PassagePage/>);
        const loadingImages = getAllByAltText('Loading');

        loadingImages.forEach(image => {
            expect(image).toBeInTheDocument();
        });
    });
});
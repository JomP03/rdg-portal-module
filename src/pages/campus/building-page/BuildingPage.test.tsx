import {render} from "@testing-library/react";
import React from "react";
import BuildingPage from "./BuildingPage";

describe('BuildingPage', () => {
    test('renders building page', () => {
        const { getByText, getByAltText } = render(<BuildingPage/>);

        // Check if the page panel is rendered
        expect(getByText('Buildings')).toBeInTheDocument();
        expect(getByText('Create, Edit and List Buildings')).toBeInTheDocument();
        expect(getByAltText('Image not found')).toBeInTheDocument();

        // Check if the title is rendered
        expect(getByText('All Buildings')).toBeInTheDocument();
        expect(getByText('Create a Building')).toBeInTheDocument();
    });

    test('renders loading gif', () => {
        const { getAllByAltText } = render(<BuildingPage/>);
        const loadingImages = getAllByAltText('Loading');

        loadingImages.forEach(image => {
            expect(image).toBeInTheDocument();
        });
    });
});
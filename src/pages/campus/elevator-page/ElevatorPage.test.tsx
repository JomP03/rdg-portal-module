import {render} from "@testing-library/react";
import React from "react";
import ElevatorPage from "./ElevatorPage";
import {setAppElement} from "react-modal";


describe('ElevatorPage', () => {
    test('renders elevator page', () => {
        const { getByText, getByAltText } = render(<ElevatorPage/>);

        // Check if the page panel is rendered
        expect(getByText('Elevators')).toBeInTheDocument();
        expect(getByText('Create, Edit and List Elevators')).toBeInTheDocument();
        expect(getByAltText('Image not found')).toBeInTheDocument();

        // Check if the title is rendered
        expect(getByText('All Elevators')).toBeInTheDocument();
        expect(getByText('Create a Elevator')).toBeInTheDocument();
    });

    test('renders loading gif', () => {
        const { getAllByAltText } = render(<ElevatorPage/>);
        const loadingImages = getAllByAltText('Loading');

        loadingImages.forEach(image => {
            expect(image).toBeInTheDocument();
        });
    });
});


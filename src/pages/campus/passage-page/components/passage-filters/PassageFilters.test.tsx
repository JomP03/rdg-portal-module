import {fireEvent, render} from "@testing-library/react";
import React from "react";
import PassageFilters from "./PassageFilters";

describe ('PassageFilters', () => {
    test('renders passage filters', () => {
        const { getByText} = render(<PassageFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByText('Between Buildings')).toBeInTheDocument();
        expect(getByText('First Building')).toBeInTheDocument();
        expect(getByText('Last Building')).toBeInTheDocument();
        expect(getByText('Apply')).toBeInTheDocument();
    });

    test('Check that the button works', () => {
        const { getByText } = render(<PassageFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        const firstBuildingComboBox = document.querySelector('#mui-component-select-firstBuilding');
        const lastBuildingComboBox = document.querySelector('#mui-component-select-lastBuilding');

        const button = getByText('Apply');

        firstBuildingComboBox!.textContent = 'Building 1';
        fireEvent.change(firstBuildingComboBox!);
        lastBuildingComboBox!.textContent = 'Building 2';
        fireEvent.change(lastBuildingComboBox!);


        fireEvent.click(button);

        expect(button).toBeEnabled();
    });
});
import {fireEvent, render} from "@testing-library/react";
import React from "react";
import ElevatorFilters from "./ElevatorFilters";

describe ('ElevatorFilters', () => {
    test('renders elevator filters', () => {
        const { getByText} = render(<ElevatorFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByText('By Building')).toBeInTheDocument();
        expect(getByText('Apply')).toBeInTheDocument();
    });

    test('Check that the button works', () => {
        const { getByText } = render(<ElevatorFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        const buildingComboBox = document.querySelector('#mui-component-select-building');

        const button = getByText('Apply');

        buildingComboBox!.textContent = 'Building 1';
        fireEvent.change(buildingComboBox!);

        fireEvent.click(button);

        expect(button).toBeEnabled();
    });
});
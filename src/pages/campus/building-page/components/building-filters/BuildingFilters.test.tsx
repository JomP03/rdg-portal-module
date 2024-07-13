import {fireEvent, getByLabelText, render} from "@testing-library/react";
import React from "react";
import BuildingFilters from "./BuildingFilters";

describe('BuildingFilters', () => {
    test('renders building filters', () => {
        const {getByText} = render(<BuildingFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByText('By Min and Max Floors')).toBeInTheDocument();
        expect(getByText('Apply')).toBeInTheDocument();
    });

    test('Check that the button works', () => {
        const {getByText, getByLabelText} = render(<BuildingFilters
            handleDataChange={jest.fn()} setIsFilterOn={jest.fn()}
        />);

        const minFloorTextField = getByLabelText('Min Floor*');
        const maxFloorTextField = getByLabelText('Max Floor*');

        const button = getByText('Apply');

        fireEvent.input(minFloorTextField, {target: {value: '1'}});
        expect(minFloorTextField).toHaveValue('1');
        fireEvent.input(maxFloorTextField, {target: {value: '2'}});
        expect(maxFloorTextField).toHaveValue('2');

        fireEvent.click(button);

        expect(button).toBeEnabled();
    });
});
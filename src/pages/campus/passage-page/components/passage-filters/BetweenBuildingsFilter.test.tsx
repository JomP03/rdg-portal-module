import {render} from "@testing-library/react";
import React from "react";
import BetweenBuildingsFilter from "./BetweenBuildingsFilter";

describe ('BetweenBuildingsFilter', () => {
    test('renders between buildings filter', () => {
        const { getByText } = render(<BetweenBuildingsFilter
            firstBuildingData={[]}
            firstBuildingValue=""
            lastBuildingData={[]}
            lastBuildingValue=""
            handleChangeSelect={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByText('First Building')).toBeInTheDocument();
        expect(getByText('Last Building')).toBeInTheDocument();
    });
});
import {render} from "@testing-library/react";
import React from "react";
import InBuildingFilter from "./InBuildingFilter";

describe ('InBuildingFilter', () => {
    test('renders in building filter', () => {
        const { getByText } = render(<InBuildingFilter
            buildingData={[]}
            buildingValue=""
            handleChangeSelect={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByText('Building')).toBeInTheDocument();
    });
});
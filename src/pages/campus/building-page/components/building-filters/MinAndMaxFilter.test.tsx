import {render} from "@testing-library/react";
import React from "react";
import MinAndMaxFilter from "./MinAndMaxFilter";

describe('MinAndMaxFilter', () => {
    test('renders min and max filter', () => {
        const {getByLabelText} = render(<MinAndMaxFilter
            formContent={{min: '', max: ''}}
            handleChangeTextField={jest.fn()}
        />);

        // Check if the title is rendered
        expect(getByLabelText('Min Floor*')).toBeInTheDocument();
        expect(getByLabelText('Max Floor*')).toBeInTheDocument();
    });
});
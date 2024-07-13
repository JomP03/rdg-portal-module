import {render} from "@testing-library/react";
import React from "react";
import RequestTaskPage from "./RequestTaskPage";

describe('RequestTaskPage', () => {
    const jwtDecode = require('jwt-decode');
    beforeEach(() => {
        const useJwtDecode = jest.spyOn(jwtDecode, 'jwtDecode');
        useJwtDecode.mockReturnValue({
            sub: '123456789'
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders request task page', () => {
        const { getByText } = render(<RequestTaskPage/>);

        // Check if the page panel is rendered
        expect(getByText('Request Tasks')).toBeInTheDocument();
        expect(getByText('Request and view your Tasks')).toBeInTheDocument();
        expect(getByText('Your Task Requisitions')).toBeInTheDocument();
        expect(getByText('Request a Task')).toBeInTheDocument();
        expect(getByText('Task Type')).toBeInTheDocument();
    });

    test('renders loading gif', () => {
        const { getAllByAltText } = render(<RequestTaskPage/>);
        const loadingImages = getAllByAltText('Loading');

        loadingImages.forEach(image => {
            expect(image).toBeInTheDocument();
        });
    });
});
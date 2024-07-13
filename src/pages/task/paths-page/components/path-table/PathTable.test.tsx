import PathInDto from "../../../../../dtos/in/PathInDto";
import {render} from "@testing-library/react";
import React from "react";
import PathTable from "./PathTable";


const paths: PathInDto[] = [
    {
        path: 'Cell(1,1) -> Cell(1,2) -> Cell(1,3)',
        cost: '3',
    }
]

describe('PathTable', () => {
    test('renders path table', () => {
        const {getByText} = render(<PathTable paths={paths} error={null} loading={false}/>
        );

        // Check if columns are rendered
        expect(getByText('Path')).toBeInTheDocument();
        expect(getByText('Cost')).toBeInTheDocument();
    });

    // Check if data is rendered
    test('renders data in path table', () => {
        const {getByText} = render(<PathTable paths={paths} error={null} loading={false}/>
        );

        // Check if data is rendered
        expect(getByText('Cell(1,1) -> Cell(1,2) -> Cell(1,3)')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
    });
});
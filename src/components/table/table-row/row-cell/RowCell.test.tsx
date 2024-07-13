import React from 'react';
import { render } from '@testing-library/react';
import RowCell from './RowCell'; // adjust this import to your file structure

describe('RowCell', () => {
    it('renders string content correctly', () => {
        const content = 'Test content';
        const { getByText } = render(<RowCell content={content} />);
        expect(getByText(content)).toBeInTheDocument();
    });

    it('renders ReactNode content correctly', () => {
        const content = <div>Test content</div>;
        const { getByText } = render(<RowCell content={content} />);
        expect(getByText('Test content')).toBeInTheDocument();
    });
});

import { render } from '@testing-library/react';
import Title from './Title';

test('check if the text is rendered', () => {
    const { getByText } = render(
        <Title text="Test Title" />
    );

    const title = getByText('Test Title');
    expect(title).toBeInTheDocument();
});

test('check if the color is rendered', () => {
    const { getByText } = render(
        <Title text="Test Title" color="red" />
    );

    const title = getByText('Test Title');
    expect(title).toHaveStyle('color: red');
});

test('check if the className is rendered', () => {
    const { getByText } = render(
        <Title text="Test Title" className="test-class" />
    );

    const title = getByText('Test Title');
    expect(title).toHaveClass('test-class');
});
import { render } from '@testing-library/react';
import SubTitle from './SubTitle';

test('check if the text is rendered', () => {
    const { getByText } = render(
        <SubTitle text="Test SubTitle" />
    );

    const subTitle = getByText('Test SubTitle');
    expect(subTitle).toBeInTheDocument();
});

test('check if the color is rendered', () => {
    const { getByText } = render(
        <SubTitle text="Test SubTitle" color="red" />
    );

    const subTitle = getByText('Test SubTitle');
    expect(subTitle).toHaveStyle('color: red');
});


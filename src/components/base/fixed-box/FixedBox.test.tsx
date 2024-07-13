import {render} from '@testing-library/react';
import FixedBox from './FixedBox';

test('renders open popover', () => {
    const {queryByRole} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const popover = queryByRole('presentation');

    expect(popover).toBeInTheDocument();
});


test('does not render closed popover', () => {
    const {queryByRole} = render(
        <FixedBox isOpen={false} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const popover = queryByRole('presentation');

    expect(popover).not.toBeInTheDocument();
});

test('renders title', () => {
    const {getByText} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const title = getByText('Test Title');

    expect(title).toBeInTheDocument();
});

test('renders content', () => {
    const {getByText} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const content = getByText('Test Content');

    expect(content).toBeInTheDocument();
});

test('renders with custom anchor origin', () => {
    const {queryByRole} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const popover = queryByRole('presentation');

    expect(popover).toBeInTheDocument();
});

test('renders with custom transform origin', () => {
    const {queryByRole} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'bottom', horizontal: 'right'}}/>
    );

    const popover = queryByRole('presentation');

    expect(popover).toBeInTheDocument();
});

test('renders with anchorElement', () => {
    const anchorElement = document.createElement('div');
    const {getByRole} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={anchorElement} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}/>
    );

    const popover = getByRole('presentation');

    expect(popover).toBeInTheDocument();
});

test('scroll lock works', () => {
    const {getByRole} = render(
        <FixedBox isOpen={true} onClose={() => {
        }} anchorElement={null} title="Test Title" content={<div>Test Content</div>}
                  anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}} disableScrollLock={false}/>
    );

    const popover = getByRole('presentation');

    expect(popover.parentElement!.style.overflow).toBe('hidden');
});



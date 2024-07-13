import React from 'react';
import './span.css';


interface SpanProps {
    text: string;
    color?: string;
}

const Span: React.FC<SpanProps> = ({text, color}) => {
    const spanStyle = {
        color: color,
    }

    return <span className={'span-component'} style={spanStyle}>{text}</span>;
};

export default Span;

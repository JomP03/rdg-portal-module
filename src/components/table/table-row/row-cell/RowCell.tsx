import React from 'react';
import DisplayLimitedContent from "../../../display-limited-content/DisplayLimitedContent";
import './row-cell.css';


interface RowCellProps {
    content: string | React.ReactNode;
    withLimit?: boolean;
}

const RowCell: React.FC<RowCellProps> = ({content, withLimit}) => {
    const isContentString = typeof content === 'string';
    return (
        <div className="row-cell">
            {isContentString ? (
                <DisplayLimitedContent content={content} initialLimit={62} maxLimit={withLimit ? 255 : 5000}/>
            ) : (
                content
            )}
        </div>
    );
};

export default RowCell;

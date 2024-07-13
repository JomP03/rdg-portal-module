import React, {ReactNode} from 'react';
import FixedBox from "../base/fixed-box/FixedBox";


interface FilterBoxProps {
    isOpen: boolean;
    onClose: () => void;
    anchorElement: HTMLElement | null;
    filters: ReactNode;
    filterEntity: string;
}

const FilterBox: React.FC<FilterBoxProps> = ({
                                                 isOpen,
                                                 onClose,
                                                 anchorElement,
                                                 filters,
                                                 filterEntity,
                                             }) => {
    return (
        <div>
            <FixedBox
                isOpen={isOpen}
                onClose={onClose}
                anchorElement={anchorElement}
                content={filters}
                title={'Filter ' + filterEntity + 's'}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock={false}
            />
        </div>

    );
}

export default FilterBox;
import React, {ReactNode, useState} from 'react';
import Filter from './filter/Filter';


interface FilterAccordionProps {
    filters: {
        name: string;
        component: ReactNode;
        onClick: () => void;
    }[];
}

const FilterAccordion: React.FC<FilterAccordionProps> = ({filters}) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => {
        setExpanded(prevExpanded => (prevExpanded !== panel ? panel : false));
    };

    return (
        <div style={{maxHeight: '30vh', overflow: 'auto'}}>
            {filters.map((filter, index) => (
                <Filter key={index} filter={filter} expanded={expanded} onChange={handleChange}/>
            ))}
        </div>
    );
};


export default FilterAccordion;

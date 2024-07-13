import React, {ReactNode} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import FormButton from "../../../form-button/FormButton";
import DownArrow from "../../../../assets/down-arrow.png";


interface FilterProps {
    filter: {
        name: string;
        component: ReactNode;
        onClick: () => void;
    };
    expanded: string | false;
    onChange: (panel: string) => void;
}

const Filter: React.FC<FilterProps> = ({
                                           filter, expanded,
                                           onChange
                                       }) => {
    return (
        <Accordion expanded={expanded === filter.name} onChange={() => onChange(filter.name)}>
            <AccordionSummary
                expandIcon={<img src={DownArrow} width={'20px'} height={'auto'} alt="down-arrow"/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{filter.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {filter.component}

                <FormButton label={'Apply'} onClick={filter.onClick}/>
            </AccordionDetails>
        </Accordion>
    );
};


export default Filter;
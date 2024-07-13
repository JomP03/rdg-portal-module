import React from "react";
import {TaskState} from "../../../../../dtos/in/TaskInDto";
import {SelectChangeEvent} from "@mui/material";
import MultipleComboBox from "../../../../../components/base/combo-box/MultipleComboBox";


interface ByStateProps {
    formContent: any;
    handleMultiSelectChange: (e: SelectChangeEvent<string[]>) => void
}

const ByState: React.FC<ByStateProps> = ({formContent, handleMultiSelectChange}) => {

    const data = Object.values(TaskState).map((state) => {
        return {value: state, id: state};
    });

    return (
        <div className={'form-row'}>
            <MultipleComboBox label={'State'} name={'state'} value={formContent.state}
                      data={data} onChange={handleMultiSelectChange} labelSpace={'0.8em'} width={'100%'}/>

        </div>
    );
}

export default ByState;
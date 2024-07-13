import React from "react";
import MultipleComboBox from "../../../../../components/base/combo-box/MultipleComboBox";
import {TasksType} from "../../../../../dtos/in/RobisepTypeInDto";
import {SelectChangeEvent} from "@mui/material";

interface ByTaskTypeProps {
    formContent: { [key: string]: string[] };
    handleSelectChange: (event: SelectChangeEvent<string[]>) => void;
}

const ByTaskType: React.FC<ByTaskTypeProps> = ({formContent, handleSelectChange}) => {

    const values = [
        {value: "PICKUP AND DELIVERY", id: TasksType.TRANSPORT},
        {value: TasksType.SURVEILLANCE, id: TasksType.SURVEILLANCE},
    ]

    return (
        <div className={'form-row'}>
            <MultipleComboBox label={'Task Types'} name={'tasksType'} value={formContent.tasksType}
                              data={values} onChange={handleSelectChange}
                              width={'100%'} labelSpace={'1.4em'}/>
        </div>
    );
}

export default ByTaskType;
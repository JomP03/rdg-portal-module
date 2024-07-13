import React from "react";
import {TaskState} from "../../../../../dtos/in/TaskInDto";
import {SelectChangeEvent} from "@mui/material";
import MultipleComboBox from "../../../../../components/base/combo-box/MultipleComboBox";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";


interface ByStateTypeUserProps {
    formContent: any;
    formContentMultiSelect: any;
    usersData: { value: string, id: string }[];
    typesData: { value: string, id: string }[];
    handleMultiSelectChange: (e: SelectChangeEvent<string[]>) => void
    handleSelectChange: (e: SelectChangeEvent<string>) => void
}

const ByStateTypeUser: React.FC<ByStateTypeUserProps> = ({formContent, formContentMultiSelect, usersData, typesData, handleMultiSelectChange, handleSelectChange}) => {

    const states = Object.values(TaskState).map((state) => {
        return {value: state, id: state};
    });
        
    return (
        <>
        <div className={'form-row'}>
            <MultipleComboBox label={'State'} name={'complexState'} value={formContentMultiSelect.complexState}
                      data={states} onChange={handleMultiSelectChange} labelSpace={'0.8em'} width={'100%'}/>
        </div>
        <div className={'form-row'}>
            <ComboBox label={'Type'} name={'robisepType'} value={formContent.robisepType}
                      data={typesData} onChange={handleSelectChange} labelSpace={'0.8em'} width={'100%'}/>
        </div>
        <div className={'form-row'}>
            <ComboBox label={'User'} name={'user'} value={formContent.user}
                      data={usersData} onChange={handleSelectChange} labelSpace={'0.8em'} width={'100%'}/>
        </div>
        </>

    );
}

export default ByStateTypeUser;
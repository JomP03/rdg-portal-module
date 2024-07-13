import OutlinedTextField from "../../../../components/base/text-field/OutlinedTextField";
import React from "react";
import {SelectChangeEvent} from "@mui/material";
import {TasksType} from "../../../../dtos/in/RobisepTypeInDto";
import MultipleComboBox from "../../../../components/base/combo-box/MultipleComboBox";

interface RobisepTypeFormProps {
    designationValue: string;
    brandValue: string;
    modelValue: string;
    tasksTypeValue: string[];
    handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect: (event: SelectChangeEvent<string[]>) => void;
}

const RobisepTypeForm: React.FC<RobisepTypeFormProps> = ({
                                                             designationValue, brandValue,
                                                             modelValue, tasksTypeValue,
                                                             handleChangeTextField, handleChangeSelect
                                                         }) => {

  const values = [
    {value: "PICKUP AND DELIVERY", id: TasksType.TRANSPORT},
    {value: TasksType.SURVEILLANCE, id: TasksType.SURVEILLANCE},
  ]

    return (
        <>
            <div className={'form-row'}>
                <OutlinedTextField name={'designation'} label={'Designation'} placeholder={'Enter Designation'}
                                   value={designationValue}
                                   onChange={handleChangeTextField} width={'50%'}/>

                <MultipleComboBox label={'Task Types'} name={'tasksType'} value={tasksTypeValue}
                          data={values}
                          onChange={handleChangeSelect} width={'50%'} labelSpace={'1.4em'}/>
            </div>

            <div className={'form-row'}>
                <OutlinedTextField name={'brand'} label={'Brand'} placeholder={'Enter Brand'} value={brandValue}
                                   onChange={handleChangeTextField} width={'50%'}/>
                <OutlinedTextField name={'model'} label={'Model'} placeholder={'Enter Model'} value={modelValue}
                                   onChange={handleChangeTextField} width={'50%'}/>
            </div>

        </>
    )
}

export default RobisepTypeForm;
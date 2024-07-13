import React from "react";
import {SelectChangeEvent} from "@mui/material";
import {TasksType} from "../../../../../dtos/in/RobisepTypeInDto";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";

interface TaskTypeFormProps {
  taskTypeValue: string;
  handleChangeSelect: (e: SelectChangeEvent) => void;
}

const TaskTypeForm: React.FC<TaskTypeFormProps> = ({
                                                     taskTypeValue, handleChangeSelect
                                                   }) => {

  const values = [
    {value: "PICKUP AND DELIVERY", id: TasksType.TRANSPORT},
    {value: TasksType.SURVEILLANCE, id: TasksType.SURVEILLANCE},
  ]

  return (
    <>
      <div className={'form-row'}>
        <ComboBox label={'Task Type'} name={'taskType'} value={taskTypeValue} data={values}
                  onChange={handleChangeSelect} width={'15%'} labelSpace={'1.3em'}/>
      </div>
    </>
  )
}

export default TaskTypeForm;
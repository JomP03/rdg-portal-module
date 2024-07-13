import {SelectChangeEvent} from "@mui/material";
import ComboBox from "../../../../components/base/combo-box/ComboBox";
import React from "react";
import Form from "../../../../components/base/form/Form";

enum Algorithm {
  PERMUTATION = "PERMUTATION",
  GENETIC = "GENETIC",
}

interface TaskSequenceFormProps {
  algorithmValue: string;
  handleChangeSelect: (event: SelectChangeEvent) => void;
  refreshTaskSequenceData: () => void;
  setButtonClick: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskSequenceForm: React.FC<TaskSequenceFormProps> = ({
                                                             algorithmValue,
                                                             handleChangeSelect,
                                                             refreshTaskSequenceData,
                                                             setButtonClick
                                                           }) => {


  const handleSubmit = async () => {
    await refreshTaskSequenceData();
    setButtonClick(true);
  }

  const form =
    <div className={'form-row'}>
      <ComboBox data={Object.values(Algorithm).map((algorithm) =>
        ({value: algorithm, id: algorithm}))} label={'Algorithm'} name={'algorithm'} value={algorithmValue}
                onChange={handleChangeSelect} width={'20%'} labelSpace={'1.3em'}/>
    </div>

  return <Form form={form} onSubmit={handleSubmit} buttonText={"Generate Task Sequence"} waitingForResponse={false}/>;
}

export default TaskSequenceForm;


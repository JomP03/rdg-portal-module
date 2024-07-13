import React from "react";
import {SelectChangeEvent} from "@mui/material";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import Title from "../../../../../components/base/title/Title";

interface RobisepFormProps {
  nicknameValue: string;
  serialNumber: string;
  codeValue: string;
  descriptonValue: string;
  robisepTypeValue: string;
  robisepTypeData: { value: string, id: string }[];
  buildingData: {
    value: string,
    id: string
  }[];
  buildingValue: string;

  floorData: {
    value: string,
    id: string
  }[];
  floorValue: string;

  roomData: {
    value: string,
    id: string
  }[];
  roomValue: string;

  handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (event: SelectChangeEvent) => void;
}

const RobisepForm: React.FC<RobisepFormProps> = (
  {
    nicknameValue,
    serialNumber,
    codeValue,
    descriptonValue,
    robisepTypeValue,
    robisepTypeData,
    handleChangeTextField,
    handleChangeSelect,
    buildingData = [],
    buildingValue = "",
    floorData = [],
    floorValue = "",
    roomData = [],
    roomValue = "",
  }
) => {
  return (
    <>
      <div className={'form-row'}>
        <OutlinedTextField name={'nickname'} label={'Nickname'} placeholder={'Enter Nickname'}
                           value={nicknameValue} onChange={handleChangeTextField} width={'50%'}/>
        <ComboBox label={'RobisepType'} name={'robisepTypeDesignation'} value={robisepTypeValue}
                  data={robisepTypeData} onChange={handleChangeSelect} width={'50%'} labelSpace={'1.7em'}/>
      </div>

      <div className={'form-row'}>
        <OutlinedTextField name={'serialNumber'} label={'Serial Number'} placeholder={'Enter Serial Number'}
                           value={serialNumber} onChange={handleChangeTextField} width={'50%'}/>
        <OutlinedTextField name={'code'} label={'Code'} placeholder={'Enter Code'}
                           value={codeValue} onChange={handleChangeTextField} width={'50%'}/>
      </div>

      <div className={'form-row'}>
        <OutlinedTextField name={'descripton'} label={'Description'} placeholder={'Enter Description'}
                           value={descriptonValue} onChange={handleChangeTextField} width={'100%'}
                           isOptional={true}/>
      </div>

      <br></br>

      <Title text={'Robisep Base Location'}/>

      <br></br>

      <div className={'form-row'}>
        <ComboBox label={'Building'} name={'building'} value={buildingValue} data={buildingData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'1.2em'}/>

        <ComboBox label={'Floor'} name={'floor'} value={floorValue} data={floorData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}/>

        <ComboBox label={'Room'} name={'room'} value={roomValue} data={roomData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'0.8em'}/>
      </div>
    </>
  )
}

export default RobisepForm;
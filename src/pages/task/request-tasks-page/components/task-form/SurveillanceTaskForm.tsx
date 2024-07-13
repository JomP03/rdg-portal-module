import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import {SelectChangeEvent} from "@mui/material";

interface SurveillanceTaskFormProps {
  robisepTypeData: {
    value: string,
    id: string
  }[];
  robisepTypeValue: string;

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

  startingRoomData: {
    value: string,
    id: string
  }[];
  startingRoomValue: string;

  endingRoomData: {
    value: string,
    id: string
  }[];
  endingRoomValue: string;

  emergencyPhoneNumberValue: string;

  handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (event: SelectChangeEvent) => void;
}


const SurveillanceTaskForm: React.FC<SurveillanceTaskFormProps> = ({
                                                                     robisepTypeData = [], robisepTypeValue = "",
                                                                     buildingData = [], buildingValue = "",
                                                                     floorData = [], floorValue = "",
                                                                     startingRoomData = [], startingRoomValue = "",
                                                                     endingRoomData = [], endingRoomValue = "",
                                                                     emergencyPhoneNumberValue,
                                                                     handleChangeTextField, handleChangeSelect
                                                                   }) => {

  return (
    <>

      <div className={'form-row'}>

        <ComboBox label={'Building'} name={'building'} value={buildingValue} data={buildingData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}/>

        <ComboBox label={'Floor'} name={'floor'} value={floorValue} data={floorData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}/>

      </div>

      <div className={'form-row'}>

        <ComboBox label={'Starting Room'} name={'startingRoom'} value={startingRoomValue}
                  data={startingRoomData} onChange={handleChangeSelect} width={'100%'} labelSpace={'2.0em'}/>

        <ComboBox label={'Ending Room'} name={'endingRoom'} value={endingRoomValue}
                  data={endingRoomData} onChange={handleChangeSelect} width={'100%'} labelSpace={'1.9em'}/>

      </div>

      <div className={'form-row'}>

        <ComboBox label={'Robisep Type'} name={'robisepType'} value={robisepTypeValue}
                  data={robisepTypeData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'1.8em'}/>

        <OutlinedTextField label={'Emergency Phone Number'} value={emergencyPhoneNumberValue}
                           onChange={handleChangeTextField} name={'emergencyPhoneNumber'}
                           width={'100%'}/>

      </div>

    </>
  );
}


export default SurveillanceTaskForm;
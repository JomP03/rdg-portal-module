import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";
import { SelectChangeEvent } from "@mui/material";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import MultipleComboBox from "../../../../../components/base/combo-box/MultipleComboBox";
import { ElevatorOrientation } from "../../../../../dtos/in/ElevatorInDto";

interface PassageFormProps {
  buildingData: { value: string, id: string }[];
  floorsData: { value: string, id: string }[];
  buildingCodeValue: string;
  floorsValue: string[];
  xPositionValue: string;
  yPositionValue: string;
  orientationValue: string;
  descriptionValue: string;
  serialNumberValue: string;
  brandValue: string;
  modelValue: string;
  floorComboBox: boolean;
  handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (event: SelectChangeEvent) => void;
  handleMultipleChangeSelect: (event: SelectChangeEvent<string[]>) => void;
  disabledFields?: {
    brand: boolean;
    model: boolean;
    serialNumber: boolean;
    description: boolean;
    xposition: boolean;
    yposition: boolean;
    orientation: boolean;
    building: boolean;
    floors: boolean;
  }
}

const ElevatorForm: React.FC<PassageFormProps> = ({
  buildingData,
  floorsData,
  buildingCodeValue,
  floorsValue,
  xPositionValue,
  yPositionValue,
  orientationValue,
  descriptionValue,
  serialNumberValue,
  brandValue,
  modelValue,
  floorComboBox,
  handleChangeTextField,
  handleChangeSelect,
  handleMultipleChangeSelect,
  disabledFields }) => {

  return (
    <>
      <SubTitle text={'Elevator Information'} />

      <div className={'form-row'} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <OutlinedTextField name={'model'} label={'Model'} placeholder={'Enter Model'} value={modelValue}
            onChange={handleChangeTextField} width={'50%'}
            disabled={disabledFields?.model} isOptional={true}/>

          <OutlinedTextField name={'brand'} label={'Brand'} placeholder={'Enter Brand'}
            value={brandValue} onChange={handleChangeTextField} width={'50%'}
            disabled={disabledFields?.brand} isOptional={true}/>

          <OutlinedTextField name={'serialNumber'} label={'Serial Number'} placeholder={'Enter Serial Number'}
            value={serialNumberValue} onChange={handleChangeTextField} width={'50%'}
            disabled={disabledFields?.serialNumber} isOptional={true}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '10px' }}>
          <div style={{ width: '70%' }}>
            <OutlinedTextField name={'description'} label={'Description'} placeholder={'Enter Description'} value={descriptionValue}
              onChange={handleChangeTextField} width={'100%'}
              disabled={disabledFields?.description} isOptional={true}/>
          </div>
        </div>
      </div>

      <SubTitle text={'Elevator Building Floors'} />

      <div className={'form-row'}>
        <ComboBox label={'Building'} name={'building'} value={buildingCodeValue} data={buildingData}
          onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}
          disabled={disabledFields?.building} />

        <MultipleComboBox label={'Floors'} name={'floors'} value={floorsValue}
          data={floorsData}
          onChange={handleMultipleChangeSelect} width={'100%'} labelSpace={'0.8em'}
          disabled={floorComboBox} />
      </div>

      <SubTitle text={'Elevator Position'} />

      <div className={'form-row'}>
        <OutlinedTextField name={'xposition'} label={'Coordinate X'} placeholder={'Enter Coordinate X'}
          value={xPositionValue} onChange={handleChangeTextField} width={'50%'}
          disabled={disabledFields?.xposition} />

        <OutlinedTextField name={'yposition'} label={'Coordinate Y'} placeholder={'Enter Coordinate Y'}
          value={yPositionValue} onChange={handleChangeTextField} width={'50%'}
          disabled={disabledFields?.yposition} />

        <ComboBox label={'Door Orientation'} name={'orientation'} value={orientationValue}
            data={Object.values(ElevatorOrientation).map((orientation) =>
              ({value: orientation, id: orientation}))}
            onChange={handleChangeSelect} width={'50%'} labelSpace={'2.3em'}/>
      </div>


    </>



  )

}
export default ElevatorForm;
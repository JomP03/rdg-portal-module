import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import Title from "../../../../../components/base/title/Title";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";
import { SelectChangeEvent } from "@mui/material";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";

interface PassageFormProps {
  startPointBuildingData: { value: string, id: string }[];
  startPointFloorData: { value: string, id: string }[];
  startPointBuildingValue: string;
  startPointFloorValue: string;
  startPointFloorComboBox?: boolean;
  sPFirstCoordinateXValue: string;
  sPFirstCoordinateYValue: string;
  sPLastCoordinateXValue: string;
  sPLastCoordinateYValue: string;
  endPointBuildingData: { value: string, id: string }[];
  endPointFloorData: { value: string, id: string }[];
  endPointBuildingValue: string;
  endPointFloorValue: string;
  endPointFloorComboBox?: boolean;
  ePFirstCoordinateXValue: string;
  ePFirstCoordinateYValue: string;
  ePLastCoordinateXValue: string;
  ePLastCoordinateYValue: string;
  handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect: (event: SelectChangeEvent) => void;
}

const PassageForm: React.FC<PassageFormProps> = ({ 
  startPointBuildingData, 
  startPointFloorData, 
  startPointBuildingValue,
  startPointFloorValue,
  startPointFloorComboBox,
  sPFirstCoordinateXValue, 
  sPFirstCoordinateYValue, 
  sPLastCoordinateXValue, 
  sPLastCoordinateYValue, 
  endPointBuildingData, 
  endPointFloorData, 
  endPointBuildingValue,
  endPointFloorValue,
  endPointFloorComboBox,
  ePFirstCoordinateXValue,
  ePFirstCoordinateYValue, 
  ePLastCoordinateXValue, 
  ePLastCoordinateYValue, 
  handleChangeTextField, 
  handleChangeSelect }) => {

  return ( 
    <>

        <br></br>

        <Title text={'Start Point'}/>

        <br></br>

      <div className={'form-row'}>
        <ComboBox label={'Building'} name={'startPointBuilding'} value={startPointBuildingValue} data={startPointBuildingData}
        onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}/>
        <ComboBox label={'Floor'} name={'startPointFloor'} value={startPointFloorValue} data={startPointFloorData}
        onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'} disabled={startPointFloorComboBox}/>
      </div>

      <SubTitle text={'First Coordinates'}/>

      <div className={'form-row'}>
        <OutlinedTextField name={'sPFirstCoordinateX'} label={'Coordinate X'} placeholder={'Enter First Coordinate X'} 
        value={sPFirstCoordinateXValue} onChange={handleChangeTextField} width={'50%'}/>
        <OutlinedTextField name={'sPFirstCoordinateY'} label={'Coordinate Y'} placeholder={'Enter First Coordinate Y'}
        value={sPFirstCoordinateYValue} onChange={handleChangeTextField} width={'50%'}/>
      </div>

      <SubTitle text={'Last Coordinates'}/>

      <div className={'form-row'}>
        <OutlinedTextField name={'sPLastCoordinateX'} label={'Coordinate X'} placeholder={'Enter Last Coordinate X'}
        value={sPLastCoordinateXValue} onChange={handleChangeTextField} width={'50%'}/>
        <OutlinedTextField name={'sPLastCoordinateY'} label={'Coordinate Y'} placeholder={'Enter Last Coordinate Y'} 
        value={sPLastCoordinateYValue} onChange={handleChangeTextField} width={'50%'}/>
      </div>

        <br></br>

        <Title text={'End Point'}/>

        <br></br>

      <div className={'form-row'}>
        <ComboBox label={'Building'} name={'endPointBuilding'} value={endPointBuildingValue} data={endPointBuildingData} 
        onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}/>
        <ComboBox label={'Floor'} name={'endPointFloor'} value={endPointFloorValue} data={endPointFloorData} 
        onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'} disabled={endPointFloorComboBox}/>
      </div>

      <SubTitle text={'First Coordinates'}/>

      <div className={'form-row'}>
        <OutlinedTextField name={'ePFirstCoordinateX'} label={'Coordinate X'} placeholder={'Enter First Coordinate X'} 
        value={ePFirstCoordinateXValue} onChange={handleChangeTextField} width={'50%'}/>
        <OutlinedTextField name={'ePFirstCoordinateY'} label={'Coordinate Y'} placeholder={'Enter First Coordinate Y'} 
        value={ePFirstCoordinateYValue} onChange={handleChangeTextField} width={'50%'}/>
      </div>

      <SubTitle text={'Last Coordinates'}/>

      <div className={'form-row'}>
        <OutlinedTextField name={'ePLastCoordinateX'} label={'Coordinate X'} placeholder={'Enter Last Coordinate X'} 
        value={ePLastCoordinateXValue} onChange={handleChangeTextField} width={'50%'}/>
        <OutlinedTextField name={'ePLastCoordinateY'} label={'Coordinate Y'} placeholder={'Enter Last Coordinate Y'} 
        value={ePLastCoordinateYValue} onChange={handleChangeTextField} width={'50%'}/>
      </div>
    </>
  )

}
export default PassageForm;
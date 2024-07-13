import { SelectChangeEvent } from "@mui/material";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import '../../../../../components/base/form/Form.css'
import React from "react";

interface BetweenBuildingsProps {
  firstBuildingData: { value: string, id: string }[];
  firstBuildingValue: string;
  lastBuildingData: { value: string, id: string }[];
  lastBuildingValue: string;
  handleChangeSelect: (event: SelectChangeEvent) => void;
  
}

const BetweenBuildingsFilter: React.FC<BetweenBuildingsProps> = ({ firstBuildingData, firstBuildingValue, lastBuildingData, lastBuildingValue, handleChangeSelect }) => {
  return ( 
    <div className={'form-row'}>
        <ComboBox label={'First Building'} name={'firstBuilding'} value={firstBuildingValue} data={firstBuildingData} 
        onChange={handleChangeSelect} width={'150px'}  labelSpace={'1.8em'}/>
        <ComboBox label={'Last Building'} name={'lastBuilding'} value={lastBuildingValue} data={lastBuildingData}
        onChange={handleChangeSelect} width={'150px'} labelSpace={'1.8em'}/>
    </div>
  )
}

export default BetweenBuildingsFilter;
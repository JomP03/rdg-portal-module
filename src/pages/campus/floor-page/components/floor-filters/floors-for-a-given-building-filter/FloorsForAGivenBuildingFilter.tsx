import React from "react";
import ComboBox from "../../../../../../components/base/combo-box/ComboBox";
import '../../../../../../components/base/form/Form.css'
import {SelectChangeEvent} from "@mui/material";

interface FloorsForAGivenBuildingProps {
  selectedBuildingData: { value: string, id: string }[];
  selectedBuildingValue: string;
  handleChangeSelect: (e: SelectChangeEvent) => void;
}

const FloorsForAGivenBuildingFilter: React.FC<FloorsForAGivenBuildingProps> =
  ({selectedBuildingValue, selectedBuildingData, handleChangeSelect}) => {
    return (
      <div className={'form-row'}>
        <ComboBox label={'Building'} name={'buildingForByBuildingFilter'} value={selectedBuildingValue}
                  data={selectedBuildingData} onChange={handleChangeSelect} width={'200px'} labelSpace={'1.8em'}
        />
      </div>
    )
  }

export default FloorsForAGivenBuildingFilter;
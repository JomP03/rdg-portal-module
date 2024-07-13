import React from "react";
import '../../../../../../components/base/form/Form.css';
import ComboBox from "../../../../../../components/base/combo-box/ComboBox";
import {SelectChangeEvent} from "@mui/material";


interface FloorsWithElevatorProps {
    selectedBuildingData: { value: string, id: string }[];
    selectedBuildingValue: string;
    handleChangeSelect: (e: SelectChangeEvent) => void;
}

const FloorsWithElevatorFilter: React.FC<FloorsWithElevatorProps> = 
    ({selectedBuildingData, selectedBuildingValue, handleChangeSelect}) => {
    return (
        <div className={'form-row'}>
            <ComboBox label={'Building'} name={'buildingForWithElevatorFilter'} value={selectedBuildingValue}
                      data={selectedBuildingData} onChange={handleChangeSelect} width={'200px'} labelSpace={'1.8em'}
            />
        </div>
    )
    
}


export default FloorsWithElevatorFilter;
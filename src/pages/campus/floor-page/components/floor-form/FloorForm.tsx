import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";


import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import {SelectChangeEvent} from "@mui/material";
import UploadButton from "../../../../../components/upload-button/UploadButton";


interface FloorFormProps {
  buildingData?: {
    value: string,
    id: string
  }[];
  buildingValue?: string;

  floorNumberValue: string;
  floorDescriptionValue: string;
  floorPlanValue?: string;

  handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeSelect?: (e: SelectChangeEvent) => void;
  handleUploadFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  disabledFields?: {
    building: boolean;
  }

  editMode?: boolean;
}


const FloorForm: React.FC<FloorFormProps> = ({
                                               buildingData = [], buildingValue = "",
                                               floorNumberValue, floorDescriptionValue,
                                               floorPlanValue = "",
                                               handleChangeTextField, handleChangeSelect = () => {
  },
                                               handleUploadFile = () => {
                                               }, disabledFields,
                                               editMode = false
                                             }) => {

  const common =
    <>

      <div className={'form-row'}>

        <ComboBox label={'Building'} name={'buildingCode'} value={buildingValue} data={buildingData}
                  onChange={handleChangeSelect} width={'50%'} labelSpace={'1.1em'} disabled={disabledFields?.building}/>

        <OutlinedTextField value={floorNumberValue} onChange={handleChangeTextField} name={'floorNumber'}
                           placeholder={'Enter a Floor Number'} width={'50%'} label={'Floor Number'}/>
      </div>

      <div className={'form-row'}>

        <OutlinedTextField value={floorDescriptionValue} onChange={handleChangeTextField} name={'floorDescription'}
                           placeholder={'Enter a Floor Description'} width={'100%'} label={'Floor Description'}
                           isOptional={true}/>

      </div>

    </>

  if (!editMode) {
    return (
      <>
        {common}
      </>
    )
  }

  return (
    <>
      {common}

      <UploadButton label={'Select a Floor Plan'} value={floorPlanValue} onChange={handleUploadFile}
                    name={'floorPlan'}/>
    </>
  );
}


export default FloorForm;
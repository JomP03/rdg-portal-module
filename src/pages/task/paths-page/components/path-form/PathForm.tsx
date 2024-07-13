import {SelectChangeEvent} from "@mui/material";
import React from "react";
import Title from "../../../../../components/base/title/Title";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";

interface PathFormProps {
    originBuildingData: { value: string, id: string }[];
    originFloorData: { value: string, id: string }[];
    originRoomData: { value: string, id: string }[];
    originBuildingValue: string;
    originBuildingComboBox?: boolean;
    originFloorValue: string;
    originFloorComboBox?: boolean;
    originRoomValue: string;
    originRoomComboBox?: boolean;
    destinationBuildingData: { value: string, id: string }[];
    destinationFloorData: { value: string, id: string }[];
    destinationRoomData: { value: string, id: string }[];
    destinationBuildingValue: string;
    destinationBuildingComboBox?: boolean;
    destinationFloorValue: string;
    destinationFloorComboBox?: boolean;
    destinationRoomValue: string;
    destinationRoomComboBox?: boolean;
    handleChangeSelect: (event: SelectChangeEvent) => void;
}

const PathForm: React.FC<PathFormProps> = ({
                                               originBuildingData,
                                               originFloorData,
                                               originRoomData,
                                               originBuildingValue,
                                               originBuildingComboBox,
                                               originFloorValue,
                                               originFloorComboBox,
                                               originRoomValue,
                                               originRoomComboBox,
                                               destinationBuildingData,
                                               destinationFloorData,
                                               destinationRoomData,
                                               destinationBuildingValue,
                                               destinationBuildingComboBox,
                                               destinationFloorValue,
                                               destinationFloorComboBox,
                                               destinationRoomValue,
                                               destinationRoomComboBox,
                                               handleChangeSelect
                                           }) => {

    return (
        <>
            <br></br>

            <Title text={'Origin'}/>

            <br></br>

            <div id='origin-info' className={'form-row'}>
                <ComboBox label={'Building'} name={'originBuilding'} value={originBuildingValue}
                          data={originBuildingData} onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}
                          disabled={originBuildingComboBox}/>
                <ComboBox label={'Floor'} name={'originFloor'} value={originFloorValue} data={originFloorData}
                          onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}
                          disabled={originFloorComboBox}/>
            </div>

            <div className={'form-row'}>
                <ComboBox label={'Room'} name={'originRoom'} value={originRoomValue} data={originRoomData}
                          onChange={handleChangeSelect} width={'100%'} labelSpace={'0.8em'}
                          disabled={originRoomComboBox}/>
            </div>

            <br></br>

            <Title text={'Destination'}/>

            <br></br>

            <div className={'form-row'}>
                <ComboBox label={'Building'} name={'destinationBuilding'} value={destinationBuildingValue}
                          data={destinationBuildingData} onChange={handleChangeSelect} width={'100%'}
                          labelSpace={'1.1em'} disabled={destinationBuildingComboBox}/>
                <ComboBox label={'Floor'} name={'destinationFloor'} value={destinationFloorValue}
                          data={destinationFloorData} onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}
                          disabled={destinationFloorComboBox}/>
            </div>

            <div className={'form-row'}>
                <ComboBox label={'Room'} name={'destinationRoom'} value={destinationRoomValue}
                          data={destinationRoomData} onChange={handleChangeSelect} width={'100%'} labelSpace={'0.8em'}
                          disabled={destinationRoomComboBox}/>
            </div>

            <br></br>

        </>
    );
}

export default PathForm;
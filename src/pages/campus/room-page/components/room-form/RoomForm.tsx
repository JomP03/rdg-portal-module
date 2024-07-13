import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import Title from "../../../../../components/base/title/Title";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";
import {SelectChangeEvent} from "@mui/material";
import {DoorOrientation, RoomCategory} from "../../../../../dtos/in/RoomInDto";

interface RoomFormProps {
    nameValue: string;
    categoryValue: string;
    buildingValue: string;
    floorValue: string;
    floorComboBox: boolean;
    descriptionValue: string;
    initialXValue: string;
    initialYValue: string;
    finalXValue: string;
    finalYValue: string;
    doorXValue: string;
    doorYValue: string;
    doorOrientationValue: string;
    buildingsData: { value: string, id: string }[];
    floorsData: { value: string, id: string }[];
    handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect: (event: SelectChangeEvent) => void;
}


const RoomForm: React.FC<RoomFormProps> = ({
                                               nameValue,
                                               categoryValue,
                                               buildingValue,
                                               floorValue,
                                               floorComboBox,
                                               descriptionValue,
                                               initialXValue,
                                               initialYValue,
                                               finalXValue,
                                               finalYValue,
                                               doorXValue,
                                               doorYValue,
                                               doorOrientationValue,
                                               buildingsData,
                                               floorsData,
                                               handleChangeTextField,
                                               handleChangeSelect
                                           }) => {
    return (
        <>
            <div className={'form-row'}>
                <OutlinedTextField name={'name'} label={'Name'} placeholder={'Enter Name'} value={nameValue}
                                   onChange={handleChangeTextField} width={'50%'}/>

                <ComboBox label={'Category'} name={'category'} value={categoryValue}
                          data={Object.values(RoomCategory).map((category) =>
                              ({value: category, id: category}))}
                          onChange={handleChangeSelect} width={'50%'} labelSpace={'1.2em'}/>
            </div>

            <div className={'form-row'}>
                <ComboBox label={'Building'} name={'building'} value={buildingValue} data={buildingsData}
                          onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}/>
                <ComboBox label={'Floor'} name={'floor'} value={floorValue} data={floorsData}
                          onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'} disabled={floorComboBox}/>
            </div>

            <div className={'form-row'}>
                <OutlinedTextField name={'description'} label={'Description'} placeholder={'Enter Description'}
                                   value={descriptionValue} onChange={handleChangeTextField} width={'100%'}/>
            </div>

            <Title text={'Dimensions'}/>
            <SubTitle text={'Initial Coordinates'}/>
            <div className={'form-row'}>
                <OutlinedTextField name={'initialX'} label={'X Coordinate'} placeholder={'Enter X Coordinate'}
                                   value={initialXValue} onChange={handleChangeTextField} width={'50%'}/>

                <OutlinedTextField name={'initialY'} label={'Y Coordinate'} placeholder={'Enter Y Coordinate'}
                                   value={initialYValue} onChange={handleChangeTextField} width={'50%'}/>
            </div>

            <SubTitle text={'Final Coordinates'}/>
            <div className={'form-row'}>
                <OutlinedTextField name={'finalX'} label={'X Coordinate'} placeholder={'Enter X Coordinate'}
                                   value={finalXValue} onChange={handleChangeTextField} width={'50%'}/>

                <OutlinedTextField name={'finalY'} label={'Y Coordinate'} placeholder={'Enter Y Coordinate'}
                                   value={finalYValue} onChange={handleChangeTextField} width={'50%'}/>
            </div>

            <Title text={'Door Position'}/>
            <div className={'form-row'}>
                <OutlinedTextField name={'doorX'} label={'X Coordinate'} placeholder={'Enter X Coordinate'}
                                   value={doorXValue} onChange={handleChangeTextField} width={'50%'}/>

                <OutlinedTextField name={'doorY'} label={'Y Coordinate'} placeholder={'Enter Y Coordinate'}
                                   value={doorYValue} onChange={handleChangeTextField} width={'50%'}/>

                <ComboBox label={'Door Orientation'} name={'doorOrientation'} value={doorOrientationValue}
                          data={Object.values(DoorOrientation).map((orientation) =>
                              ({value: orientation, id: orientation}))}
                          onChange={handleChangeSelect} width={'50%'} labelSpace={'2.3em'}/>

            </div>
        </>
    )
}

export default RoomForm;
import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";


interface BuildingFormProps {
    codeValue: string;
    nameValue: string;
    descriptionValue: string;
    widthValue: string;
    lengthValue: string;
    handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabledFields?: {
        buildingCode: boolean;
        buildingName: boolean;
        buildingDescription: boolean;
        width: boolean;
        length: boolean;
    }
}

const BuildingForm: React.FC<BuildingFormProps> = ({
                                                       codeValue, nameValue, descriptionValue,
                                                       widthValue, lengthValue, handleChangeTextField,
                                                       disabledFields
                                                   }) => {


    return (
        <>
            <div className={'form-row'}>
                <OutlinedTextField name={'buildingCode'} label={'Code'} placeholder={'Enter Code'} value={codeValue}
                                   onChange={handleChangeTextField} width={'50%'}
                                   disabled={disabledFields?.buildingCode}/>

                <OutlinedTextField name={'buildingName'} label={'Name'} placeholder={'Enter Name'} value={nameValue}
                                   onChange={handleChangeTextField} width={'50%'}
                                   disabled={disabledFields?.buildingName} isOptional={true}/>

            </div>

            <div className={'form-row'}>
                <OutlinedTextField name={'buildingDescription'} label={'Description'} placeholder={'Enter Description'}
                                   value={descriptionValue}
                                   onChange={handleChangeTextField} width={'100%'}
                                   disabled={disabledFields?.buildingDescription} isOptional={true}/>

            </div>

            <SubTitle text={'Dimensions'}/>
            <div className={'form-row'}>
                <OutlinedTextField name={'width'} label={'Width'}
                                   value={widthValue}
                                   onChange={handleChangeTextField}
                                   placeholder={'Enter Width'}
                                   width={'50%'}
                                   disabled={disabledFields?.width}
                />

                <OutlinedTextField name={'length'} label={'Length'} value={lengthValue}
                                   onChange={handleChangeTextField}
                                   placeholder={'Enter Length'}
                                   width={'50%'}
                                   disabled={disabledFields?.length}
                />
            </div>
        </>
    )
}

export default BuildingForm;
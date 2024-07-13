import React from "react";
import Button from "../../../../../components/base/button/Button";
import {
    ACCEPT_BUTTON_COLOR,
    ACCEPT_BUTTON_COLOR_ACTIVE,
    ACCEPT_BUTTON_COLOR_HOVER,
    BACKGROUND_COLOR,
    LOGOUT_BUTTON_COLOR,
    LOGOUT_BUTTON_COLOR_ACTIVE,
    LOGOUT_BUTTON_COLOR_HOVER,
} from "../../../../../utils/colors";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import {SelectChangeEvent} from "@mui/material";

interface ManageTaskRequistionFormProps {
    robisepData: { value: string, id: string }[];
    robisepValue: string;
    handleChangeSelect: (event: SelectChangeEvent) => void;
    handleAccept: () => void;
    handleReject: () => void;
    disabledFields?: {
        accept: boolean;
    }
}

const ManageTaskRequistionForm: React.FC<ManageTaskRequistionFormProps> = ({
                                                                               robisepData,
                                                                               robisepValue,
                                                                               handleChangeSelect,
                                                                               handleAccept,
                                                                               handleReject,
                                                                               disabledFields,
                                                                           }) => {

    return (
        <>

            <div className={'form-row'} style={{display: 'flex', flexDirection: 'column'}}>

                <ComboBox label={'Robisep'} name={'robisepCode'} value={robisepValue} onChange={handleChangeSelect}
                          data={robisepData} width={'100%'} labelSpace={'1.1em'}/>

                <br/>
                <br/>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button label={'Accept'}
                            backgroundColor={ACCEPT_BUTTON_COLOR}
                            hoverColor={ACCEPT_BUTTON_COLOR_HOVER}
                            activeColor={ACCEPT_BUTTON_COLOR_ACTIVE}
                            textColor={BACKGROUND_COLOR}
                            onClick={handleAccept}
                            isDisabled={disabledFields?.accept}
                    />

                    <Button label={'Refuse'}
                            backgroundColor={LOGOUT_BUTTON_COLOR}
                            hoverColor={LOGOUT_BUTTON_COLOR_HOVER}
                            activeColor={LOGOUT_BUTTON_COLOR_ACTIVE}
                            textColor={BACKGROUND_COLOR}
                            onClick={handleReject}/>
                </div>

            </div>
        </>
    );
}

export default ManageTaskRequistionForm;

import React from "react";
import {SelectChangeEvent} from "@mui/material";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import PasswordTextField from "../../../../../components/base/passwordTextField/PasswordTextField";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";


interface BackofficeUserFormProps {
    rolesData?: {
        value: string,
        id: string
    }[];
    nameValue: string;
    emailValue: string;
    phoneNumberValue: string;
    passwordValue: string;
    userRoleValue: string;
    handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect?: (e: SelectChangeEvent) => void;
}

const BackofficeUserForm: React.FC<BackofficeUserFormProps> = ({
                                                                   rolesData = [],
                                                                   nameValue,
                                                                   emailValue,
                                                                   phoneNumberValue,
                                                                   passwordValue,
                                                                   userRoleValue,
                                                                   handleChangeTextField,
                                                                   handleChangeSelect = () => {
                                                                   }
                                                               }) => {

        return (
            <>
                <div className={'form-row'}>
                    <OutlinedTextField name={'userEmail'} label={'Email'} placeholder={'Enter Institutional Email'} value={emailValue}
                                       onChange={handleChangeTextField} width={'50%'}/>

                    <OutlinedTextField name={'userName'} label={'Name'} placeholder={'Enter Name'} value={nameValue}
                                       onChange={handleChangeTextField} width={'50%'}/>

                </div>
                <div className={'form-row'}>
                    <OutlinedTextField name={'userPhoneNumber'} label={'Phone Number'} placeholder={'Enter Phone Number'} value={phoneNumberValue}
                                       onChange={handleChangeTextField} width={'50%'}/>
                    <ComboBox label={'Role'} name={'userRoleId'} value={userRoleValue} data={rolesData}
                              onChange={handleChangeSelect} width={'50%'} labelSpace={'1.1em'}/>
                </div>

                <div className={'form-row'}>
                    <PasswordTextField value={passwordValue} onChange={handleChangeTextField} name={'userPassword'}/>

                </div>
            </>
        )
    }

export default BackofficeUserForm;
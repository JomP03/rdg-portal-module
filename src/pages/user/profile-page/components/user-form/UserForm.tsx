import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";

interface UserFormProps {
  name: string;
  nif: string;
  phoneNumber: string;
  handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEndUser: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  name,
  nif,
  phoneNumber,
  handleChangeTextField,
  isEndUser }) => {

  return (
    <>
      <SubTitle text={'User Information'} />

      <div className={'form-row'} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

          <OutlinedTextField name={'name'} label={'Name'} placeholder={'Enter Name'} value={name}
            onChange={handleChangeTextField} width={'50%'}
          />

          { isEndUser && <OutlinedTextField name={'nif'} label={'Nif'} placeholder={'Enter Nif'}
            value={nif} onChange={handleChangeTextField} width={'50%'}
          />}

          <OutlinedTextField name={'phoneNumber'} label={'Phone Number'} placeholder={'Enter Phone Number'}
            value={phoneNumber} onChange={handleChangeTextField} width={'50%'}
          />

        </div>

      </div>

    </>



  )

}
export default UserForm;
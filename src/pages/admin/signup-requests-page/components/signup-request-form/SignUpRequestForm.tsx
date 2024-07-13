import React from "react";
import SubTitle from "../../../../../components/base/sub-title/SubTitle";
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
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";

interface SignUpRequestFormProps {
  name: string;
  email: string;
  handleAccept: () => void;
  handleReject: () => void;
  handleChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  comment: string;
}

const SignUpRequestForm: React.FC<SignUpRequestFormProps> = ({ name, email, handleAccept, handleReject, handleChangeTextField, comment }) => {

  return (
    <>

      <div className={'form-row'} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ marginRight: '16px' }}>
          <b>User: </b>{name}
          </div>
          <div>
          <b>User Email:</b> {email}
          </div>
        </div>

      <br/>
      <br/>

        <OutlinedTextField name={'comment'} label={'Comment'} placeholder={'Enter Comment'}
            value={comment} onChange={handleChangeTextField} width={'100%'}
        />

      <br/>
      <br/>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button label={'Accept'}
            backgroundColor={ACCEPT_BUTTON_COLOR}
            hoverColor={ACCEPT_BUTTON_COLOR_HOVER}
            activeColor={ACCEPT_BUTTON_COLOR_ACTIVE}
            textColor={BACKGROUND_COLOR}
            onClick={handleAccept} />

          <Button label={'Reject'}
            backgroundColor={LOGOUT_BUTTON_COLOR}
            hoverColor={LOGOUT_BUTTON_COLOR_HOVER}
            activeColor={LOGOUT_BUTTON_COLOR_ACTIVE}
            textColor={BACKGROUND_COLOR}
            onClick={handleReject} />
        </div>

      </div>
    </>
  );
}

export default SignUpRequestForm;

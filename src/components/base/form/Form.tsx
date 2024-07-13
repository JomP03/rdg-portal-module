import React, {ReactNode} from 'react';
import FormButton from '../../form-button/FormButton';
import './Form.css';

interface GenericFormProps {
  buttonId?: string;
  form: ReactNode;
  onSubmit: () => void;
  buttonText?: string;
  waitingForResponse: boolean;
  isButtonVisible?: boolean;
}


const Form: React.FC<GenericFormProps> = ({buttonId, form, onSubmit, buttonText = "Submit", waitingForResponse, isButtonVisible = true}) => {
  return (
    <div className={'form-container'}>
      {form}
      <div className={'align-button'}>
        <FormButton buttonId={buttonId} label={buttonText} onClick={onSubmit} isDisabled={waitingForResponse} isButtonVisible={isButtonVisible}/>
      </div>
    </div>
  )
}

export default Form;

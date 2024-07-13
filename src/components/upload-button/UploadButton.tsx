import React from 'react';
import FileInputIcon from '../../assets/file-input.png';
import './upload-button.css';


interface UploadButtonProps {
  label?: string;
  disabled?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  name: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({
                                                     label = "Label: ", disabled = false,
                                                     width = '100%', onChange
                                                   }) => {

  return (
    <>
      <label className='upload-button'>
        <img className={'file-icon'} src={FileInputIcon} width={width} alt="Upload"/>
        {label}
        <input disabled={disabled} width={width} type='file' onChange={onChange} accept='application/json'/>
      </label>
    </>
  );
}

export default UploadButton;

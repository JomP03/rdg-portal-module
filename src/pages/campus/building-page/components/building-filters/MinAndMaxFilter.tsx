import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";
import '../../../../../components/base/form/Form.css';

interface MinAndMaxFilterProps {
    formContent: { [key: string]: string; };
    handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MinAndMaxFilter: React.FC<MinAndMaxFilterProps> = ({formContent, handleChangeTextField}) => {
    return (
        <div className={'form-row'}>
            <OutlinedTextField label={'Min Floor'} placeholder={'Enter a min nr of floors'} value={formContent.min}
                               onChange={handleChangeTextField} name={'min'}/>
            <OutlinedTextField label={'Max Floor'} placeholder={'Enter a max nr of floors'} value={formContent.max}
                               onChange={handleChangeTextField} name={'max'}/>
        </div>
    )
}

export default MinAndMaxFilter;
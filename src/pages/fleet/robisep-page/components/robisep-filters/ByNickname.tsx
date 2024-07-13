import React from "react";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";

interface ByNicknameProps {
    formContent: { [key: string]: string; };
    handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ByNickname: React.FC<ByNicknameProps> = ({formContent, handleChangeTextField}) => {
    return (
        <div className={'form-row'}>
            <OutlinedTextField label={'Nickname'} placeholder={'Enter a nickname'} value={formContent.nickname}
                               onChange={handleChangeTextField} name={'nickname'}/>
        </div>
    );
}

export default ByNickname;
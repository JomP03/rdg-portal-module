import { SelectChangeEvent } from "@mui/material";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import '../../../../../components/base/form/Form.css';


interface InBuildingFilterProps {
    buildingData: { value: string, id: string }[];
    buildingValue: string;
    handleChangeSelect: (event: SelectChangeEvent) => void;
}

const InBuildingFilter: React.FC<InBuildingFilterProps> = ({buildingData, buildingValue, handleChangeSelect}) => {
    return (
        <div className={'form-row'}>
            <ComboBox label={'Building'} name={'building'} value={buildingValue} data={buildingData} 
                onChange={handleChangeSelect} width={'150px'}  labelSpace={'1.8em'}/>
        </div>
    )
}

export default InBuildingFilter;
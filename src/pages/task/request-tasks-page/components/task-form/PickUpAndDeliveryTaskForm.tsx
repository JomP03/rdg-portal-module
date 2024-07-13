import React from "react";
import ComboBox from "../../../../../components/base/combo-box/ComboBox";
import {SelectChangeEvent} from "@mui/material";
import Title from "../../../../../components/base/title/Title";
import OutlinedTextField from "../../../../../components/base/text-field/OutlinedTextField";

interface PickUpAndDeliveryTaskFormProps {
  originBuildingData: {
    value: string,
    id: string
  }[];
  originBuildingValue: string;

  originFloorData: {
    value: string,
    id: string
  }[];
  originFloorValue: string;

  originRoomData: {
    value: string,
    id: string
  }[];
  originRoomValue: string;

  destinationBuildingData: {
    value: string,
    id: string
  }[];
  destinationBuildingValue: string;

  destinationFloorData: {
    value: string,
    id: string
  }[];
  destinationFloorValue: string;

  destinationRoomData: {
    value: string,
    id: string
  }[];
  destinationRoomValue: string;

  robisepTypeData: {
    value: string,
    id: string
  }[];
  robisepTypeValue: string;

  pickUpPersonPhoneNumber: string;
  pickUpPersonPersonalName: string;

  deliveryPersonPhoneNumber: string;
  deliveryPersonPersonalName: string;

  confirmationCode: string;
  description: string;

  handleChangeSelect: (event: SelectChangeEvent) => void;
  handleChangeTextField: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const PickUpAndDeliveryTaskForm: React.FC<PickUpAndDeliveryTaskFormProps> = ({
                                                                               originBuildingData = [],
                                                                               originBuildingValue = "",
                                                                               originFloorData = [],
                                                                               originFloorValue = "",
                                                                               originRoomData = [],
                                                                               originRoomValue = "",
                                                                               destinationBuildingData = [],
                                                                               destinationBuildingValue = "",
                                                                               destinationFloorData = [],
                                                                               destinationFloorValue = "",
                                                                               destinationRoomData = [],
                                                                               destinationRoomValue = "",
                                                                               robisepTypeData = [],
                                                                               robisepTypeValue = "",
                                                                               pickUpPersonPhoneNumber = "",
                                                                               pickUpPersonPersonalName = "",
                                                                               deliveryPersonPhoneNumber = "",
                                                                               deliveryPersonPersonalName = "",
                                                                               confirmationCode = "",
                                                                               description = "",
                                                                               handleChangeSelect,
                                                                               handleChangeTextField
                                                                             }) => {

  return (
    <>

      <br></br>

      <Title text={'Pickup Information'}/>

      <br></br>

      <div className={'form-row'}>

        <ComboBox label={'Building'} name={'pickUpBuilding'} value={originBuildingValue}
                  data={originBuildingData} onChange={handleChangeSelect} width={'100%'} labelSpace={'1.1em'}/>

        <ComboBox label={'Floor'} name={'pickUpFloor'} value={originFloorValue} data={originFloorData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}/>

      </div>

      <div className={'form-row'}>

        <ComboBox label={'Room'} name={'pickUpRoom'} value={originRoomValue} data={originRoomData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'0.8em'}/>

      </div>

      <div className={'form-row'}>

        <OutlinedTextField label={'Phone Number'} value={pickUpPersonPhoneNumber}
                           onChange={handleChangeTextField} name={'pickUpPersonPhoneNumber'}
                           width={'100%'}/>

        <OutlinedTextField label={'Personal Name'} value={pickUpPersonPersonalName}
                           onChange={handleChangeTextField} name={'pickUpPersonPersonalName'}
                           width={'100%'}/>

      </div>

      <br></br>

      <Title text={'Delivery Information'}/>

      <br></br>

      <div className={'form-row'}>

        <ComboBox label={'Building'} name={'deliveryBuilding'} value={destinationBuildingValue}
                  data={destinationBuildingData} onChange={handleChangeSelect} width={'100%'}
                  labelSpace={'1.1em'}/>

        <ComboBox label={'Floor'} name={'deliveryFloor'} value={destinationFloorValue}
                  data={destinationFloorData} onChange={handleChangeSelect} width={'100%'} labelSpace={'0.7em'}/>

      </div>

      <div className={'form-row'}>

        <ComboBox label={'Room'} name={'deliveryRoom'} value={destinationRoomValue}
                  data={destinationRoomData} onChange={handleChangeSelect} width={'100%'} labelSpace={'0.8em'}/>
      </div>

      <div className={'form-row'}>

        <OutlinedTextField label={'Phone Number'} value={deliveryPersonPhoneNumber}
                           onChange={handleChangeTextField} name={'deliveryPersonPhoneNumber'}
                           width={'100%'}/>

        <OutlinedTextField label={'Personal Name'} value={deliveryPersonPersonalName}
                           onChange={handleChangeTextField} name={'deliveryPersonPersonalName'}
                           width={'100%'}/>

      </div>

      <br></br>

      <Title text={'Details'}/>

      <br></br>

      <div className={'form-row'}>

        <ComboBox label={'Robisep Type'} name={'robisepType'} value={robisepTypeValue}
                  data={robisepTypeData}
                  onChange={handleChangeSelect} width={'100%'} labelSpace={'1.8em'}/>

        <OutlinedTextField label={'Confirmation Code'} value={confirmationCode}
                           onChange={handleChangeTextField} name={'confirmationCode'}
                           width={'100%'}/>

      </div>

      <div className={'form-row'}>

        <OutlinedTextField label={'Description'} value={description}
                           onChange={handleChangeTextField} name={'description'}
                           width={'100%'}/>
      </div>

      <br></br>
    </>
  );
}


export default PickUpAndDeliveryTaskForm;
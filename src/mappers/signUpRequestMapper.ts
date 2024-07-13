import {RoomViewDto} from "../dtos/view/roomViewDto";
import {RoomInDto} from "../dtos/in/RoomInDto";
import {SignUpRequestDto} from "../dtos/out/SignUpRequestDto";
import { SignUpRequestOutDto } from "../dtos/out/SignUpRequestOutDto";
import { SignUpRequestViewDto } from "../dtos/view/signupRequestViewDto";


const mapRoomInToRoomView = (room: RoomInDto): RoomViewDto => {
  const {floor, dimensions, doorPosition, ...rest} = room;
  return {
    ...rest,
    buildingCode: floor.building.buildingCode,
    floorNumber: floor.floorNumber,
    initialY: dimensions.initialPosition.yPosition,
    initialX: dimensions.initialPosition.xPosition,
    finalY: dimensions.finalPosition.yPosition,
    finalX: dimensions.finalPosition.xPosition,
    doorX: doorPosition.xPosition,
    doorY: doorPosition.yPosition
  };
};


const mapSignUpRequestDataToSignUpRequestRequest = (userId: string | undefined, email: string, name: string,
                                                    phoneNumber: string, nif: string): SignUpRequestDto => {
  return {
    iamId: userId || '',
    email: email,
    name: name,
    phoneNumber: phoneNumber,
    nif: nif
  };
};

export {mapRoomInToRoomView, mapSignUpRequestDataToSignUpRequestRequest};


const mapSignUpRequestInDtoToSignUpRequestViewDto = (signUpRequestIn: SignUpRequestDto): SignUpRequestViewDto => {
  const {email, name, phoneNumber, nif, ...rest} = signUpRequestIn;
  return {
    ...rest,
    email: email,
    name: name,
    phoneNumber: phoneNumber,
    nif: nif
  };
};

export {mapSignUpRequestInDtoToSignUpRequestViewDto};



const mapActionDataToSignUpRequestOutDto = (action: boolean, comment: string, iamId: string): SignUpRequestOutDto => {
  return {
    action: action,
    comment: comment,
    iamId: iamId
  };
};

export {mapActionDataToSignUpRequestOutDto};

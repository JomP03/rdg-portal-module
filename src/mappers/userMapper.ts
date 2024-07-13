import { UserInDto } from "../dtos/in/UserInDto";
import { UserOutDto } from "../dtos/out/UserOutDto";
import { UserViewDto } from "../dtos/view/userViewDto";

const mapUserInDtoToUserViewDto = (userIn: UserInDto): UserViewDto => {
  const { name, email, nif, phoneNumber, } = userIn;

  return {
    name: name,
    email:email,
    nif: nif,
    phoneNumber: phoneNumber,
  };
};

export { mapUserInDtoToUserViewDto };



const mapUserDataToUserOutDto = (name: string, phoneNumber: string, nif?: string): UserOutDto => {

  if (!nif) {
    return {
      name: name,
      phoneNumber: phoneNumber,
      nif: "",
    };
  }

  return {
    name: name,
    phoneNumber: phoneNumber,
    nif: nif,
  };
};

export { mapUserDataToUserOutDto };
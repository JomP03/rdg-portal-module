import RobisepTypeInDTO from "./RobisepTypeInDto";
import {RoomInDto} from "./RoomInDto";

export default interface RobisepInDTO {
    domainId: string;
    nickname: string;
    serialNumber: string;
    code: string;
    description?: string;
    robisepType: RobisepTypeInDTO;
    room: RoomInDto;
    state: string;
}
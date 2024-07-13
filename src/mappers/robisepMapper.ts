import RobisepInDTO from "../dtos/in/RobisepInDTO";
import RobisepViewDTO from "../dtos/view/RobisepViewDTO";
import RobisepOutDTO from "../dtos/out/RobisepOutDTO";


const mapRobisepInToRobisepView = (robIsepIn: RobisepInDTO): RobisepViewDTO => {
    const { robisepType,  ...rest} = robIsepIn;
    return {
        ...rest,
        robisepTypeDesignation: robIsepIn.robisepType.designation,
        description: robIsepIn.description ? robIsepIn.description : undefined
    };
};


const mapRobisepDataToRobisepOut = (nickname?: string, serialNumber?: string, code?: string, state?: string,
                                    description?: string, robisepTypeId?: string, roomId?: string): RobisepOutDTO => {
    return {
        nickname,
        serialNumber,
        code,
        state,
        description,
        robisepTypeId,
        roomId
    };
};

export {mapRobisepInToRobisepView, mapRobisepDataToRobisepOut};

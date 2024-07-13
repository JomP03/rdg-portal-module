import RobisepTypeInDTO from "../dtos/in/RobisepTypeInDto";
import RobisepTypeViewDTO from "../dtos/view/RobisepTypeViewDto";
import RobisepTypeOutDTO from "../dtos/out/RobisepTypeOutDto";


const mapRobisepTypeInToRobisepTypeView = (room: RobisepTypeInDTO): RobisepTypeViewDTO => {
    const {tasksType, ...rest} = room;

    const newTasksType = tasksType.map(task => task === 'TRANSPORT' ? 'PICKUP AND DELIVERY' : task);

    return {
        ...rest,
        tasksType: newTasksType.join(', ')
    };
};


const mapRobisepTypeDataToRobisepTypeOut = (designation: string, brand: string,
                                            model: string, tasksType: string[]): RobisepTypeOutDTO => {

    // Iterate over tasksType array and replace 'PICK UP AND DELIVERY' by 'TRANSPORT'
    const newTasksType = tasksType.map(task => task === 'PICKUP AND DELIVERY' ? 'TRANSPORT' : task);


    return {
        designation,
        brand,
        model,
        tasksType: newTasksType
    };
};

export {mapRobisepTypeInToRobisepTypeView, mapRobisepTypeDataToRobisepTypeOut};

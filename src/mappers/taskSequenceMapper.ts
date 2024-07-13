import RequestTaskViewDto from "../dtos/view/requestTaskViewDto";
import {SequenceDTO} from "../dtos/in/TaskSequenceInDto";

export const mapTaskSequenceInToTaskSequenceView = (sequence: SequenceDTO): RequestTaskViewDto => {

    return {
      taskCode: sequence.taskCode,
      taskType: sequence.taskType == "TRANSPORT" ? "PICKUP AND DELIVERY" : "Surveillance",
      robisepType: sequence.robisepType,
      state: sequence.taskState,
      points: sequence.goal,
    };
};

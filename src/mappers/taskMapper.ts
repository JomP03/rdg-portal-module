import TaskViewDto from "../dtos/view/taskViewDto";
import TaskInDto from "../dtos/in/TaskInDto";
import {TasksType} from "../dtos/in/RobisepTypeInDto";
import TaskOutDto from "../dtos/out/taskOutDto";
import RequestTaskViewDto from "../dtos/view/requestTaskViewDto";

function buildTaskPoints(taskIn: TaskInDto, taskType: TasksType): string {
  // If the task is a surveillance task
  const stringValue = taskType.toString()
  switch (stringValue) {
    case TasksType.SURVEILLANCE:
      return `Start: ${taskIn.surveillanceTask?.startingPointToWatch.name} - End: ${taskIn.surveillanceTask?.endingPointToWatch.name}`;
    case "PICKUP AND DELIVERY":
      return `Pickup: ${taskIn.pickUpAndDeliveryTask?.pickUpRoom.name} - Deliver: ${taskIn.pickUpAndDeliveryTask?.deliveryRoom.name}`;
    default:
      return '';
  }
}

function retrieveTaskType(taskIn: TaskInDto): TasksType {
  // Check the desired task type
  const hasPickUpAndDeliveryTask = !!taskIn.pickUpAndDeliveryTask;
  const hasSurveillanceTask = !!taskIn.surveillanceTask;

  // Array with a map of the boolean value and the task type
  const taskTypes = [
    {hasPickUpAndDeliveryTask, taskType: "PICKUP AND DELIVERY"},
    {hasSurveillanceTask, taskType: TasksType.SURVEILLANCE},
  ];

  // Return the task type
  return taskTypes.filter(taskType => Object.values(taskType).includes(true))[0].taskType as TasksType;
}

const mapTaskInToRequestTaskView = (taskIn: TaskInDto): RequestTaskViewDto => {
  const {robisepType, robisep, ...rest} = taskIn;

  const taskType = retrieveTaskType(taskIn);

  // Build task points
  const points = buildTaskPoints(taskIn, taskType);

  return {
    ...rest,
    taskCode: taskIn.taskCode,
    taskType: taskType,
    robisepType: taskIn.robisepType.designation,
    state: taskIn.state,
    points: points,
  };
};

const mapTaskInToTaskView = (taskIn: TaskInDto): TaskViewDto => {
  const {robisepType, ...rest} = taskIn;

  const taskType = retrieveTaskType(taskIn);

  return {
    ...rest,
    robisepType: taskIn.robisepType.designation,
    requester: taskIn.email,
    taskType: taskType,
  };
};

const mapSurveillanceTaskDataToTaskOut = (emergencyPhoneNumber: string, iamId: string,
                                          startingPointToWatch?: string, endingPointToWatch?: string,
                                          robisepType?: string): TaskOutDto => {
  return {
    robisepType,
    iamId,
    surveillanceTask: {
      emergencyPhoneNumber,
      startingPointToWatch,
      endingPointToWatch,
    },
  };
};

const mapPickUpAndDeliveryTaskDataToTaskOut = (pickUpPersonPhoneNumber: string, pickUpPersonPersonalName: string,
                                               deliveryPersonPhoneNumber: string, deliveryPersonPersonalName: string,
                                               confirmationCode: number, description: string,
                                               iamId: string, robisepType?: string,
                                               pickUpRoom?: string, deliveryRoom?: string): TaskOutDto => {
  return {
    robisepType,
    iamId,
    pickUpAndDeliveryTask: {
      pickUpPersonContact: {
        name: pickUpPersonPersonalName,
        phoneNumber: pickUpPersonPhoneNumber,
      },
      deliveryPersonContact: {
        name: deliveryPersonPersonalName,
        phoneNumber: deliveryPersonPhoneNumber,
      },
      description,
      confirmationCode,
      pickUpRoom,
      deliveryRoom,
    },
  };
};

export {mapTaskInToRequestTaskView, mapTaskInToTaskView, mapSurveillanceTaskDataToTaskOut, mapPickUpAndDeliveryTaskDataToTaskOut};

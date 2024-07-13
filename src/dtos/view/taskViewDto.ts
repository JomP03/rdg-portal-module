export default interface TaskViewDto {
  // Requester is the email of the user who requested the task
  requester: string;
  taskType: string;
  robisepType: string;
  state: string;
}
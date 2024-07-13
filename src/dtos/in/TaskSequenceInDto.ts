export interface SequenceDTO {
  taskCode: number;
  taskType: string;
  robisepType: string;
  taskState: string;
  goal: string;
}

export default interface ITaskSequenceInDTO {
  robisepNickname: string;
  Sequence: SequenceDTO[];
  cost: number;
}
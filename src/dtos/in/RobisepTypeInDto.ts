export default interface RobisepTypeInDTO {
    domainId: string;
    designation: string;
    brand: string;
    model: string;
    tasksType: string[];
}

export enum TasksType {
    TRANSPORT = 'TRANSPORT',
    SURVEILLANCE = 'SURVEILLANCE',
}
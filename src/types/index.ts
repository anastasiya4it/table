export interface ProjectItemType {
  id: number;
  name: string;
  numberOfTasks: number;
  status: string;
  date: string;
  description: string;
}
export interface TaskItemType {
  taskId: number;
  projectId: number;
  name: string;
  status: Status;
  date: string;
  description: string;
  assignee: string;
}
export enum Status {
  "To Do" = "To Do",
  "In Progress" = "In Progress",
  "Done" = "Done",
}

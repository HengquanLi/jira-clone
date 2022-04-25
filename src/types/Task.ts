export interface Task {
  id: number;
  name: string;
  //manager
  managerId: number;
  projectId: number;
  //task group
  epicId: number;
  kanbanId: number;
  //bug or task
  typeId: number;
  note: string;
}

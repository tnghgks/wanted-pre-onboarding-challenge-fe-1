export interface IToDo {
  title: string;
  content: string;
  id: string;
  createAt: string;
  updatedAt: string;
}

export interface IAxiosToDo {
  data: IToDo;
}

export interface IUpdateData {
  titleValue: string;
  contentValue: string;
}

export interface IUpdateToDo {
  id: string;
  updateData: {};
}

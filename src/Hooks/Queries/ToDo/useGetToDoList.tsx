import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";
import { IToDo } from "../../../Types/toDo";

export interface IToDoList {
  data?: IToDo[] | undefined;
}

const useGetToDoList = () => {
  return useQuery("todos", toDoApi.getToDoList, {
    select: ({ data: { data } }: AxiosResponse<IToDoList>): IToDo[] | undefined => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useGetToDoList;

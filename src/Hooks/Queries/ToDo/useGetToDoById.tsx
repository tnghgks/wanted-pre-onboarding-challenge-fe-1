import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";
import { IToDoList } from "../../../Types/toDo";

const useGetToDoById = (id: string | undefined) => {
  return useQuery(["todoDetail", id], () => toDoApi.getToDoById(id), {
    select: (data: AxiosResponse<IToDoList>) => {
      console.log(data);
      return data.data;
    },
    retry: false,
    onError: () => {
      alert("해당 ToDo를 찾을 수 없습니다.");
      window.location.href = "/";
    },
  });
};

export default useGetToDoById;

import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";
import { IAxiosToDo } from "../../../Types/toDo";

const useGetToDoById = (id: string | undefined) => {
  return useQuery(["todoDetail", id], () => toDoApi.getToDoById(id), {
    select: ({ data: { data } }: AxiosResponse<IAxiosToDo>) => {
      if (data && typeof data === "object") {
        return data;
      }
      return {
        title: "",
        content: "",
        id: "",
        createAt: "",
        updatedAt: "",
      };
    },
    retry: false,
    onError: () => {
      alert("해당 ToDo를 찾을 수 없습니다.");
      window.location.href = "/";
    },
  });
};

export default useGetToDoById;

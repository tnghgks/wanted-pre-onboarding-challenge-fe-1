import { AxiosError, AxiosResponse } from "axios";
import { useQueryClient, useMutation } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";
import { IUpdateData } from "../../../Types/toDo";

interface IUpdateType {
  id?: string;
  updateData: IUpdateData;
}

const useUpdateToDo = () => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, IUpdateType>(
    ({ id, updateData }) => {
      return toDoApi.updateToDo(id, updateData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        queryClient.invalidateQueries("todoDetail");
      },
    }
  );
};

export default useUpdateToDo;

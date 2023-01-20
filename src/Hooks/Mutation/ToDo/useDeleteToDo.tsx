import { useQueryClient, useMutation } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";

const useDeleteToDo = () => {
  const queryClient = useQueryClient();
  return useMutation((toDoId: string | undefined) => toDoApi.deleteToDo(toDoId), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      queryClient.invalidateQueries("todoDetail");
    },
  });
};

export default useDeleteToDo;

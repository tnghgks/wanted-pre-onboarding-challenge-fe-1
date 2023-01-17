import { useQueryClient, useMutation } from "react-query";
import { toDoApi } from "../../../Api/ToDo/toDo";

interface ICreateType {
  title: string;
  content: string;
}

const useCreateToDo = () => {
  const queryClient = useQueryClient();
  return useMutation(({ title, content }: ICreateType) => toDoApi.createToDo(title, content), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export default useCreateToDo;

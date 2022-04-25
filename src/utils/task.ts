import { useQuery } from 'react-query';
import { Task } from 'types/Task';
import { useHttp } from 'utils/http';

export const useTask = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: param })
  );
};

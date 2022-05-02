import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/Task';
import { useHttp } from 'utils/http';
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderTaskConfig } from './use-optimistic';

export const useTask = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client('tasks', {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};

export const useGetTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task>(
    ['task', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  // const queryKey = ['projects', useProjectsSearchParam()];
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, { data: params, method: 'PATCH' }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({id}:{id: number}) => client(`tasks/${id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  //reorder item
  fromId: number;
  //target item
  referenceId: number;
  //before or after target item
  type: 'before' | 'after';

  fromDashboardId?:number;
  toDashboardId?:number
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client('tasks/reorder', { data: params, method: 'POST' });
  }, useReorderTaskConfig(queryKey));
};
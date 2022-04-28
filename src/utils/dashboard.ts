import { QueryKey, useMutation, useQuery } from 'react-query';
import { Kanban } from 'types/Kanban';
import { Task } from 'types/Task';
import { useHttp } from 'utils/http';
import { useAddConfig } from './use-optimistic';

export const useDashboard = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', { data: param })
  );
};

export const useAddDashboard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client('kanbans', {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey)
  );
};


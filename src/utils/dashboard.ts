import { useQuery } from 'react-query';
import { Kanban } from 'types/Kanban';
import { useHttp } from 'utils/http';

export const useDashboard = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () =>
    client('kanbans', { data: param })
  );
};

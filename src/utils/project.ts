
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';
import { Project } from 'types/Project';
import { useHttp } from 'utils/http';
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  );
  // const { run, ...result } = useAsync<Project[]>();
  // const fetchProjects = () =>
  //   client('projects', { data: cleanObject(param || {}) });

  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects }).then();
  // }, [param]);

  // return result;
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // const queryKey = ['projects', useProjectsSearchParam()];
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: 'PATCH' }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client('projects', { data: params, method: 'POST' }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id:number) =>
      client(`projects/${id}`, {  method: 'DELETE' }),
    useDeleteConfig(queryKey)
  );
};


export const useGetProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ['projects', { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};

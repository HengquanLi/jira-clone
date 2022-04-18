import { Project } from 'components/list/List';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHttp } from 'utils/http';

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

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { data: params, method: 'PATCH' }),
    { onSuccess: () => queryClient.invalidateQueries('projects') }
  );

  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, { data: params, method: 'PATCH' })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client('projects', { data: params, method: 'POST' }),
    { onSuccess: () => queryClient.invalidateQueries('projects') }
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   run(client(`projects/${params.id}`, { data: params, method: 'POST' }));
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
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

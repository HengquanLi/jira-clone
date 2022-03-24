import { Project } from 'components/list/List';
import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/use-async';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) })).then();
  }, [param]);

  return result;
};

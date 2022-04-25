import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useGetProject } from 'utils/project';
import { useUrlQueryParam } from 'utils/url';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useGetProject(useProjectIdInUrl());

export const useDashboardsSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useDashboardsQueryKey = () => [
  'kanbans',
  useDashboardsSearchParams(),
];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId',
  ]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId:Number(param.tagId) ||undefined,
      name:param.name
    }),
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

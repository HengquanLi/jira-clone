import { useLocation } from 'react-router';
import { useGetProject } from 'utils/project';

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useGetProject(useProjectIdInUrl());

export const useDashboardsSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useDashboardsQueryKey = ()=>['kanbans',useDashboardsSearchParams()]

export const useTasksSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];
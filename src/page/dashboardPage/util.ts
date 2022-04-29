import { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useDebounce } from 'utils';
import { useGetProject } from 'utils/project';
import { useGetTask } from 'utils/task';
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
  const debouncedName = useDebounce(param.name,200)
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId',
  ]);
  const { data: editingTask, isLoading } = useGetTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    close,
    isLoading,
    startEdit,
  };
};

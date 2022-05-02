import { useProjectIdInUrl } from 'page/dashboardPage/util';

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()];

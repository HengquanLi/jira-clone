import styled from '@emotion/styled';
import { Spin } from 'antd';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useDashboard } from 'utils/dashboard';
import { useTask } from 'utils/task';
import { CreatDashboard } from './CreatDashboard';
import DashboardColumn from './DashboardColumn';
import SearchPanel from './SearchPanel';
import TaskModal from './TaskModal';
import {
  useDashboardsSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from './util';

const DashboardPage = () => {
  useDocumentTitle('Dashboard list');
  const { data: dashboards, isLoading: dashboardsLoading } = useDashboard(
    useDashboardsSearchParams()
  );
  // console.log(dashboards)
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: taskIsloading } = useTask(useTasksSearchParams());
  const isLoading = taskIsloading || dashboardsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name} dashboard</h1>
      <SearchPanel />

      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {dashboards?.map((dahsboard) => (
            <DashboardColumn dahsboard={dahsboard} key={dahsboard.id} />
          ))}
          <CreatDashboard />
        </ColumnContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

export default DashboardPage;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

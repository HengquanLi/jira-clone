import styled from '@emotion/styled';
import React from 'react';
import { useDocumentTitle } from 'utils';
import { useDashboard } from 'utils/dashboard';
import DashboardColumn from './DashboardColumn';
import { useDashboardsSearchParams, useProjectInUrl } from './util';

const DashboardPage = () => {
  useDocumentTitle('Dashboard list');
  const { data: dashboards } = useDashboard(useDashboardsSearchParams());
  // console.log(dashboards)
  const { data: currentProject } = useProjectInUrl();
  return (
    <div>
      <h1>{currentProject?.name} dashboard</h1>
      <ColumnContainer>
        {dashboards?.map((kanban) => (
          <DashboardColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  );
};

export default DashboardPage;

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;

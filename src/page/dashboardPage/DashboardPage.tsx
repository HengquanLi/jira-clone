import styled from '@emotion/styled';
import { Spin } from 'antd';
import { Drag, Drop, DropChild } from 'components/dragAndDrop/DragAndDrop';
import React, { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useDocumentTitle } from 'utils';
import { useDashboard, useReorderDashboard } from 'utils/dashboard';
import { useReorderTask, useTask } from 'utils/task';
import { CreatDashboard } from './CreatDashboard';
import DashboardColumn from './DashboardColumn';
import SearchPanel from './SearchPanel';
import TaskModal from './TaskModal';
import {
  useDashboardsQueryKey,
  useDashboardsSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
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

  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name} dashboard</h1>
        <SearchPanel />

        {isLoading ? (
          <Spin size="large" />
        ) : (
          <ColumnContainer>
            <Drop
              type={'COLUMN'}
              direction={'horizontal'}
              droppableId={'dashboard'}
            >
              <DropChild style={{ display: 'flex' }}>
                {dashboards?.map((dashboard, index) => (
                  <Drag
                    key={dashboard.id}
                    draggableId={'dashboard' + dashboard.id}
                    index={index}
                  >
                    <DashboardColumn dashboard={dashboard} key={dashboard.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreatDashboard />
          </ColumnContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: dashboards } = useDashboard(useDashboardsSearchParams());
  const { mutate: reorderDashboard } = useReorderDashboard(
    useDashboardsQueryKey()
  );
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  const { data: allTasks = [] } = useTask(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === 'COLUMN') {
        const fromId = dashboards?.[source.index].id;
        const toId = dashboards?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? 'after' : 'before';
        reorderDashboard({ fromId, referenceId: toId, type });
      }
      if (type === 'ROW') {
        const fromDashboardId = +source.droppableId;
        const toDashboardId = +destination.droppableId;
        // if (fromDashboardId === toDashboardId) {
        //   return;
        // }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromDashboardId
        )[source.index];
        const toTask = allTasks.filter(
          (task) => task.kanbanId === toDashboardId
        )[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromDashboardId,
          toDashboardId,
          type:
            fromDashboardId === toDashboardId &&
            destination.index > source.index
              ? 'after'
              : 'before',
        });
      }
    },
    [dashboards, reorderDashboard, allTasks, reorderTask]
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

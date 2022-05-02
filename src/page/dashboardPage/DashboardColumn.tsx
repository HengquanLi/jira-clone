import styled from '@emotion/styled';
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import BugIcon from 'assets/bug';
import TaskIcon from 'assets/taskIcon';
import { Drag, Drop, DropChild } from 'components/dragAndDrop/DragAndDrop';
import Marker from 'components/Mark/Marker';
import Row from 'components/row/Row';
import React from 'react';
import { Kanban } from 'types/Kanban';
import { useDeleteDashboard } from 'utils/dashboard';
import { useTask } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { CreateTask } from './CreatTask';
import {
  useDashboardsQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from './util';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return name === 'task' ? <TaskIcon /> : <BugIcon />;
};

const DashboardColumn = React.forwardRef<HTMLDivElement, { dashboard: Kanban }>(
  ({ dashboard, ...props }, ref) => {
    const { startEdit } = useTasksModal();
    const { data: allTasks } = useTask(useTasksSearchParams());
    // console.log(allTasks);
    const tasks = allTasks?.filter((task) => task.kanbanId === dashboard.id);
    const { name: keyword } = useTasksSearchParams();
    return (
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{dashboard.name}</h3>
          <More kanban={dashboard} key={dashboard.id} />
        </Row>
        <TasksContainer>
          <Drop
            type={'ROW'}
            direction={'vertical'}
            droppableId={String(dashboard.id)}
          >
            <DropChild style={{ minHeight: '1rem' }}>
              {tasks?.map((task, taskIndex) => (
                <Drag
                  key={task.id}
                  index={taskIndex}
                  draggableId={'task' + task.id}
                >
                  <div>
                    <Card
                      onClick={() => startEdit(task.id)}
                      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
                      key={task.id}
                    >
                      {/* <div>{task.name}</div> */}
                      <p>
                        <Marker keyword={keyword} name={task.name} />
                      </p>
                      <TaskTypeIcon id={task.typeId} />
                    </Card>
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={dashboard.id} />
        </TasksContainer>
      </Container>
    );
  }
);

export default DashboardColumn;

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteDashboard(useDashboardsQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: 'Confirm',
      cancelText: 'Cancel',
      title: 'Confirm to delete',
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={startDelete}>
          Delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color:rgb(244,245,247) !important;
  display:flex !important
  flex-direction: column;
  padding:0.7rem 0.7rem 1rem;
  margin-right:1.5rem
`;

const TasksContainer = styled.div`
  /* overflow: scroll; */
  flex: 1;
  /* ::-webkit-scrollbar {
    display: none;
  } */
`;

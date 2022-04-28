import styled from '@emotion/styled';
import { Card } from 'antd';
import BugIcon from 'assets/bug';
import TaskIcon from 'assets/taskIcon';
import Row from 'components/row/Row';
import React from 'react';
import { Kanban } from 'types/Kanban';
import { useTask } from 'utils/task';
import { useTaskTypes } from 'utils/task-type';
import { CreateTask } from './CreatTask';
import { useTasksModal, useTasksSearchParams } from './util';

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return name === 'task' ? <TaskIcon /> : <BugIcon />;
};

const DashboardColumn = ({ dahsboard }: { dahsboard: Kanban }) => {
  const { startEdit } = useTasksModal();
  const { data: allTasks } = useTask(useTasksSearchParams());
  // console.log(allTasks);
  const tasks = allTasks?.filter((task) => task.kanbanId === dahsboard.id);
  return (
    <Container>
      <Row between={true}>
        <h3>{dahsboard.name}</h3>
        {/* <More kanban={kanban} key={kanban.id} /> */}
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
            key={task.id}
          >
            <div>{task.name}</div>
            {/* <BugIcon /> */}
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={dahsboard.id} />
      </TasksContainer>
    </Container>
  );
};

export default DashboardColumn;

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

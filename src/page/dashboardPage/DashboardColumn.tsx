import styled from '@emotion/styled';
import { Card } from 'antd';
// import bugIcon from 'assets/bug.svg';
// import taskIcon from 'assets/task.svg';
import React from 'react';
import { Kanban } from 'types/Kanban';
import { useTask } from 'utils/task';
import { useTasksSearchParams } from './util';

// const TaskTypeIcon = ({ id }: { id: number }) => {
//   const { data: taskTypes } = useTaskTypes();
//   const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
//   if (!name) return null;
//   return <img src={name === 'task' ? taskIcon : bugIcon} alt="" />;
// };

const DashboardColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTask(useTasksSearchParams());
  console.log(allTasks);
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
          <div>{task.name}</div>
          {/* <TaskTypeIcon id={task.typeId} /> */}
        </Card>
      ))}
    </Container>
  );
};

export default DashboardColumn;

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color:rgb(244,245,247) !important;
  display:flex !important
  flex-direction: column;
  padding:0.7rem 0.7rem 1rem;
  margin-right:1.5rem
`;

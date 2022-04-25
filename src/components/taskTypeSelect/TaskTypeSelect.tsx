import IdSelect from 'components/idSelect/IdSelect';
import React from 'react';
import { useTaskTypes } from 'utils/task-type';
import { useUsers } from 'utils/user';

const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};

export default TaskTypeSelect;

import { Button, Input } from 'antd';
import { Row } from 'components';
import TaskTypeSelect from 'components/taskTypeSelect/TaskTypeSelect';
import UserSelect from 'components/userSelect/UserSelect';
import React from 'react';
import { useSetUrlSearchParams } from 'utils/url';
import { useTasksSearchParams } from './util';

const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row style={{ marginBottom: '4rem' }} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'Task'}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={'The one'}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={'type'}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>Clear</Button>
    </Row>
  );
};

export default SearchPanel;

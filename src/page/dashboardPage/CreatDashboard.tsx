import React, { useState } from 'react';
import { useDashboardsQueryKey, useProjectIdInUrl } from 'page/dashboardPage/util';
import { useAddDashboard } from 'utils/dashboard';
import { Input } from 'antd';
import { Container } from 'page/dashboardPage/DashboardColumn';

export const CreatDashboard = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDashboard(
    useDashboardsQueryKey()
  );

  const submit = async () => {
    await addDashboard({ name, projectId });
    setName('');
  };

  return (
    <Container>
      <Input
        size={'large'}
        placeholder={'New dashboard name'}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};

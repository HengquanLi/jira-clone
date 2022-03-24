import { Typography } from 'antd';
import FullPage from 'components/fullPage/FullPage';
import React from 'react';

const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    </FullPage>
  );
};

export default FullPageErrorFallback;

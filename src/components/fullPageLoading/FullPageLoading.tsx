import styled from '@emotion/styled';
import { Spin } from 'antd';
import FullPage from 'components/fullPage/FullPage';
import React from 'react';

const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size={'large'} />
    </FullPage>
  );
};



export default FullPageLoading;

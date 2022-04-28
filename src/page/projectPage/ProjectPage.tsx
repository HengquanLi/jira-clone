import styled from '@emotion/styled';
import { Menu } from 'antd';
import { DashboardPage, EpicPage } from 'page';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const useRouteType = () => {
  const units = useLocation().pathname.split('/');
  return units[units.length - 1];
};

const ProjectPage = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>Task Group</Link>
          </Menu.Item>
        </Menu>
        {/* <Link to={'epic'}>Task Group</Link> */}
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<DashboardPage />} />
          <Route path={'/epic'} element={<EpicPage />} />
          {/* <Navigate to={window.location.pathname + '/dashboard'} /> */}
        </Routes>
      </Main>
    </Container>
  );
};

export default ProjectPage;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Aside = styled.aside`
background-color:rgba(244,245,247)
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;

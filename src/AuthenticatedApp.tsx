import styled from '@emotion/styled';
import { Dropdown, Menu } from 'antd';
import { useAuth } from 'context/auth-context';
import { ListPage } from 'page';
import React from 'react';
import { ReactComponent as AppLogo } from './assets/software-logo.svg';
import { Row } from './components';

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          {/* import svg as a component to styling */}
          <AppLogo width={'18rem'} color={'rgb(38,132,255)'} />
          {/* <img src={appLogo} alt="jira" /> */}
          <h2>Logo</h2>
          <h2>Projects</h2>
          <h2>User</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={'logout'}>
                  <a onClick={logout}>Logout</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ListPage />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  /* display:flex; */
`;

export default AuthenticatedApp;

import styled from '@emotion/styled';
import { useAuth } from 'context/auth-context';
import { ListPage } from 'page';
import React from 'react';

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Projects</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Logout</button>
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
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  height: 100vh;
  grid-template-areas: 'header header header' 'nav main side' ;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;

export default AuthenticatedApp;

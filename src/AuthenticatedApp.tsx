import styled from '@emotion/styled';
import { Header } from 'components';
import { ProjectListPage, ProjectPage } from 'page';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/:projectId/*" element={<ProjectPage />} />
          </Routes>
        </Main>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  /* display:flex; */
`;

export default AuthenticatedApp;

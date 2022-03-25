import { DashboardPage, EpicPage } from 'page';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

const ProjectPage = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'dashboard'}>Dash Board</Link>
      <Link to={'epic'}>Task Group</Link>
      <Routes>
        <Route path={'dashboard'} element={<DashboardPage />} />
        <Route path={'epic'} element={<EpicPage />} />
      </Routes>
      {/* <Navigate to={window.location.pathname + '/dashboard'} /> */}
    </div>
  );
};

export default ProjectPage;

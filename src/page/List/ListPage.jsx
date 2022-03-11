import React, { useState, useEffect } from 'react';
import * as qs from 'qs';
import { cleanObject } from '../../utils';

import { List, SearchPanel } from '../../components';

const ListPage = () => {
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState({
    name: '',
    personId: '',
  });
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/projects?${qs.stringify(cleanObject(project))}`
    ).then(async (res) => {
      if (res.ok) {
        setProjectsList(await res.json());
      }
    });
  }, [project]);

  useEffect(() => {
    fetch('http://localhost:3001/users').then(async (res) => {
      if (res.ok) {
        setUsers(await res.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} project={project} setProject={setProject} />
      <List users={users} projectsList={projectsList} />
    </div>
  );
};

export default ListPage;

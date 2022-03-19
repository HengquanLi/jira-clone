import { useEffect, useState } from 'react';
import { useHttp } from 'utils/http';
import { List, SearchPanel } from '../../components';
import { cleanObject, useDebounce, useMount } from '../../utils';

const apiUrl = process.env.REACT_APP_API_URL;

const ListPage = () => {
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState({
    name: '',
    personId: '',
  });
  const [projectsList, setProjectsList] = useState([]);

  const debounceProject = useDebounce(project, 2000);
  const client = useHttp();

  useEffect(() => {
    client('projects', { data: cleanObject(debounceProject) }).then(
      setProjectsList
    );
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debounceProject))}`
    // ).then(async (res) => {
    //   if (res.ok) {
    //     setProjectsList(await res.json());
    //   }
    // });
  }, [debounceProject]);

  useMount(() => {
    //then(setUsers) => then(res=>setUsers(res))
    client('users').then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (res) => {
    //   if (res.ok) {
    //     setUsers(await res.json());
    //   }
    // });
  });

  return (
    <div>
      <SearchPanel users={users} project={project} setProject={setProject} />
      <List users={users} projectsList={projectsList} />
    </div>
  );
};

export default ListPage;

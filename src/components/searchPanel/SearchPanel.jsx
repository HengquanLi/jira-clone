import React, { useState } from 'react';

const SearchPanel = () => {
  const [project, setProject] = useState({
    name: '',
    personId: '',
  });
  const [users, setUsers] = useState([]);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    fetch('').then(async (res) => {
      if (res.ok) {
      }
    });

    return () => {
      second;
    };
  }, [third]);

  return (
    <form action="">
      <div>
        <input
          type="text"
          value={project.name}
          onChange={(event) =>
            setProject({
              ...project,
              name: event.target.value,
            })
          }
        />
        <select
          value={project.personId}
          onChange={(event) =>
            setProject({
              ...project,
              personId: event.target.value,
            })
          }
        >
          <option value={''}>Manager</option>
          {users.map((user) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;

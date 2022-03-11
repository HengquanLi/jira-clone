import React, { useState } from 'react';

const SearchPanel = ({users,project, setProject }) => {

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
          <option value={''}>Leader</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;

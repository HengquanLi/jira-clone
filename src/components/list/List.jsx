import React from 'react';

const List = ({ users, projectsList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Leader</th>
        </tr>
      </thead>
      <tbody>
        {projectsList.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                '...'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;

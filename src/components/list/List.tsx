import React from 'react';
import { User } from '../searchPanel/SearchPanel';

interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
}

interface ListProps {
  projectsList: Project[];
  users: User[];
}

const List = ({ users, projectsList }: ListProps) => {
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

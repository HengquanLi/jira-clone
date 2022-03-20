import { Input, Select } from 'antd';
import React, { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  project: {
    name: string;
    personId: string;
  };
  setProject: (project: SearchPanelProps['project']) => void;
}

const SearchPanel = ({ users, project, setProject }: SearchPanelProps) => {
  return (
    <form action="">
      <div>
        <Input
          type="text"
          value={project.name}
          onChange={(event) =>
            setProject({
              ...project,
              name: event.target.value,
            })
          }
        />
        <Select
          value={project.personId}
          onChange={value =>
            setProject({
              ...project,
              personId: value,
            })
          }
        >
          <Select.Option value={''}>Leader</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};

export default SearchPanel;

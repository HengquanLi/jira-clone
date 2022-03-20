import { Table } from 'antd';
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
    <Table
      pagination={false}
      columns={[
        {
          title: 'Title',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Leader',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '...'}
              </span>
            );
          },
        },
      ]}
      dataSource={projectsList}
    />
  );
};

export default List;

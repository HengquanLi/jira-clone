import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { User } from '../searchPanel/SearchPanel';

export interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
  created:number;
}

interface ListProps extends TableProps<Project>{
  users: User[];
}

const List = ({ users, ...props }: ListProps) => {
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
          title: 'Department',
          dataIndex: 'organization',
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
        { 
          title:'Reacted time',
          render(value,project) {
            return <span>
              {project.created? dayjs(project.created).format('YYYY-MM-DD'):'...'}
            </span>
          }
        }
      ]}
      {...props}
    />
  );
};

export default List;

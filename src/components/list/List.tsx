import { Table, TableProps } from 'antd';
import Pin from 'components/pin/Pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { useEditProject } from 'utils/project';
import { User } from '../searchPanel/SearchPanel';

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  pin: boolean;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: 'Title',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`${String(project.id)}/dashboard`}>{project.name}</Link>
            );
          },
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
          title: 'Reacted time',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '...'}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;

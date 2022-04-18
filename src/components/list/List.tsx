import { Dropdown, Menu, Table, TableProps } from 'antd';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import Pin from 'components/pin/Pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { useProjectModal } from 'utils';
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
  // projectButton: JSX.Element;
}

const List = ({ users, ...props }: ListProps) => {
  // console.log(users)
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  return (
    <Table
      rowKey={'id'}
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
          dataIndex: 'department',
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'} onClick={editProject(project.id)}>
                      Edit...
                      {/* {props.projectButton} */}
                    </Menu.Item>
                    <Menu.Item key={'delete'}>
                      Delete
                      {/* {props.projectButton} */}
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default List;

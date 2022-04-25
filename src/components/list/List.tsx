import { Dropdown, Menu, Modal, Table, TableProps } from 'antd';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import Pin from 'components/pin/Pin';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from 'types/Project';
import { User } from 'types/User';
import { useProjectModal, useProjectsQueryKey } from 'utils';
import { useDeleteProject, useEditProject } from 'utils/project';

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
  // projectButton: JSX.Element;
}

const List = ({ users, ...props }: ListProps) => {
  // console.log(users)
  const { mutate } = useEditProject(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
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
              <Link to={`${String(project.id)}/kanban`}>{project.name}</Link>
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
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete?',
      content: 'Click "Yes" to delete this project.',
      okText: 'Yes',
      onOk() {
        deleteProject(id);
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'edit'} onClick={editProject(project.id)}>
            Edit...
            {/* {props.projectButton} */}
          </Menu.Item>
          <Menu.Item key={'delete'} onClick={() => confirmDelete(project.id)}>
            Delete
            {/* {props.projectButton} */}
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};

export default List;

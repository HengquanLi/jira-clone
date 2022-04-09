import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import { projectListActions } from 'page/projectListPage/projectList.slice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useProjects } from 'utils/project';

const ProjectPopover = () => {
  const dispatch = useDispatch()
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text>Saved Project</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        Creat New Project
      </ButtonNoPadding>
      {/* {props.projectButton} */}
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span style={{ cursor: 'pointer' }}>Projects</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;

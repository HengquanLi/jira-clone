import styled from '@emotion/styled';
import { Divider, List, Popover, Typography } from 'antd';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import React from 'react';
import { useProjects } from 'utils/project';

const ProjectPopover = () => {
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
      <ButtonNoPadding type="link">Creat New Project</ButtonNoPadding>
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

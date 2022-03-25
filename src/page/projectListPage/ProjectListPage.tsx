import styled from '@emotion/styled';
import { List, SearchPanel } from 'components';
import { useState } from 'react';
import { useDebounce, useDocumentTitle } from 'utils';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

const ProjectListPage = () => {
  const [project, setProject] = useState({
    name: '',
    personId: '',
  });

  const debounceProject = useDebounce(project, 200);

  const { isLoading, error, data: list } = useProjects(debounceProject);
  const { data: users } = useUsers();
  useDocumentTitle('Project List', false);
  return (
    <Container>
      <h1>Projects List</h1>
      <SearchPanel
        users={users || []}
        project={project}
        setProject={setProject}
      />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListPage;

import styled from '@emotion/styled';
import { Typography } from 'antd';
import { List, SearchPanel } from 'components';
import { useDebounce, useDocumentTitle, useProjectsSearchParam } from 'utils';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

const ProjectListPage = () => {
  useDocumentTitle('Project List', false);

  const [param, setParam] = useProjectsSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>Projects List</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

export default ProjectListPage;

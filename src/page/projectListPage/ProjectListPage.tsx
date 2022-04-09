import styled from '@emotion/styled';
import { Typography } from 'antd';
import { List, Row, SearchPanel } from 'components';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import { useDispatch } from 'react-redux';
import { useDebounce, useDocumentTitle, useProjectsSearchParam } from 'utils';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { projectListActions } from './projectList.slice';

const ProjectListPage = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('Project List', false);

  const [param, setParam] = useProjectsSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const dispatch = useDispatch();
  // console.log(list)
  return (
    <Container>
      <Row between={true}>
        <h1>Projects List</h1>
        <ButtonNoPadding
          type="link"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          Create New Project
        </ButtonNoPadding>
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        // setProjectModalOpen={props.setProjectModalOpen}
        projectButton={props.projectButton}
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

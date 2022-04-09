import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { List, Row, SearchPanel } from 'components';
import ButtonNoPadding from 'components/buttonNoPadding/ButtonNoPadding';
import { useDebounce, useDocumentTitle, useProjectModal, useProjectsSearchParam } from 'utils';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

const ProjectListPage = () => {
  useDocumentTitle('Project List', false);
  const {open} =useProjectModal()

  const [param, setParam] = useProjectsSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  // console.log(list)
  return (
    <Container>
      <Row between={true}>
        <h1>Projects List</h1>
        <ButtonNoPadding type="link" onClick={open}>
          Creat New Project
        </ButtonNoPadding>
        {/* {props.projectButton} */}
      </Row>

      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        // setProjectModalOpen={props.setProjectModalOpen}
        // projectButton={props.projectButton}
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

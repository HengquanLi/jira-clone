import styled from '@emotion/styled';
import { Button, Drawer, Form, Input, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import ErrorBox from 'components/errorBox/ErrorBox';
import UserSelect from 'components/userSelect/UserSelect';
import React, { useEffect } from 'react';
import { useProjectModal, useProjectsQueryKey } from 'utils';
import { useAddProject, useEditProject } from 'utils/project';

const ProjectModal = () => {
  const { projectModalOpen, close, isLoading, editingProject } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? 'Edit project' : 'Create project';

  useEffect(() => {
    form.setFieldsValue(editingProject);
    // console.log(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      width={'100%'}
      visible={projectModalOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={'vertical'}
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'Name'}
                name={'name'}
                rules={[
                  { required: true, message: 'Please put project name!' },
                ]}
              >
                <Input placeholder="Project Name" />
              </Form.Item>
              <Form.Item
                label={'Department'}
                name={'department'}
                rules={[
                  { required: true, message: 'Please put department name!' },
                ]}
              >
                <Input placeholder="Department Name" />
              </Form.Item>
              <Form.Item label={'Leader'} name={'personId'}>
                <UserSelect defaultOptionName="Leader" />
              </Form.Item>
              <Form.Item style={{textAlign: 'right'}}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProjectModal;

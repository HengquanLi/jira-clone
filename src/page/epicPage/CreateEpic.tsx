import styled from '@emotion/styled';
import { Button, Drawer, DrawerProps, Form, Input, Spin } from 'antd';
import ErrorBox from 'components/errorBox/ErrorBox';
import { useProjectIdInUrl } from 'page/dashboardPage/util';
import React, { useEffect } from 'react'
import { useAddEpic } from 'utils/epic';

const CreateEpic = (
  props: Pick<DrawerProps, 'visible'> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>Create Task Group</h1>
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
                rules={[{ required: true, message: 'Please put Task Group Name' }]}
              >
                <Input placeholder={'Task Group Name'} />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button
                  loading={isLoading}
                  type={'primary'}
                  htmlType={'submit'}
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

export default CreateEpic

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
function useEpicsQueryKey(): import("react-query").QueryKey {
  throw new Error('Function not implemented.');
}


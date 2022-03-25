import { Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { useAsync } from 'utils/use-async';
import { LongButton } from 'components';

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: 'Username is required' }]}
      >
        <Input placeholder={'username'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: 'Password is required' }]}
      >
        <Input placeholder={'password'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;

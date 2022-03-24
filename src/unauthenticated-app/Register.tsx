import { Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { useAsync } from 'utils/use-async';
import { LongButton } from './UnAuthenticatedApp';

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('Please confirm your password!'));
      return;
    }
    run(register(values)).catch(onError);
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
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: 'Please confirm your password' }]}
      >
        <Input
          placeholder={'confim password'}
          type="password"
          id={'cpassword'}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={'primary'} htmlType={'submit'}>
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default Register;

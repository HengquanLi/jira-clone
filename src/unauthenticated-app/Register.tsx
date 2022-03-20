import { Button, Form, Input } from 'antd';
import { LongButton } from './UnAuthenticatedApp';
import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';

const Register = () => {
   const { register, user } = useAuth();

   const handleSubmit = (values: { username: string; password: string }) => {
     register(values);
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
         <LongButton type={'primary'} htmlType={'submit'}>
           Register
         </LongButton>
       </Form.Item>
     </Form>
   );
};

export default Register;

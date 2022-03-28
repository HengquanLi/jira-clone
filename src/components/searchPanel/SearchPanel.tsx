import { Form, Input } from 'antd';
import { Project } from 'components/list/List';
import UserSelect from 'components/userSelect/UserSelect';
import React from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: (param: SearchPanelProps['param']) => void;
}

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder={'project name'}
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'Leader'}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};

export default SearchPanel;

import { Form, Input } from 'antd';
import UserSelect from 'components/userSelect/UserSelect';
import React from 'react';
import { Project } from 'types/Project';
import { User } from '../../types/User';

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

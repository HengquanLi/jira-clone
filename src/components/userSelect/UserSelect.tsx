import IdSelect from 'components/idSelect/IdSelect';
import React from 'react';
import { useUsers } from 'utils/user';

const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props}/>;
};

export default UserSelect;

import { User } from "types/User";
import { useEffect } from 'react';
import { cleanObject } from 'utils';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/use-async';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) })).then();
  }, [param]);

  return result;
};

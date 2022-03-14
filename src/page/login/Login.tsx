import React, { FormEvent } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">User Name</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={'password'} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
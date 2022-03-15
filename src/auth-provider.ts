//if use firebase or Auth0, this file will not be used

import { User } from 'components/searchPanel/SearchPanel';

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = '__auth_provider_key__';

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user
};

export const login =(data:{username:string, password:string})=>{
   fetch(`${apiUrl}/login`, {
     method: 'POST',
     headers: {
       'Content-type': 'application/json',
     },
     body: JSON.stringify(data),
   }).then(async (res) => {
     if (res.ok) {
       return handleUserResponse(await res.json())
     }else{
      Promise.reject(data)}
   });
}

export const register = (data: { username: string; password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }else{
      Promise.reject(data)
    }
  });
};

export const logout =()=> window.localStorage.removeItem(localStorageKey)
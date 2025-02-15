import apiCall from './api';

export const signUp = async data => {
  return await apiCall({
    url: '/api/auth/signup',
    method: 'POST',
    data
  });
};

export const signIn = async data => {
  return await apiCall({
    url: '/api/auth/login',
    method: 'POST',
    data
  });
};


export const updatePass = async data => {
  return await apiCall({
    url: '/api/auth/updatepass',
    method: 'POST',
    data
  });
};

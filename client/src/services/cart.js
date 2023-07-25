import apiCall from './api';

export const updateCartMutation = async (data) => {
    return await apiCall({
      url: `/api/cart`,
      method: 'PUT',
      data
    });
  };
  
  export const getCartQuery = async () => {
    return await apiCall({
      url: '/api/cart',
      method: 'GET'
    });
  };
  
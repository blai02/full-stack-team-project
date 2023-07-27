import apiCall from './api';

export const createProduct = async (product) => {
  return await apiCall({
    url: `/api/products`,
    method: 'POST',
    data: product
  });
};

export const getProducts = async () => {
  return await apiCall({
    url: '/api/products',
    method: 'GET'
  });
};

export const deleteProduct = async ({ userId, productId }) => {
  return await apiCall({
    url: `/api/products/${productId}`,
    method: 'DELETE'
  });
};

// export const likeMessage = async (userId, messageId) => {
//   return await apiCall({
//     url: `/api/users/${userId}/messages/${messageId}/like`,
//     method: 'POST'
//   });
// };

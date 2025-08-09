import axiosInstance from './axiosInstance';

export const getAnalytics = async (token?: string) => {
  const response = await axiosInstance.get('/admin/analytics');
  return response.data;
};

export const getProductStats = async (token?: string) => {
  const response = await axiosInstance.get('/admin/product-stats');
  return response.data;
};

export const getAllProducts = async (token?: string) => {
  const response = await axiosInstance.get('/admin/products');
  return response.data;
};

export const getProductById = async (id: string, token?: string) => {
  const response = await axiosInstance.get(`/admin/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any, token?: string) => {
  const response = await axiosInstance.post('/admin/products', productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: any, token?: string) => {
  const response = await axiosInstance.put(`/admin/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string, token?: string) => {
  const response = await axiosInstance.delete(`/admin/products/${id}`);
  return response.data;
};

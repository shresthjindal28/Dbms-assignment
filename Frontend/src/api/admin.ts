import axiosInstance from './axiosInstance';

export const getAnalytics = async () => {
  const response = await axiosInstance.get('/admin/analytics');
  return response.data;
};

export const getProductStats = async () => {
  const response = await axiosInstance.get('/admin/product-stats');
  return response.data;
};

export const getAllProducts = async () => {
  const response = await axiosInstance.get('/admin/products');
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axiosInstance.get(`/admin/products/${id}`);
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axiosInstance.post('/admin/products', productData);
  return response.data;
};

export const updateProduct = async (id: string, productData: any) => {
  const response = await axiosInstance.put(`/admin/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(`/admin/products/${id}`);
  return response.data;
};

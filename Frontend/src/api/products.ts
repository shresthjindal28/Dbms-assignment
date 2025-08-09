import axiosInstance from './axiosInstance';

export const fetchProducts = async () => {
  const res = await axiosInstance.get('/products');
  return res.data;
};

export const fetchProductById = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

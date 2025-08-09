import axiosInstance from './axiosInstance';

export const adminLogin = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/admin/login', data);
  return res.data;
};

export const getAnalytics = async (token: string) => {
  const res = await axiosInstance.get('/admin/analytics', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

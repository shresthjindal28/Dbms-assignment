import axiosInstance from './axiosInstance';

interface OrderData {
  // Define the expected properties for an order, for example:
  productId: string;
  quantity: number;
  address: string;
  // Add other fields as needed
}

export const createOrder = async (data: OrderData) => {
  const res = await axiosInstance.post('/orders', data);
  return res.data;
};

export const getUserOrders = async (email: string) => {
  const response = await axiosInstance.get(`/orders/user?email=${email}`);
  return response.data;
};

export const trackOrder = async (orderId: string, email: string) => {
  const response = await axiosInstance.get(`/orders/track?orderId=${orderId}&email=${email}`);
  return response.data;
};

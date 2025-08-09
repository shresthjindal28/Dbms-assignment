// Dummy payment service: always returns success
module.exports = {
  createOrder: async (amount, currency = 'INR') => {
    // Simulate a payment order creation
    return {
      id: 'dummy_order_id',
      amount,
      currency,
      status: 'created',
    };
  },
  verifyPayment: async (paymentId, orderId) => {
    // Always succeed
    return {
      paymentId,
      orderId,
      status: 'success',
    };
  },
};

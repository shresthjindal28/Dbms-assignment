// Webhook handler removed (Razorpay integration removed)
// You would verify signature and update order/payment status here

module.exports = (req, res) => {
  // TODO: Implement webhook logic
  res.status(200).send('Webhook received');
};

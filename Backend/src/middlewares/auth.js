const { verifyToken } = require('@clerk/clerk-sdk-node');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = await verifyToken(token);
    req.clerkUser = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid Clerk token' });
  }
};

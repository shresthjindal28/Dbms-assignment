// Mock authentication middleware for development
// This bypasses Clerk authentication and allows admin access
module.exports = async (req, res, next) => {
  // For development, we'll allow all requests to admin endpoints
  // In production, this should be replaced with proper Clerk authentication
  req.clerkUser = {
    id: 'mock-admin-user',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User'
  };
  next();
};

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token not provided' });
    }

    let decoded;
    try {
      // Verify the token using the secret key from environment variables
      if (!process.env.JWT_KEY) {
        console.error("JWT_KEY is not defined in the environment variables.");
        return res.status(500).json({ success: false, error: 'Server misconfiguration. JWT_KEY is missing.' });
      }
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, error: 'Token expired' });
      }
      // Return a more generic error for other token-related issues
      return res.status(401).json({ success: false, error: 'Invalid or malformed token' });
    }

    // Find the user from the decoded token's user ID
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user; // Attach user data to the request object

    // Optional: Role-based access control (RBAC)
    if (req.role && req.role !== user.role) {
      return res.status(403).json({ success: false, error: 'Permission denied' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Auth Middleware Error:", error.stack || error.message); // Log full error for debugging
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again later.' });
  }
};

export default authMiddleware;

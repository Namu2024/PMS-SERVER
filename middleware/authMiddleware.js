<<<<<<< HEAD
import jwt from 'jsonwebtoken'
import User from '../models/User.js';
 
const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(404).json({success: false, error: "Token Not Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if(!decoded) {
            return res.status(404).json({success: false, error: "Token Not Valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if(!user) {
            return res.status(404).json({success: false, error: "User not found"})
        }

        req.user = user
        next()
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "server error"+error})
    }
}

export default verifyUser
=======
import express from 'express';
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
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Auth Middleware Error:", error.stack || error.message); // Log full error for debugging
    return res.status(500).json({ success: false, error: 'Something went wrong. Please try again later.' });
  }
};

export default authMiddleware;
>>>>>>> bd2da99899dd74910752bfc4d977a2a352625e55

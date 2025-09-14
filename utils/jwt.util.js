import jwt from 'jsonwebtoken';
import CONSTANTS from '../utils/constants.util.js';

// Generate a JWT token with given payload
export const generateToken = (payload) => {
  try {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload for token generation');
    }

    return jwt.sign(payload, CONSTANTS.JWT.SECRET, {
      algorithm: CONSTANTS.JWT.ALGORITHM,
      expiresIn: CONSTANTS.JWT.EXPIRES_IN
    });
  } catch (error) {
    console.error('Token generation failed:', error.message);
    throw error;
  }
};

// Verify and decode a JWT token safely
export const verifyToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Token must be a string');
    }

    return jwt.verify(token, CONSTANTS.JWT.SECRET, {
      algorithms: [CONSTANTS.JWT.ALGORITHM]
    });
  } catch (error) {
    console.error('Token verification failed:', error.message);
    // Optionally, you can throw a custom error or return null
    throw new Error('Invalid or expired token');
  }
};

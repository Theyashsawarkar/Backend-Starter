// errorLogger.service.js
import commonFunctions from './commonFunctions.js';
import models from '../src/models/index.js';

// Inserts an error log into the database in a structured way
export const insertIntoErrorLogger = async ({
  message,
  stack,
  originalUrl,
  method,
  userData,
  requestId // optional, useful for tracing requests in distributed systems
}) => {
  try {
    if (!message || !stack) {
      throw new Error('Missing required error information');
    }

    const errorData = {
      message,
      method: method || 'UNKNOWN',
      baseUrl: originalUrl || 'UNKNOWN',
      userData: userData ? JSON.stringify(userData) : null,
      meta: stack,
      requestId: requestId || null,
      createdAt: new Date().toISOString(), // Explicit timestamp for audit
    };

    // Insert into errorLogger table
    await commonFunctions.create(models.errorLogger, errorData);
  } catch (error) {
    // Log error details to console but avoid throwing errors from logger
    console.error('Failed to insert error log:', error.message);
  }
};

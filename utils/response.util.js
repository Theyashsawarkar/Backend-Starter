// responseHandler.util.js

import { StatusCodes } from 'http-status-codes' // Standard HTTP codes

// Generic response sender
function sendResponse({ res, statusCode, message, data }) {
  return res.status(statusCode).send({ statusCode, message, data })
}

// Response helpers
export const ResponseHandler = {
  ok: ({ res, message = 'Data found', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.OK, message, data }),

  created: ({ res, message = 'Data created', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.CREATED, message, data }),

  noContent: ({ res, message = 'No content', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.NO_CONTENT, message, data }),

  badRequest: ({ res, message = 'Bad request', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.BAD_REQUEST, message, data }),

  unauthorized: ({ res, message = 'Unauthorized', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.UNAUTHORIZED, message, data }),

  forbidden: ({ res, message = 'Forbidden', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.FORBIDDEN, message, data }),

  notFound: ({ res, message = 'Not found', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.NOT_FOUND, message, data }),

  unprocessableEntity: ({ res, message = 'Unprocessable entity', data = null }) =>
    sendResponse({ res, statusCode: StatusCodes.UNPROCESSABLE_ENTITY, message, data }),
}

export const HttpStatus = {
  INFORMATION: {
    100: "Continue",
    101: "Switching protocols",
    102: "Processing",
    103: "Early hints",
  },
  SUCCESS: {
    200: "Ok",
    201: "Created",
    202: "Accepted",
    204: "No content",
    206: "Partial content",
  },
  REDIRECT: {
    300: "Multiple choices",
    301: "Moved permanantly",
    304: "Not Modified",
    307: "Temporary redirect",
    308: "Permanant redirect",
  },
  CLIENT_ERROR: {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
  },
  SERVER_ERROR: {
    500: "Internal server error",
    501: "Not implemented",
    502: "Bad gateway",
    503: "Service unavailable",
    504: "Gateway timeout",
  },
};

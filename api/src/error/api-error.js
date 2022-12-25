class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static internalServerError(message) {
    return new ApiError(500, message);
  }

  static forbiddenError(message) {
    return new ApiError(403, message);
  }
}

export default ApiError;
import ApiError from "../error/api-error.js";

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ errors: err.message });
  }
  return res.status(500).json({ errors: { message: "Unexpected error" } });
}

export default errorHandlingMiddleware;
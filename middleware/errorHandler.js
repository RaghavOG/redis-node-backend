// Custom error classes
class APIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = "APIError"; // Set the error type to APIError
    }
  }
  
  class NotFoundError extends APIError {
    constructor(message = "Resource not found") {
      super(message, 404);
      this.name = "NotFoundError";
    }
  }
  
  class BadRequestError extends APIError {
    constructor(message = "Bad Request") {
      super(message, 400);
      this.name = "BadRequestError";
    }
  }
  
  class UnauthorizedError extends APIError {
    constructor(message = "Unauthorized") {
      super(message, 401);
      this.name = "UnauthorizedError";
    }
  }
  
  class ForbiddenError extends APIError {
    constructor(message = "Forbidden") {
      super(message, 403);
      this.name = "ForbiddenError";
    }
  }
  
  class ConflictError extends APIError {
    constructor(message = "Conflict") {
      super(message, 409);
      this.name = "ConflictError";
    }
  }
  
  class InternalServerError extends APIError {
    constructor(message = "An unexpected error occurred") {
      super(message, 500);
      this.name = "InternalServerError";
    }
  }
  
  class ValidationError extends APIError {
    constructor(message = "Validation Error") {
      super(message, 422);
      this.name = "ValidationError";
    }
  }
  
  // Async error handler
  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  // Global error handler
  const globalErrorhandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack
  
    // Handling specific APIError types
    if (err instanceof APIError) {
      return res.status(err.statusCode).json({
        status: "Error",
        message: err.message,
      });
    }
  
    // Handling Mongoose ValidationError
    else if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validation Error",
        details: err.errors, // Optionally send detailed validation errors
      });
    }
  
    // Handling MongoDB errors like duplicate keys
    else if (err.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Duplicate field value entered",
      });
    }
  
    // Handling CastError (invalid ObjectId in MongoDB)
    else if (err.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: `Invalid ${err.path}: ${err.value}`,
      });
    }
  
    // Catch all for unexpected errors
    else {
      return res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  };
  
export { 
    APIError, 
    NotFoundError, 
    BadRequestError, 
    UnauthorizedError, 
    ForbiddenError, 
    ConflictError, 
    InternalServerError, 
    ValidationError, 
    asyncHandler, 
    globalErrorhandler
}
  
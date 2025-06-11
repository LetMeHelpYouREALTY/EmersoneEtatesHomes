
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.field = field;
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter?: number;

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message, 'RATE_LIMIT', 429);
    this.retryAfter = retryAfter;
    this.name = 'RateLimitError';
  }
}

export class ExternalServiceError extends AppError {
  public readonly service: string;

  constructor(service: string, message: string) {
    super(`${service} service error: ${message}`, 'EXTERNAL_SERVICE_ERROR', 502);
    this.service = service;
    this.name = 'ExternalServiceError';
  }
}

export interface ErrorDetails {
  readonly message: string;
  readonly code: string;
  readonly statusCode: number;
  readonly timestamp: string;
  readonly path?: string;
  readonly field?: string;
  readonly stack?: string;
}

export const createErrorDetails = (error: Error, path?: string): ErrorDetails => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      path,
      field: error instanceof ValidationError ? error.field : undefined,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  return {
    message: error.message || 'Internal server error',
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };
};

export const isOperationalError = (error: Error): boolean => {
  return error instanceof AppError && error.isOperational;
};

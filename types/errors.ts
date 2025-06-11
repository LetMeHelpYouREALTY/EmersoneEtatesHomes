
export interface AppError extends Error {
  code?: string;
  statusCode?: number;
  isOperational?: boolean;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError;
  errorInfo?: React.ErrorInfo;
}

export interface ApiValidationError {
  field: string;
  message: string;
  code: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type NetworkError = {
  type: 'NETWORK_ERROR';
  message: string;
  status?: number;
};

export type ValidationError = {
  type: 'VALIDATION_ERROR';
  errors: ApiValidationError[];
};

export type ServerError = {
  type: 'SERVER_ERROR';
  message: string;
  code?: string;
};

export type AppErrorType = NetworkError | ValidationError | ServerError;

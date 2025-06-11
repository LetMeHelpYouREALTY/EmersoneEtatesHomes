
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly message?: string;
}

export interface ContactFormResponse {
  readonly id: string;
  readonly timestamp: string;
  readonly status: 'received' | 'processed' | 'error';
}

export interface PropertySearchParams {
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly bedrooms?: number;
  readonly bathrooms?: number;
  readonly propertyType?: string;
  readonly location?: string;
  readonly sortBy?: 'price' | 'date' | 'size';
  readonly sortOrder?: 'asc' | 'desc';
  readonly page?: number;
  readonly limit?: number;
}

export interface PropertySearchResponse {
  readonly properties: readonly RealScoutProperty[];
  readonly total: number;
  readonly page: number;
  readonly totalPages: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
}

export interface EmailRequest {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

export interface EmailResponse {
  readonly messageId: string;
  readonly accepted: readonly string[];
  readonly rejected: readonly string[];
}

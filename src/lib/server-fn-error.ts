// Error codes for server function errors
export type ServerFnErrorCode =
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMIT_EXCEEDED'
  | 'OPERATION_FAILED'
  | 'INTERNAL_ERROR'

// Server function error class with code and status support
export class ServerFnError extends Error {
  public readonly code: ServerFnErrorCode
  public readonly statusCode: number

  constructor(code: ServerFnErrorCode, message: string, statusCode?: number) {
    super(message)
    this.name = 'ServerFnError'
    this.code = code
    // Default status codes based on error type
    this.statusCode = statusCode ?? this.getDefaultStatusCode(code)
  }

  private getDefaultStatusCode(code: ServerFnErrorCode): number {
    const statusMap: Record<ServerFnErrorCode, number> = {
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      VALIDATION_ERROR: 400,
      RATE_LIMIT_EXCEEDED: 429,
      OPERATION_FAILED: 500,
      INTERNAL_ERROR: 500,
    }
    return statusMap[code]
  }
}

export class AppError extends Error {
  constructor(message: string, public statusCode = 500) {
    super(message); this.name = this.constructor.name;
  }
}
export class ValidationError extends AppError {
  constructor(message: string, public details: string) { super(message, 400); }
}
export class GenerationError extends AppError {
  constructor(message: string, public cause?: Error) { super(message, 502); }
}
export class RateLimitError extends AppError {
  constructor(public retryAfterSeconds: number) { super("Too many requests", 429); }
}
export const isAppError = (e: unknown): e is AppError => e instanceof AppError;

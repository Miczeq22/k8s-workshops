import { AppError } from '@errors/app.error';

export class SystemIsUnhealthyError extends AppError {
  constructor(message = 'System is unhealthy.') {
    super(message, 'SystemIsUnhealthyError', 503);
  }
}

// src/common/filters/throttler-exception.filter.ts
import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ThrottlerException } from '@nestjs/throttler';
import { THROTTLER_MESSAGES } from '../constants/throttler.messages';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter extends BaseExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: THROTTLER_MESSAGES.TOO_MANY_REQUESTS_MESSAGE,
      error: THROTTLER_MESSAGES.RATE_LIMIT_EXCEEDED,
    });
  }
}

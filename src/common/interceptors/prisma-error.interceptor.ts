import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import { PRISMA_ERROR_MESSAGES } from '../constants/prisma-error.messages';

@Injectable()
export class PrismaErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002': // Código para violação de restrição única
              const targetFields = (error.meta?.target as string[])?.join(', ');
              throw new ConflictException(
                PRISMA_ERROR_MESSAGES.UNIQUE_CONSTRAINT_VIOLATION(targetFields),
              );
            case 'P2003': // Código para violação de chave estrangeira
              const request = context.switchToHttp().getRequest();
              if (request.method === 'DELETE') {
                throw new ConflictException(
                  PRISMA_ERROR_MESSAGES.FOREIGN_KEY_VIOLATION_DELETE,
                );
              } else if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
                throw new BadRequestException(
                  PRISMA_ERROR_MESSAGES.FOREIGN_KEY_VIOLATION_CREATE_OR_UPDATE,
                );
              }
              break;
            case 'P2025': // Código para registro não encontrado
              throw new BadRequestException(
                PRISMA_ERROR_MESSAGES.RECORD_NOT_FOUND,
              );
            default:
              console.log('Erro desconhecido do Prisma: ', error);
              throw new HttpException(
                `Erro desconhecido do Prisma: ${error.message}`,
                500,
              );
          }
        }
        return throwError(() => error);
      }),
    );
  }
}

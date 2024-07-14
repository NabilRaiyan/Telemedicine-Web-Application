import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    if (req.session.user) {
      // Session exists, allow access
      return true;
    } else {
      // No session found, deny access
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}

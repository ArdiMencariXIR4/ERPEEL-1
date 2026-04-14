import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const PUBLIC_GET_ROUTES = [
  /^\/books$/,
  /^\/books\/title\/.+$/,
  /^\/books\/filter$/,
  /^\/books\/[^/]+$/,
  /^\/borrow$/,
  /^\/borrow\/filter$/,
  /^\/students$/,        // 👈 added
];

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const method = req.method;
    const path = req.path;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Allow unauthenticated GET requests to public routes
    if (!user && method === 'GET') {
      return PUBLIC_GET_ROUTES.some(pattern => pattern.test(path));
    }

    if (!roles) {
      if (!user) return false;

      // STUDENT role restriction
      if (user.role === 'STUDENT') {
        return PUBLIC_GET_ROUTES.some(pattern =>
          method === 'GET' && pattern.test(path),
        );
      }

      return true;
    }

    if (!user || !user.role) return false;
    if (user.role === 'STUDENT') return false;

    return roles.includes(user.role);
  }
}
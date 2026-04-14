import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Routes STUDENT is allowed to access (no login needed)
const STUDENT_PUBLIC_ROUTES = [
  { method: 'GET', pathPatterns: [
    /^\/books$/,
    /^\/books\/title\/.+$/,
    /^\/books\/filter$/,
    /^\/books\/[^/]+$/,
    /^\/borrow$/,
    /^\/borrow\/filter$/,
  ]},
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

    // No @Roles() decorator = any logged in user can access
    if (!roles) {
      if (!user) return false;

      // Block STUDENT from non-whitelisted routes
      if (user.role === 'STUDENT') {
        return STUDENT_PUBLIC_ROUTES[0].pathPatterns.some(pattern =>
          method === 'GET' && pattern.test(path),
        );
      }

      return true;
    }

    if (!user || !user.role) return false;

    // Block STUDENT from role-restricted routes entirely
    if (user.role === 'STUDENT') return false;

    return roles.includes(user.role);
  }
}
import { CanActivate, ExecutionContext, Injectable, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleKey } from '../decorators/role.decorator';
import { UserRole } from '../enums/user-role.enum';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const user = req.user;
    const role: UserRole = this.reflector.getAllAndOverride(RoleKey, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (role === user.role) return true;
    return false;
  }
}

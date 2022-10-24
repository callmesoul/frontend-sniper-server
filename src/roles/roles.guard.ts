import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

// export function RolesGuard(roles: Role[]): Type<CanActivate> {
//   class RoleGuardMixin extends JwtAuthGuard {
//     async canActivate(context: ExecutionContext) {
//       await super.canActivate(context);
//       const request = context.switchToHttp().getRequest();
//       const user = request.user;
//       if (user && user.roles) {
//         return roles.some((role) => user.roles?.includes(role));
//       }
//       return false;
//     }
//   }

//   return RoleGuardMixin;
// }

// export default RolesGuard;

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';

export const RoleKey = 'role';
export const RoleDecorator = (role: UserRole) => {
  SetMetadata(RoleKey, role);
};

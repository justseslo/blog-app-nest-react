import { UserRole } from 'src/common/enums/user-role.enum';

export interface IJwtPayload {
  userId: string;
  role: UserRole;
}

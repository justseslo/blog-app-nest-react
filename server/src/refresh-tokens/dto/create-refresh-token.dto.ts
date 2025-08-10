import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
  @IsEnum(UserRole)
  role: UserRole;
  @IsString()
  @IsNotEmpty()
  userId: string;
}

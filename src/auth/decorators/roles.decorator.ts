import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../Complementos/enum.Role';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
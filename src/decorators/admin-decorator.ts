import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';

/**
 * Define se o endpoint pode ser acessado somente pelo cargo de ADMIN ou superior
 * @returns 
 */
export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);
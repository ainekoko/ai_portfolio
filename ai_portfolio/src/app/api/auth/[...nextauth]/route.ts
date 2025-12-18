import { handlers } from '@/auth';

export const { GET, POST } = handlers;
export const publicRoutes = ['/'];
export const authRoutes = ['/login', '/register'];
export const DEFAULT_LOGIN_REDIRECT = '/';

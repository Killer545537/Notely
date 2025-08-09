import { createAuthClient } from 'better-auth/react';
import { CONFIG } from '@/config'; // make sure to import from better-auth/react

export const authClient = createAuthClient({
    baseURL: CONFIG.NEXT_PUBLIC_BASE_URL,
});
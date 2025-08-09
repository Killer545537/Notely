import { config } from 'dotenv';

config({ path: '.env' });

if (process.env.NODE_ENV !== 'production') {
    config();
}

const requiredVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_BASE_URL',
    'BETTER_AUTH_SECRET',
    'RESEND_API_KEY',
] as const;

const missingVars = requiredVars.filter((key) => !process.env[key]);

if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

type ConfigKeys = typeof requiredVars[number];

type ConfigType = {
    [K in ConfigKeys]: string;
}

export const CONFIG = Object.fromEntries(
    requiredVars.map((key) => [key, process.env[key] as string]),
) as ConfigType;
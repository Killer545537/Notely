import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/db';
import { schema } from '@/db/schema/better-auth';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import { CONFIG } from '@/config';
import EmailVerification from '@/components/emails/verification-mail';

const resend = new Resend(CONFIG.RESEND_API_KEY);

export const auth = betterAuth({
    baseURL: CONFIG.NEXT_PUBLIC_BASE_URL,
    basePath: '/api/auth',
    emailAndPassword: {
        requireEmailVerification: true,
        enabled: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            console.log(`${url}`);
            await resend.emails.send({
                from: 'Notely <onboarding@resend.dev>',
                to: [user.email],
                subject: 'Verify your email address',
                react: EmailVerification({ name: user.name, verificationUrl: url }),
            });
        },
        sendOnSignUp: true,
    },
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    plugins: [nextCookies()],
});
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { CONFIG } from '@/config';
import { schema } from '@/db/schema/better-auth';


const sql = neon(CONFIG.DATABASE_URL);
export const db = drizzle({ client: sql, schema });

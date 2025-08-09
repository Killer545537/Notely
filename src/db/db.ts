import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { CONFIG } from '@/config';


const sql = neon(CONFIG.DATABASE_URL);
export const db = drizzle({ client: sql });

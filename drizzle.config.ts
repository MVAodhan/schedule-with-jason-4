import 'dotenv/config'

import type { Config } from 'drizzle-kit';
export default{
    schema: './drizzle/schema.ts',
    out: './migrations',
    driver: 'pg', 
    dbCredentials: {
      connectionString: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
  } satisfies Config;
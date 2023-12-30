import 'dotenv/config';
import { db } from './drizzle/db';
import { migrate } from 'drizzle-orm/neon-http/migrator';
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './migrations' });

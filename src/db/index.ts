import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from './schema/relation';

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  relations: relations,
});

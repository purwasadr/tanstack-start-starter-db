import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { relations } from './schema/relation';

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
  schema: schema,
  relations: relations,
})

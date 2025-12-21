import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { relations } from './schema/relation';

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },
  schema: schema,
  relations: relations,
})

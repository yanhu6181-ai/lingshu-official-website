import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");
const client = globalForDb.sql ?? postgres(url, { max: 10 });
if (process.env.NODE_ENV !== "production") globalForDb.sql = client;
export const db = drizzle(client, { schema });

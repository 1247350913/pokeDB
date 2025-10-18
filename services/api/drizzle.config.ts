import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "../../data/cloud-postgres/migrations",
  dbCredentials: { url: process.env.DATABASE_URL! }
});

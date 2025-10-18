import Fastify from "fastify";
import "dotenv/config";
import { z } from "zod";
import { db } from "./db/client.js";
import { users } from "./db/schema.js";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";

const app = Fastify();

app.get("/health", async () => ({ ok: true }));

app.post("/auth/register", async (req, reply) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
  const hash = `dev:${body.password}`; // TODO: replace with argon2/bcrypt
  await db.insert(users).values({ email: body.email, passwordHash: hash });
  return reply.code(201).send({ ok: true });
});

app.post("/auth/login", async (req, reply) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
  const [user] = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
  if (!user || user.passwordHash !== `dev:${body.password}`) return reply.code(401).send({ error: "Invalid credentials" });
  const token = crypto.randomBytes(24).toString("hex");
  return reply.send({ token, userId: user.id });
});

const port = Number(process.env.PORT ?? 3000);
app.listen({ port, host: "0.0.0.0" }).then(() => console.log(`API on :${port}`));

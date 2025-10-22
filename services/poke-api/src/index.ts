import Fastify from "fastify";
import "dotenv/config";
import { z } from "zod";

const app = Fastify({ logger: true });

type User = { id: number; email: string; password: string };
const users = new Map<string, User>(); // email -> user
let idSeq = 1;

app.get("/health", async () => ({ ok: true }));

app.post("/v1/auth/register", async (req, reply) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
  if (users.has(body.email)) return reply.code(409).send({ error: "Email already registered" });
  const user: User = { id: idSeq++, email: body.email, password: body.password }; // TODO: hash in real impl
  users.set(body.email, user);
  return reply.code(201).send({ ok: true });
});

app.post("/v1/auth/login", async (req, reply) => {
  const body = z.object({ email: z.string().email(), password: z.string().min(6) }).parse(req.body);
  const user = users.get(body.email);
  if (!user || user.password !== body.password) return reply.code(401).send({ error: "Invalid credentials" });
  const token = `dev.${user.id}.${Date.now()}`; // stub token
  return reply.send({ token, user: { id: user.id, email: user.email } });
});

const port = Number(process.env.PORT ?? 3000);
app.listen({ port, host: "0.0.0.0" }).catch(err => {
  app.log.error(err);
  process.exit(1);
});

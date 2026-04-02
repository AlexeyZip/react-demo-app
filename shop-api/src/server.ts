import cors from "cors";
import express from "express";
import { z } from "zod";
import { products, users } from "./data.js";

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/auth/login", (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid login payload",
      issues: result.error.issues,
    });
  }

  const { email, password } = result.data;
  const foundUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({
    token: `mock-token-${foundUser.id}`,
    user: {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    },
  });
});

app.get("/products", (req, res) => {
  const q = String(req.query.q ?? "")
    .trim()
    .toLowerCase();
  const category = String(req.query.category ?? "")
    .trim()
    .toLowerCase();

  const rawPage = Number(req.query.page ?? 1);
  const rawLimit = Number(req.query.limit ?? 6);

  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;
  const limit =
    Number.isFinite(rawLimit) && rawLimit > 0 ? Math.floor(rawLimit) : 6;

  let result = products;

  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  if (category) {
    result = result.filter((p) => p.category.toLowerCase() === category);
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * limit;
  const end = start + limit;
  const items = result.slice(start, end);

  return res.json({
    items,
    total,
    page: safePage,
    limit,
    totalPages,
  });
});

app.listen(port, () => {
  console.log(`shop-api is running on http://localhost:${port}`);
  console.log("Demo credentials:");
  console.log("User -> user@shop.com / user123");
  console.log("Admin -> admin@shop.com / admin123");
});

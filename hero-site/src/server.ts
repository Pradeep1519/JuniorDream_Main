import express, { type Request, type Response } from "express";
import path from "path";
import { courses } from "./data/courses";

const app = express();
const PORT = 3000;

// Serve the compiled frontend (HTML/CSS/JS) as static assets.
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/courses", (_req: Request, res: Response) => {
  res.json(courses);
});

app.listen(PORT, () => {
  console.log(`Junior Dream hero server running at http://localhost:${PORT}`);
});

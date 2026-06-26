
import Express = require("express");
const app = Express();
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __views = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__views);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

export default app;



import express from "express";
import importRouter from "./routes/import.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/import", importRouter);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

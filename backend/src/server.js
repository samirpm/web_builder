import express from "express";
import cors from "cors";
import importRouter from "./routes/import.js";
import exportRouter from "./routes/export.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/import", importRouter);
app.use("/api/export", exportRouter);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

import { Router } from "express";
import { fetchAndCleanHtml } from "../services/importService.js";

const router = Router();

router.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing url" });
  }

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: "Invalid url" });
  }

  try {
    const payload = await fetchAndCleanHtml(url);
    return res.json(payload);
  } catch (error) {
    return res.status(500).json({ error: "Import failed" });
  }
});

export default router;

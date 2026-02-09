import { Router } from "express";
import archiver from "archiver";

const router = Router();

router.post("/", (req, res) => {
  const { html, css } = req.body;

  if (!html) {
    return res.status(400).json({ error: "Missing html" });
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=site-export.zip");

  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on("error", (error) => {
    res.status(500).json({ error: error.message });
  });

  archive.pipe(res);

  const fullHtml = `<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Static Builder Export</title>\n  <link rel=\"stylesheet\" href=\"styles.css\" />\n</head>\n<body>\n${html}\n</body>\n</html>`;

  archive.append(fullHtml, { name: "index.html" });
  archive.append(css || "", { name: "styles.css" });

  archive.finalize();
});

export default router;

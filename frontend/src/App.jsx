import { useMemo, useState } from "react";

const sidebarItems = [
  "Text",
  "Image",
  "Button",
  "Section",
  "Grid",
  "Form",
  "Navbar"
];

const defaultHtml = `
<section style="padding:48px; background:#0f172a; color:#f8fafc; border-radius:24px;">
  <h1 style="font-size:32px; margin-bottom:16px;">Welcome to Static Builder</h1>
  <p style="color:#cbd5f5; font-size:16px;">Import a URL to generate a layout, then edit and export.</p>
  <button style="margin-top:24px; padding:12px 20px; background:#6366f1; color:#fff; border-radius:10px; border:none;">Primary Action</button>
</section>
`;

export default function App() {
  const [url, setUrl] = useState("");
  const [importedHtml, setImportedHtml] = useState(defaultHtml);
  const [importedCss, setImportedCss] = useState("");
  const [status, setStatus] = useState("Ready to import a site.");
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);

  const previewSrcDoc = useMemo(() => {
    return `<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" /><style>${importedCss}</style></head><body contenteditable=\"true\" style=\"margin:0;font-family:Inter,system-ui,sans-serif;background:#ffffff;color:#0f172a;\">${importedHtml}</body></html>`;
  }, [importedCss, importedHtml]);

  const handleImport = async () => {
    if (!url) {
      setStatus("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setStatus("Importing layout...");

    try {
      const response = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error("Import failed");
      }

      const payload = await response.json();
      setImportedHtml(payload.html || defaultHtml);
      setImportedCss(payload.css || "");
      setStatus("Import complete. Preview updated.");
    } catch (error) {
      setStatus("Import failed. Check the URL or backend status.");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    setStatus("Preparing export...");

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: importedHtml, css: importedCss })
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = "site-export.zip";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(downloadUrl);
      setStatus("Export ready. Download should begin.");
    } catch (error) {
      setStatus("Export failed. Try again after backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <header className="flex flex-col gap-4 border-b border-slate-800 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 font-semibold text-indigo-200">
            SB
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Static Builder
            </p>
            <h1 className="text-lg font-semibold">Project Aurora</h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="flex w-full flex-1 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 md:max-w-md">
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            />
            <button
              onClick={handleImport}
              disabled={loading}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 transition hover:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Import URL
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs text-slate-300">
              <button
                onClick={() => setZoom(0.75)}
                className={`rounded px-2 py-1 ${zoom === 0.75 ? "bg-slate-800 text-white" : "text-slate-300"}`}
              >
                75%
              </button>
              <button
                onClick={() => setZoom(1)}
                className={`rounded px-2 py-1 ${zoom === 1 ? "bg-slate-800 text-white" : "text-slate-300"}`}
              >
                100%
              </button>
              <button
                onClick={() => setZoom(1.25)}
                className={`rounded px-2 py-1 ${zoom === 1.25 ? "bg-slate-800 text-white" : "text-slate-300"}`}
              >
                125%
              </button>
              <button
                onClick={() => setZoom(0.9)}
                className="rounded px-2 py-1 text-slate-300"
              >
                Fit
              </button>
            </div>
            <button
              onClick={handleExport}
              disabled={loading}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Export HTML
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-64 flex-col border-r border-slate-800 bg-panel">
          <div className="flex-1 overflow-y-auto p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Blocks</p>
            <div className="mt-4 space-y-3">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-400"
                >
                  <span>{item}</span>
                  <span className="text-xs text-slate-500">Drag</span>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">Status</p>
              <p className="mt-2 leading-relaxed">{status}</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-900/40">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-8 py-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Canvas Preview</h2>
                <p className="text-sm text-slate-400">
                  Drag blocks here or import an existing website to start.
                </p>
              </div>
              <div className="flex gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-slate-700 px-3 py-1">Desktop</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">Tablet</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">Mobile</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl">
              <div
                className="mx-auto origin-top rounded-2xl border border-slate-800 bg-white shadow-2xl"
                style={{ transform: `scale(${zoom})` }}
              >
                <iframe
                  title="preview"
                  className="h-[720px] w-full rounded-2xl"
                  srcDoc={previewSrcDoc}
                />
              </div>
            </div>
          </div>
        </main>

        <aside className="flex w-72 flex-col border-l border-slate-800 bg-panel">
          <div className="flex-1 overflow-y-auto p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Styles</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">Selected Element</p>
                <p className="text-xs text-slate-400">Hero Title</p>
                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <p>Font: Inter 42px</p>
                  <p>Color: #0F172A</p>
                  <p>Spacing: 24px</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">Animations</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">
                    Fade In
                  </span>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">
                    Slide Up
                  </span>
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">
                    Hover Glow
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold">Layout</p>
                <div className="mt-3 space-y-2 text-xs text-slate-400">
                  <p>Display: Flex</p>
                  <p>Padding: 48px</p>
                  <p>Radius: 24px</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

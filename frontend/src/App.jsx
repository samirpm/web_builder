const sidebarItems = [
  "Text",
  "Image",
  "Button",
  "Section",
  "Grid",
  "Form",
  "Navbar"
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-500/20 text-indigo-200 flex items-center justify-center font-semibold">
            SB
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Static Builder
            </p>
            <h1 className="text-lg font-semibold">Project Aurora</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
            Import URL
          </button>
          <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">
            Export HTML
          </button>
        </div>
      </header>

      <div className="grid grid-cols-[260px_1fr_280px] gap-0">
        <aside className="min-h-[calc(100vh-81px)] border-r border-slate-800 bg-panel p-5">
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
        </aside>

        <main className="min-h-[calc(100vh-81px)] bg-slate-900/40 p-6">
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-10">
            <div className="flex items-center justify-between">
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

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Imported Layout
                </p>
                <h3 className="mt-3 text-lg font-semibold">Landing Hero Section</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ready
                  for GrapesJS hydration.
                </p>
                <button className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-xs">
                  Edit Content
                </button>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Style Inspector
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium">Typography</p>
                    <p className="text-xs text-slate-400">
                      Font, size, and color controls.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Layout</p>
                    <p className="text-xs text-slate-400">
                      Spacing, alignment, and grid tools.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Animations</p>
                    <p className="text-xs text-slate-400">
                      Fade, slide, and hover presets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="min-h-[calc(100vh-81px)] border-l border-slate-800 bg-panel p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Styles</p>
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-sm font-semibold">Selected Element</p>
              <p className="text-xs text-slate-400">Hero Title</p>
              <div className="mt-4 space-y-2 text-xs text-slate-400">
                <p>Font: Inter 42px</p>
                <p>Color: #F8FAFC</p>
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
          </div>
        </aside>
      </div>
    </div>
  );
}

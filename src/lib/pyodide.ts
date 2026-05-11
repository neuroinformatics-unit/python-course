import type { PyodideRuntime } from "../vite-env";
import { resolvePublicAssetPath } from "./assets";

const pyodideVersion = "0.26.4";
const indexURL = `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`;

let pyodidePromise: Promise<PyodideRuntime> | null = null;
const loadedPackages = new Set<string>();
const mountedDatasets = new Set<string>();

const loadScript = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-pyodide]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load Pyodide script.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `${indexURL}pyodide.js`;
    script.dataset.pyodide = "true";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Unable to load Pyodide script."));
    document.head.append(script);
  });

export const getPyodide = async (): Promise<PyodideRuntime> => {
  if (!pyodidePromise) {
    pyodidePromise = loadScript().then(async () => {
      if (!window.loadPyodide) throw new Error("Pyodide loader was not found.");
      const runtime = await window.loadPyodide({ indexURL });
      runtime.FS.mkdirTree("/data");
      return runtime;
    });
  }
  return pyodidePromise;
};

export const loadPackages = async (runtime: PyodideRuntime, packages: string[] = []): Promise<void> => {
  const nextPackages = packages.filter((name) => !loadedPackages.has(name));
  if (nextPackages.length === 0) return;
  // Use micropip so both Pyodide-bundled packages (numpy, pandas) and PyPI-only
  // packages (openpyxl, etc.) install without separate code paths.
  await runtime.loadPackage("micropip");
  await runtime.runPythonAsync(
    `import micropip; await micropip.install(${JSON.stringify(nextPackages)})`
  );
  nextPackages.forEach((name) => loadedPackages.add(name));
};

export const mountDatasets = async (
  runtime: PyodideRuntime,
  datasetPaths: string[] = [],
): Promise<void> => {
  for (const path of datasetPaths) {
    if (mountedDatasets.has(path)) continue;
    const response = await fetch(resolvePublicAssetPath(path));
    if (!response.ok) throw new Error(`Could not load dataset ${path}`);
    const data = new Uint8Array(await response.arrayBuffer());
    runtime.FS.mkdirTree("/data");
    runtime.FS.writeFile(path, data);
    mountedDatasets.add(path);
  }
};

export const createPlotCaptureCode = () => `
import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
import base64
from io import BytesIO
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    _python_course_plots = []
    def _python_course_show():
        global _python_course_plots
        buffer = BytesIO()
        plt.savefig(buffer, format="png", bbox_inches="tight")
        buffer.seek(0)
        _python_course_plots.append(base64.b64encode(buffer.read()).decode("utf-8"))
        plt.close()
    plt.show = _python_course_show
except Exception:
    _python_course_plots = []
`;

export const readPlotImagesCode = `
_python_course_plots
`;

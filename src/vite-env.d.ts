/// <reference types="vite/client" />

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideRuntime>;
  }
}

export type PyodideRuntime = {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (packages: string | string[]) => Promise<void>;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
  FS: {
    mkdirTree: (path: string) => void;
    writeFile: (path: string, data: Uint8Array | string) => void;
  };
};

export type PyProxyLike<T = unknown> = {
  toJs: () => T;
  destroy?: () => void;
};

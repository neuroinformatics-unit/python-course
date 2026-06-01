import { Loader2, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import type { LessonCodeExample } from "../data/types";
import {
  createPlotCaptureCode,
  getPyodide,
  loadPackages,
  readPlotImagesCode,
} from "../lib/pyodide";
import { InlineText } from "./InlineText";
import type { PyProxyLike } from "../vite-env";

type Props = {
  lessonId: string;
  index: number;
  example: LessonCodeExample;
};

type RunState = "idle" | "loading" | "running" | "done" | "error";

export function ExampleRunner({ lessonId, index, example }: Props) {
  const normalisedCode = normaliseIndent(example.code);
  const [code, setCode] = useState(normalisedCode);
  const [output, setOutput] = useState("");
  const [plots, setPlots] = useState<string[]>([]);
  const [runState, setRunState] = useState<RunState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCode(normalisedCode);
    setOutput("");
    setPlots([]);
    setRunState("idle");
    setMessage("");
  }, [normalisedCode]);

  const runCode = async () => {
    setRunState("loading");
    setOutput("");
    setPlots([]);
    setMessage("Preparing Python...");

    try {
      const runtime = await getPyodide();
      let capturedOutput = "";
      const appendOutput = (text: string) => {
        capturedOutput = `${capturedOutput}${text}\n`;
        setOutput((current) => `${current}${text}\n`);
      };
      runtime.setStdout({ batched: appendOutput });
      runtime.setStderr({ batched: appendOutput });

      if (example.packages?.length) {
        setMessage(`Loading ${example.packages.join(", ")}...`);
        await loadPackages(runtime, example.packages);
      }

      setRunState("running");
      setMessage("Running...");
      await runtime.runPythonAsync(createPlotCaptureCode());
      await runtime.runPythonAsync(code);
      const plotResult = await runtime.runPythonAsync(readPlotImagesCode);
      setPlots(normalisePlots(plotResult));
      setRunState("done");
      setMessage("Code ran successfully.");
      if (!capturedOutput) {
        setOutput("(No output)\n");
      }
    } catch (error) {
      setRunState("error");
      setMessage(error instanceof Error ? error.message : "Python could not run this code.");
    }
  };

  const editorId = `${lessonId}-example-${index}`;

  return (
    <section className="example-runner" aria-label="Runnable Python example">
      {example.caption && (
        <p className="example-caption">
          <InlineText text={example.caption} />
        </p>
      )}
      <label className="sr-only" htmlFor={editorId}>Python example editor</label>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={highlightPython}
        textareaId={editorId}
        textareaClassName="code-editor-textarea"
        preClassName="code-editor-highlight"
        className="code-editor"
        padding={14}
        tabSize={4}
      />
      <div className="runner-actions">
        <button type="button" onClick={runCode} disabled={runState === "loading" || runState === "running"}>
          {runState === "loading" || runState === "running" ? (
            <Loader2 className="spin" size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
          Run
        </button>
        <button type="button" onClick={() => setCode(normalisedCode)}>
          <RotateCcw size={16} aria-hidden="true" />
          Reset
        </button>
        <span className={runState === "error" ? "runner-message error" : "runner-message"}>{message}</span>
      </div>
      <pre className="output" aria-label="Python output">{output || "Output will appear here."}</pre>
      {plots.length > 0 && (
        <div className="plot-grid" aria-label="Matplotlib output">
          {plots.map((plot, plotIndex) => (
            <img key={`${plot.slice(0, 24)}-${plotIndex}`} src={`data:image/png;base64,${plot}`} alt={`Plot ${plotIndex + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}

function highlightPython(source: string) {
  return Prism.highlight(source, Prism.languages.python, "python");
}

function normalisePlots(plotResult: unknown): string[] {
  if (Array.isArray(plotResult)) return plotResult.filter((item): item is string => typeof item === "string");

  if (plotResult && typeof plotResult === "object" && "toJs" in plotResult) {
    const proxy = plotResult as PyProxyLike<unknown>;
    try {
      const converted = proxy.toJs();
      if (Array.isArray(converted)) {
        return converted.filter((item): item is string => typeof item === "string");
      }
    } finally {
      proxy.destroy?.();
    }
  }

  return [];
}

function normaliseIndent(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const trimmed = stripEmptyEdges(lines);
  if (trimmed.length === 0) return "";

  const indents = trimmed
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^\s*/)?.[0].length ?? 0);
  const minIndent = Math.min(...indents, 0);
  if (minIndent === 0) return trimmed.join("\n");

  return trimmed.map((line) => line.slice(minIndent)).join("\n");
}

function stripEmptyEdges(lines: string[]): string[] {
  let start = 0;
  let end = lines.length;

  while (start < end && lines[start].trim() === "") start += 1;
  while (end > start && lines[end - 1].trim() === "") end -= 1;

  return lines.slice(start, end);
}

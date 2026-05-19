import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, Play, RotateCcw, Terminal } from "lucide-react";
import { useMemo, useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import type { CodeExercise, DatasetChallenge } from "../data/types";
import { codingbatLinks, codingbatSourceLinks } from "../data/codingbatLinks";
import { validateCodeSubmission } from "../lib/exerciseValidation";
import {
  createPlotCaptureCode,
  getPyodide,
  loadPackages,
  mountDatasets,
  readPlotImagesCode,
} from "../lib/pyodide";
import { InlineText } from "./InlineText";
import type { PyProxyLike } from "../vite-env";

type Props = {
  item: CodeExercise | DatasetChallenge;
  onAttempt: () => void;
  onComplete: () => void;
};

type RunState = "idle" | "loading" | "running" | "done" | "error";

export function CodeRunner({ item, onAttempt, onComplete }: Props) {
  const [code, setCode] = useState(item.starterCode);
  const [output, setOutput] = useState("");
  const [lastOutput, setLastOutput] = useState("");
  const [plots, setPlots] = useState<string[]>([]);
  const [runState, setRunState] = useState<RunState>("idle");
  const [message, setMessage] = useState("");

  const packages = "packages" in item ? item.packages ?? [] : [];
  const datasetPaths = useMemo(() => {
    if ("dataset" in item) return [item.dataset];
    return item.datasetPaths ?? [];
  }, [item]);
  const codingbatUrl = getCodingbatUrl(item.id);
  const codingbatSourceUrl = getCodingbatSourceUrl(item.id);

  if (codingbatUrl) {
    return (
      <section className="activity-panel code-panel codingbat-panel">
        <div className="activity-heading">
          <ExternalLink size={18} aria-hidden="true" />
          <div>
            <h3>
              <InlineText text={item.title} />
            </h3>
            <p>
              <InlineText text={"prompt" in item ? item.prompt : item.mission} />
            </p>
          </div>
        </div>
        <div className="codingbat-actions">
          <a href={codingbatUrl} target="_blank" rel="noreferrer noopener">
            <ExternalLink size={16} aria-hidden="true" />
            Open CodingBat exercise
          </a>
          <button type="button" className="primary-action" onClick={onComplete}>
            Complete lesson
          </button>
        </div>
      </section>
    );
  }

  const runCode = async () => {
    setRunState("loading");
    setOutput("");
    setLastOutput("");
    setPlots([]);
    setMessage("Preparing Python...");
    onAttempt();

    try {
      const runtime = await getPyodide();
      let capturedOutput = "";
      const appendOutput = (text: string) => {
        capturedOutput = `${capturedOutput}${text}\n`;
        setOutput((current) => `${current}${text}\n`);
      };
      runtime.setStdout({ batched: appendOutput });
      runtime.setStderr({ batched: appendOutput });

      if (packages.length) {
        setMessage(`Loading ${packages.join(", ")}...`);
        await loadPackages(runtime, packages);
      }

      if (datasetPaths.length) {
        setMessage("Loading dataset...");
        await mountDatasets(runtime, datasetPaths);
      }

      setRunState("running");
      setMessage("Running...");
      await runtime.runPythonAsync(createPlotCaptureCode());
      await runtime.runPythonAsync(code);
      const plotResult = await runtime.runPythonAsync(readPlotImagesCode);
      const nextPlots = normalisePlots(plotResult);
      setPlots(nextPlots);
      setLastOutput(capturedOutput);
      setRunState("done");
      setMessage("Code ran successfully.");
    } catch (error) {
      setRunState("error");
      setMessage(error instanceof Error ? error.message : "Python could not run this code.");
    }
  };

  const validation = validateCodeSubmission(item, code, lastOutput, plots.length);
  const canComplete = runState === "done" && validation.passed;
  const expectedPlotCount = item.expectedPlotCount ?? 0;
  const plotMissing = runState === "done" && expectedPlotCount > plots.length;
  const editorId = `${item.id}-editor`;

  return (
    <section className="activity-panel code-panel">
      <div className="activity-heading">
        <Terminal size={18} aria-hidden="true" />
        <div>
          <h3>
            <InlineText text={item.title} />
          </h3>
          <p>
            <InlineText text={"prompt" in item ? item.prompt : item.mission} />
          </p>
          {codingbatSourceUrl && (
            <p className="codingbat-source-link">
              Inspired by a <a href={codingbatSourceUrl} target="_blank" rel="noreferrer noopener">CodingBat problem</a>.
            </p>
          )}
        </div>
      </div>
      {"hints" in item && (
        <div className="hint-strip">
          {item.hints.map((hint) => (
            <span key={hint}>
              <InlineText text={hint} />
            </span>
          ))}
        </div>
      )}
      <label className="sr-only" htmlFor={editorId}>Python exercise editor</label>
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
        <button type="button" onClick={() => setCode(item.starterCode)}>
          <RotateCcw size={16} aria-hidden="true" />
          Reset
        </button>
        <span className={runState === "error" ? "runner-message error" : "runner-message"}>{message}</span>
      </div>
      <pre className="output" aria-label="Python output">{output || "Output will appear here."}</pre>
      {plots.length > 0 && (
        <div className="plot-grid" aria-label="Matplotlib output">
          {plots.map((plot, index) => (
            <img key={plot.slice(0, 24) + index} src={`data:image/png;base64,${plot}`} alt={`Plot ${index + 1}`} />
          ))}
        </div>
      )}
      {runState === "error" && (
        <div className="feedback-panel needs-work" role="status">
          <AlertTriangle size={20} aria-hidden="true" />
          <div>
            <strong>Python stopped before the checkpoint.</strong>
            <p>Read the final line of the output first, then check the line number or name mentioned in the traceback.</p>
          </div>
        </div>
      )}
      {!validation.passed && runState !== "error" && (
        <div className={`feedback-panel ${runState === "done" ? "needs-work" : "waiting"}`} role="status">
          <AlertTriangle size={20} aria-hidden="true" />
          <div>
            <strong>{runState === "done" ? "Not matched yet." : "Checkpoint waiting."}</strong>
            <p>
              {runState === "done"
                ? plotMissing
                  ? <InlineText text="Your code ran, but the expected plot was not detected. Make sure you create the plot and call `plt.show()`." />
                  : "Your code ran, but the checkpoint result was not found in the output. Compare the mission wording with what your program prints."
                : "Run your solution when you are ready. The checkpoint checks the result your program prints."}
            </p>
          </div>
        </div>
      )}
      {canComplete && (
        <div className="feedback-panel ok" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <div>
            <strong>Checkpoint matched.</strong>
            <p>The output fits the mission. You can mark the lesson complete.</p>
          </div>
        </div>
      )}
      <button type="button" className="primary-action" disabled={!canComplete} onClick={onComplete}>
        Complete lesson
      </button>
    </section>
  );
}

function highlightPython(source: string) {
  return Prism.highlight(source, Prism.languages.python, "python");
}

function getCodingbatUrl(id: string) {
  return codingbatLinks[id.replace(/-exercise$/, "")];
}

function getCodingbatSourceUrl(id: string) {
  return codingbatSourceLinks[id.replace(/-exercise$/, "")];
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

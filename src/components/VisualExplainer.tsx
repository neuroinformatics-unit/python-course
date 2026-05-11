import { Braces, FileCode2, GitBranch, TerminalSquare } from "lucide-react";
import type { Lesson } from "../data/types";
import { InlineText } from "./InlineText";

type Props = {
  lesson: Lesson;
};

export function VisualExplainer({ lesson }: Props) {
  if (lesson.id === "first-calculator") {
    return (
      <section className="visual-explainer three-step" aria-label="Script execution flow">
        <div><span>1</span><strong>Name values</strong><p><InlineText text="`first_number = 12`" /></p></div>
        <div><span>2</span><strong>Transform</strong><p><InlineText text="`result = ...`" /></p></div>
        <div><span>3</span><strong>Reveal</strong><p><InlineText text="`print(result)`" /></p></div>
      </section>
    );
  }

  if (lesson.id === "ways-of-working") {
    return (
      <section className="visual-explainer three-step" aria-label="Ways of running Python">
        <div><span><TerminalSquare size={18} /></span><strong>REPL</strong><p>Try one idea immediately.</p></div>
        <div><span><FileCode2 size={18} /></span><strong>Script</strong><p>Save a repeatable program.</p></div>
        <div><span><Braces size={18} /></span><strong>Notebook</strong><p>Mix notes, code, output, and plots.</p></div>
      </section>
    );
  }

  if (lesson.id === "conda") {
    return (
      <section className="visual-explainer three-step" aria-label="Environment isolation">
        <div><span>A</span><strong>Project 1</strong><p>Python + pandas 2.x</p></div>
        <div><span>B</span><strong>Project 2</strong><p>Python + older tools</p></div>
        <div><span><GitBranch size={18} /></span><strong>Conda</strong><p>Keeps those worlds separate.</p></div>
      </section>
    );
  }

  if (lesson.id === "numpy-arrays" || lesson.id === "array-masks") {
    return (
      <section className="visual-explainer array-demo" aria-label="Array operation explainer">
        <div className="array-row"><span>5</span><span>10</span><span>15</span><span>20</span></div>
        <div className="visual-arrow">same operation touches every value</div>
        <div className="array-row result"><span>7</span><span>17</span><span>27</span><span>37</span></div>
      </section>
    );
  }

  if (lesson.id === "errors-exceptions") {
    return (
      <section className="visual-explainer three-step" aria-label="Error reading strategy">
        <div><span>1</span><strong>Read the last line</strong><p>Exception type and message.</p></div>
        <div><span>2</span><strong>Find your line</strong><p>The traceback points to the failure.</p></div>
        <div><span>3</span><strong>Change one thing</strong><p>Run again and compare.</p></div>
      </section>
    );
  }

  return null;
}

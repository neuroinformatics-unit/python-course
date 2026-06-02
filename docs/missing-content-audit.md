# Content Audit — Post May 2026 Pass

The May 2026 rewrite expanded the course from ~60 lessons across 8 courses to ~96 lessons. The previous audit (which tracked content missing from the 26-lesson site) has been superseded. This file documents what was added and what remains out of scope for the current build.

## Added in May 2026 Pass

### course 1 — Python Foundations
- `terminal-basics`: GUI vs CLI, terminal commands table (cd/ls/dir), IDE overview (VS Code/PyCharm), conda prompt.

### course 2 — Collections and Indexing
- `tuple-unpacking`: unpack a tuple into named variables including `*b` extended unpacking.
- `dictionary-methods`: expanded to cover `.items()` (previously only `.keys()`/`.values()`).

### course 3 — Functions, Modules, and Documentation
- `relu-exercise`: the canonical first useful function from OSW.
- `compare-len-exercise`: positional + keyword argument practice from OSW.
- `comments-docstrings`: upgraded to require a numpydoc-style docstring with Parameters and Returns sections.

### course 4 — Loops and Control Flow
- `power-operator`: standalone `**` lesson (was buried in list-comprehensions).
- `dict-comprehensions`: dictionary comprehensions using `.items()`.

### course 5 — Packages and NumPy
- `array-range-indexing`: slicing rows/columns/sub-arrays from multidimensional arrays.

### course 6 — Pandas and Plotting
- `iloc-indexing`: integer-location indexing with `.iloc`.
- `dataframe-explore`: `.head()`, `.unique()`, `.value_counts()` exploration step before cleaning.
- `random-int-arrays`: `np.random.randint` for generating test data.
- `random-scatter` updated to use `np.random.randint`.

### course 7 — Errors, Objects, and Code Structure
- `animal-class`: new introductory class lesson using Animal before Cell.
- `inheritance`: promoted from read-only to a hands-on code lesson (Vehicle→Bus with `super()`).
- `errors-tracebacks`: expanded to name and describe NameError, IndexError, ZeroDivisionError, TypeError, SyntaxError explicitly.
- `text-files`: rewritten to actually call `open()`/`with`/`write`/`read`.
- `clean-code`: Zen of Python, naming examples, bad-vs-good comments, README example.

### course 8 — Assignments and Working Outside the Website
- `conda-environments`: create/activate, pip vs conda, reproducibility.
- `ways-of-working`: REPL vs notebook vs script, exploratory↔reproducible continuum.
- `weather-assignment`: expanded to full Session 4 final assignment — hottest/coldest average year and month, yearly mean plot.

## Remaining Out of Scope

The following slide content exists but was deliberately kept out of the site for scope reasons:

- **Seaborn**: Session 4 mentions it as a prettier matplotlib wrapper. A one-line mention could be added to course 6 but is low priority.
- **CodingBat challenge link**: Session 2 recommended `hello_name`, `first_half`, `make_abba`. This is an external resource; add to `next-steps` if desired.
- **`check_passwd_length` exercise**: OSW 127-128. The `compare-len` and `relu` exercises cover the same function-writing skills sufficiently.
- **Full IDE walkthrough (new project, interpreter selection)**: OSW 39-47 walk through VS Code and PyCharm step by step. The `terminal-basics` and `leaving-the-website` lessons cover the concepts. A dedicated step-by-step setup guide would be better as a standalone page than a lesson slide.
- **`random.random()` / `statistics.correlation`**: briefly mentioned in Session 3; covered well enough by the existing `standard-libraries` lesson.
- **`np.random.randint` seed / reproducibility**: a natural extension to `random-int-arrays` once learners are comfortable.
- **`pyproject.toml` / packaging**: mentioned in OSW day 2 material; beyond the scope of an intro course.
- **Pandas `.loc` named-index slicing**: Session 4 slide 28 mentions `.iloc`; `.loc` is covered implicitly through masking.
- **`groupby` by month (clustering by month vs year)**: Session 4 Task 12 asks learners to cluster by Month after Year. The weather assignment now asks for the hottest/coldest month, which achieves the same goal.

## Recommendation

To reach a genuine 16-hour experience, the next pass should focus on:

1. More mid-course practice exercises (a second code problem per major concept).
2. The full IDE walkthrough as a dedicated setup guide page.
3. A Seaborn one-liner mention in course 6.
4. CodingBat and Exercism links in `next-steps`.

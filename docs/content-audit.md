# Content Coverage Audit

This site remixes the source decks into courses rather than reproducing slide order. The original slide files remain source material only.

## Covered From Python Club Sessions

- Session 1: why Python, programming concepts, GUI vs CLI, terminal basics, scripts, `print`, arithmetic operators (incl. `**`), variables, VS Code/Jupyter workflow, interactive mode, core data types, casting, `type()`, type errors.
- Session 2: lists, dictionaries, tuples, sets, mutability, indexing, slicing/range indexing, negative indexing, tuple unpacking, `len`, `list()/set()` conversion, `dict.keys()/values()/items()`, user-defined functions, arguments, defaults, return values (incl. multiple), keyword/positional calls, importing from another file.
- Session 3: comments, multiline strings/docstrings (numpydoc-style), standard libraries (`statistics`, `math`, `random`, `glob`), package installation, NumPy/pandas/matplotlib introduction, loops (`for`, accumulator, `range`, `enumerate`), comparison operators (all six), `if`/`elif`/`else`, `in`, methods, relu/compare_len function exercises, control-flow exercise.
- Session 4: responsible AI use for beginners, power operator `**`, NumPy array operations (incl. multi-array same-shape ops), array shape, multidimensional indexing, range-indexing on arrays, masks, `np.random.randint`, pandas DataFrames (`read_csv`, `.head()`, `.unique()`, `.value_counts()`, quality masking, `groupby`, column selection, `.iloc`), matplotlib scatter/plot with labels, climate data assignment (hottest/coldest year and month).
- Python Club final assignments: public hospitals, street trees, vaccination data, and weather data represented as final dataset missions.

## Covered From OSW Intro Python

- Why learn Python, ways of working with Python (REPL/notebooks/scripts, exploratory↔reproducible continuum), VS Code/PyCharm project setup, conda environments (create/activate/env-vs-package), REPL/scripts/notebooks, variables, data types, loops, conditionals, list comprehensions, dictionary comprehensions, writing scripts, loading/saving data, reading/writing text files with `open()`/`with` context manager, installing packages with pip/conda (install/uninstall/version/upgrade), functions/methods, errors/exceptions (NameError, IndexError, ZeroDivisionError, TypeError, SyntaxError, tracebacks), organising/documenting code (Zen of Python, clean naming, bad-vs-good comments, docstrings, README), classes/objects (Animal→Cell progression, attributes, methods, inheritance with `super()`), shallow/deep copy behaviour.

## Corrections Made During Review

- Python `set` values are unique and unordered; normal sets are mutable. The site teaches the corrected behaviour rather than repeating the deck wording that implied sets are immutable/ordered.
- Learner code cells now start from scaffolds instead of complete answers.
- Code checkpoints use hidden output/plot expectations, so learners must produce the result rather than merely include a keyword.
- The `dataset()` helper now takes an explicit dataset path parameter rather than inferring it by string-matching the lesson id.

## Numeric Expectations Verified (2026-05-11)

All `expectedOutputContains` values were verified against the shipped data files in `public/data/`:

| Lesson | Expectation | Status |
|---|---|---|
| read-clean-weather | `19479` | ✓ |
| groupby-weather / weather-plot | `2024`, `23.323` | ✓ |
| hospital-mission | `18`, `21146.8` | ✓ |
| street-tree-mission | `66904` | ✓ |
| vaccination-mission | `Richmond Valley - Coastal`, `2 Year olds`, `76.164` | ✓ |
| weather-assignment | `2023`, `2018`, `1`, `7` | ✓ |
| glob-docs | `4` | ✓ (4 CSVs in `/data`) |

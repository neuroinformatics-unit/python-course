import type { Course, Lesson } from "./types";

const csvBase = "/data";

const read = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  xp = 10,
): Lesson => ({
  id,
  kind: "read",
  title,
  summary,
  xp,
  concepts,
  body,
});

const workshop = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  xp = 10,
): Lesson => ({
  id,
  kind: "workshop",
  title,
  summary,
  xp,
  concepts,
  body,
});

const quiz = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  prompt: string,
  options: string[],
  answer: string,
  explanation: string,
  xp = 15,
): Lesson => ({
  id,
  kind: "quiz",
  title,
  summary,
  xp,
  concepts,
  body,
  quiz: { id: `${id}-quiz`, prompt, options, answer, explanation },
});

const code = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  prompt: string,
  starterCode: string,
  expectedOutputContains: string[],
  expectedIncludes: string[] = ["print"],
  packages: string[] = [],
  xp = 20,
): Lesson => ({
  id,
  kind: "code",
  title,
  summary,
  xp,
  concepts,
  body,
  exercise: {
    id: `${id}-exercise`,
    title,
    prompt,
    starterCode,
    expectedIncludes,
    expectedOutputContains,
    packages,
  },
});

const dataset = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  datasetPath: string,
  mission: string,
  starterCode: string,
  expectedOutputContains: string[],
  packages: string[],
  hints: string[],
  expectedPlotCount = 0,
  xp = 25,
): Lesson => ({
  id,
  kind: "dataset",
  title,
  summary,
  xp,
  concepts,
  body,
  challenge: {
    id: `${id}-challenge`,
    title,
    dataset: datasetPath,
    mission,
    starterCode,
    expectedOutputContains,
    packages,
    hints,
    expectedPlotCount,
  },
});

export const courses: Course[] = [
  {
    id: "python-foundations",
    number: 1,
    title: "Python Foundations",
    theme: "Basics",
    description: "What Python is, variables, values, data types, and the basic run/check loop.",
    badge: "Foundations",
    accent: "#111111",
    lessons: [
      read("what-is-programming", "What Is Programming?", "Programming means giving a computer precise instructions it can run.", ["programming", "instructions"], [
        "A computer follows instructions exactly. Programming is the process of writing those instructions.",
        "A program can take input, store information, make decisions, repeat steps, and produce output.",
        "The main skill is breaking a task into small steps that are clear enough for a computer to follow."
      ], 10),
      read("programming-languages", "Why Are There Different Programming Languages?", "Different languages make different trade-offs for different jobs.", ["languages", "abstraction"], [
        "Programming languages exist at different levels of abstraction. That means they give the programmer different amounts of direct control.",
        "Languages also reflect different opinions about how code should be written and different purposes they were designed for.",
        "Python was developed as a scripting language. Java focuses strongly on compatibility between operating systems. JavaScript was built for web development."
      ], 10),
      read("why-python", "Why Python?", "", ["Python", "programming"], [
        "Python is used because it is beginner friendly and abstracts away many difficult concepts.",
        "There are many packages, examples, and answers available online.",
        "Built on top of these is a scientific Python \"ecosystem\" of packages with a large community.",
        "Python is free and open source, so you can continue using it after the course.",
        "In this website, the important loop is: read the task, write a small amount of code, run it, inspect the output, and adjust it."
      ], 20),
      {
        ...read("gui-vs-cli", "GUI vs CLI", "Programs can be controlled by clicking graphical controls or by typing commands.", ["GUI", "CLI", "interface"], [
          "A GUI is a Graphical User Interface: buttons, menus, icons, file windows, and other things you click.",
          "A CLI is a Command Line Interface: a text-based place where you type commands.",
          "Many tools have both. For example, you might click buttons to open or save files, or type commands to do the same thing.",
          "Python itself is mostly used through text: a terminal, an IDE, or a notebook."
        ]),
        images: [
          { src: "/images/session1/gui-window.png", alt: "GUI mock program with buttons for opening, saving, creating, and deleting files", caption: "GUI: click buttons, menus, and windows to control a program." },
          { src: "/images/session1/slide09-01.png", alt: "Opening a file using a typed CLI command", caption: "CLI: type a command to ask a program to do something." },
          { src: "/images/session1/slide09-02.png", alt: "Deleting a file using a typed CLI command", caption: "The command line is text based: you write the instruction directly." },
        ],
      },
      {
        ...read("terminal-basics", "The Terminal and IDEs", "The terminal and an IDE are two key tools for working with Python.", ["terminal", "IDE", "GUI", "CLI"], [
          "The terminal — also called the command prompt or, when using conda, the conda prompt — is the CLI for your operating system.",
          "Basic terminal commands: `cd folder` changes directory, `ls` (Mac/Linux) or `dir` (Windows) lists files, `cd ..` goes up one level.",
          "An IDE (Integrated Development Environment) holds your hand while you write code. It provides autocomplete, red underlines on mistakes, and a button to run your file.",
          "The two most popular IDEs for Python are VS Code and PyCharm. Both are free to download.",
          "Python itself has no GUI. You interact with it through a terminal, an IDE, or a notebook."
        ]),
        images: [
          { src: "/images/session1/slide09-01.png", alt: "Terminal command typed into a CLI", caption: "The terminal is a CLI where you type commands." },
          { src: "/images/session1/slide23-01.png", alt: "VS Code IDE with a Python file open", caption: "VS Code — an IDE that provides an editor, project files, and a run button." },
          { src: "/images/session1/slide13-02.png", alt: "Running a Python script from the terminal", caption: "Typing `python script_name.py` in the terminal runs a script." },
        ],
      },
      read("calculator-print-example", "Calculations and `print()`", "Use Python like a calculator, then make the result visible.", ["operators", "print"], [
        "Python can add, subtract, multiply, divide, and raise to a power using `+`, `-`, `*`, `/`, and `**`.",
        "In a script, Python will not necessarily show the result of a calculation unless you ask it to.",
        "Use `print()` when you want to see a value. This is also one of the simplest ways of checking for code problems (\"debugging\")."
      ], 10),
      code("calculator-print", "Checkpoint: Calculations and `print()`", "Use the same idea with different values.", ["operators", "print"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Add the two existing numbers, store the result, and print it.", "first_number = 12\nsecond_number = 8\n\n# Calculate the total.\n# Show the result.\n", ["20"], ["result", "print"], [], 20),
      read("operator-precedence-example", "Order of Operations", "Use brackets when the intended calculation is not obvious.", ["operators", "precedence"], [
        "Python follows mathematical order of operations.",
        "Brackets make the order explicit and make code easier to check.",
        "When a result is surprising, split the calculation into named steps."
      ], 10),
      code("operator-precedence", "Checkpoint: Order of Operations", "Use brackets when the intended calculation is not obvious.", ["operators", "precedence"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Add the two existing numbers, multiply that sum by `3`, store it as `total`, and print `total`. Use brackets so the addition happens before multiplication.", "first_number = 12\nsecond_number = 8\n\n# Make the intended order explicit.\n# Show the calculated total.\n", ["60"], ["total", "(", ")", "print"], [], 20),
      read("variables-example", "Variables", "A variable is a name assigned to a value.", ["variables", "assignment"], [
        "For example, `a = 5` assigns the value `5` to `a`.",
        "Variables make multi-step calculations easier to read and reuse.",
        "A good variable name should describe the thing it stores."
      ], 10),
      code("variables", "Checkpoint: Variables", "A variable is a name assigned to a value.", ["variables", "assignment"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Use the existing `a` and `b` values to create `c`, where `c` is their sum. Print `c`.", "a = 5\nb = 6\n\n# Create the missing variable.\n# Show its value.\n", ["11"], ["=", "print"], [], 20),
      read("types-overview", "Data Types", "Python has different built-in \"data types\" (sometimes referred to as just \"types\"). These include strings, integers, floats, and booleans. Python treats each of them differently.", ["strings", "integers", "floats", "booleans"], [
        "A string is text, and has to be surrounded by quotation marks.",
        "An integer is a whole number. A float is a number with a decimal place.",
        "A Boolean is either `True` or `False`.",
        "A lot of beginner errors are caused by using the right-looking value with the wrong type."
      ]),
      code("strings-and-casting", "Strings, Numbers, and Casting", "Convert between text and numbers when needed.", ["strings", "casting"], [
        "Python treats `'20'` as text and `20` as a number.",
        "Built-in functions such as `str()`, `int()`, `float()`, and `bool()` convert between types.",
        "Casting should be deliberate: first inspect what you have, then convert if needed."
      ], "Use the existing text value as a number, subtract `2`, store the calculation in a variable, and print that result.", "value = '20'\n\n# Work in two steps: convert, then calculate.\n", ["18"], ["int", "print"], [], 20),
      quiz("type-question", "Type question", "Check whether a value is text or a number.", ["type"], [
        "Quotation marks make a value a string, even if the characters look like a number.",
        "Multiplying a string repeats it: `'ha' * 2` gives `'haha'`."
      ], "What happens when Python evaluates `'20' * 2`?", ["40", "2020", "An import error", "A boolean"], "2020", "The value is a string, so multiplication repeats it."),
      code("type-inspection", "Inspecting Types", "Use `type()` to check what Python thinks a value is.", ["type"], [
        "When code behaves strangely, inspect the type of the value.",
        "This is especially useful when values come from files, forms, or copied text."
      ], "Print the type of each existing variable.", "number_value = 100\nword_value = 'Dog'\nflag_value = False\n\n# Inspect each variable.\n", ["int", "str", "bool"], ["type", "print"], [], 20),
      code("debug-with-print", "Debug with `print()`", "Print intermediate values to check your assumptions.", ["debugging", "print"], [
        "Printing is not only for final answers.",
        "A useful debugging habit is to print a value before and after a calculation.",
        "Once the code works, remove prints that were only there for investigation."
      ], "Fix the calculation by using `amount` as a number, adding `bonus`, and printing the calculated total.", "amount = '10'\nbonus = 1\n\n# Check the type before you fix the calculation.\n", ["11"], ["int", "print"], [], 20),
      read("working-loop", "The Working Loop", "Write a small piece, run it, inspect it, then change one thing.", ["debugging", "practice"], [
        "The useful habit is not memorising every command. It is learning how to test small pieces of code.",
        "Run code often. Print intermediate values. Read error messages before changing things at random.",
        "This website keeps the code runner in the page so you can practise that loop without leaving the browser."
      ]),
    ],
  },
  {
    id: "collections-indexing",
    number: 2,
    title: "Collections and Indexing",
    theme: "Collections",
    description: "Lists, dictionaries, tuples, sets, indexing, slicing, tuple unpacking, conversion, and `len()`.",
    badge: "Collections",
    accent: "#111111",
    lessons: [
      {
        ...read("collections", "Collections", "Collections store multiple values.", ["lists", "dictionaries", "tuples", "sets"], [
          "Lists are ordered collections and can be changed. They use square brackets: `[1, 2, 3]`.",
          "Dictionaries map keys to values and can be changed. They use curly braces: `{'key': 'value'}`.",
          "Tuples are ordered and cannot be modified after creation. They use round brackets: `(1, 2, 3)`.",
          "Sets contain unique values and are useful for removing duplicates. They also use curly braces: `{1, 2, 3}`."
        ]),
        images: [
          { src: "/images/session2/slide07-01.png", alt: "A list defined with square brackets containing integers and strings", caption: "A list stores multiple values in order." },
          { src: "/images/session2/slide08-01.png", alt: "A dictionary defined with key-value pairs", caption: "A dictionary maps keys to values." },
          { src: "/images/session2/slide10-01.png", alt: "A set defined with curly braces", caption: "A set keeps only unique values." },
        ],
      },
      read("mutable-immutable", "Mutable vs Immutable", "Some values can be changed after creation; others cannot.", ["mutable", "immutable", "values"], [
        "In Python, some values can be changed after creation. They can mutate.",
        "We call values that can change mutable, and values that cannot change immutable.",
        "This comes from the word mutate, which means \"to change\". Lists, dictionaries, and sets are mutable. Tuples are immutable."
      ]),
      code("mutation-demo", "Checkpoint: Mutability", "Mutate a list by changing one of its items.", ["mutable", "list"], [
        "Changing one item inside a list mutates the list.",
        "The same kind of item change would not work on a tuple, because tuples are immutable."
      ], "Change the first item in `items` to `'kiwi'`, then print the mutated list.", "items = ['apple', 'banana']\n\n# Mutate the list, then print it.\n", ["['kiwi', 'banana']"], ["print"], [], 20),
      code("create-collections", "Create Collections", "Create a list and dictionary, then print both collections.", ["list", "dict"], [
        "Lists use square brackets. Dictionaries use curly braces with key-value pairs.",
        "Dictionary keys must be unique. Each key points to one value."
      ], "Create a list with `'red'`, `'green'`, and `'blue'`, and a dictionary with key `'goal'` set to `'data'`. Print the list, then print the dictionary.", "colours = []\nprofile = {}\n\n# Replace the empty collections.\n# Print both collections.\n", ["red", "green", "blue", "goal", "data"], ["[", "{", "print"], [], 25),
      {
        ...read("indexing", "Indexing", "Indexing accesses values from a collection.", ["indexing"], [
          "Python lists are zero indexed: the first element is at index `0`, the second at `1`, and so on.",
          "We index using square brackets: `my_list[0]` returns the first item.",
          "Dictionaries are indexed using keys, not positions: `my_dict['name']` returns the value stored under `'name'`."
        ]),
        images: [
          { src: "/images/session2/slide12-01.png", alt: "List indexing: example_list[0] prints apple", caption: "Index `0` gives the first element." },
          { src: "/images/session2/slide13-01.png", alt: "Dictionary indexing using a string key", caption: "Dictionaries are indexed by key." },
        ],
      },
      code("indexing-practice", "Indexing Practice", "Get values out of lists and dictionaries.", ["indexing"], [
        "Indexing is one of the most common operations when working with collections.",
        "The same square bracket syntax is used, but the value inside the brackets depends on the collection type."
      ], "Print the second animal, then print the course language.", "animals = ['dog', 'cat', 'llama']\ncourse = {'language': 'Python', 'level': 'intro'}\n\n# Choose the correct lookup for each collection.\n", ["cat", "Python"], ["[", "print"], [], 25),
      code("negative-indexing", "Negative Indexing", "Use negative indexes to count from the end.", ["indexing"], [
        "`items[-1]` means the last item.",
        "`items[-2]` means the second last item.",
        "Negative indexes are useful when the collection length can change."
      ], "Print the last animal and the second last number.", "animals = ['dog', 'cat', 'llama']\nnumbers = [10, 20, 30, 40]\n\n# Count from the end.\n", ["llama", "30"], ["-", "[", "print"], [], 20),
      {
        ...read("slicing-example", "Range Indexing and Slicing", "Use a colon to take part of a list.", ["slicing"], [
          "In a list index, `:` means everything. `[2:]` means from index 2 to the end. `[:3]` means up to (not including) index 3.",
          "The start index is included. The stop index is not included: `[1:4]` gives items at positions 1, 2, and 3.",
          "You can ask for everything before an index, everything after an index, or a range between two indexes."
        ], 10),
        images: [
          { src: "/images/session2/slide15-01.png", alt: "Range indexing: colon means everything", caption: "`:` alone means the full list." },
          { src: "/images/session2/slide16-01.png", alt: "Range indexing from a start position", caption: "`[2:]` starts from index 2." },
          { src: "/images/session2/slide17-01.png", alt: "Range indexing up to a stop position", caption: "`[:3]` stops before index 3." },
          { src: "/images/session2/slide18-01.png", alt: "Range indexing with both start and stop", caption: "`[1:4]` gives elements at positions 1, 2, and 3." },
        ],
      },
      code("slicing", "Checkpoint: Range Indexing and Slicing", "Use a colon to take part of a list.", ["slicing"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Select the middle three values from `numbers`, then print that slice.", "numbers = [1, 2, 3, 4, 5]\n\n# Use a slice, then show the selected values.\n", ["[2, 3, 4]"], [":", "print"], [], 20),
      {
        ...read("collection-conversion-example", "Converting Collections", "Use conversion functions such as `list()` and `set()`.", ["conversion", "set"], [
          "Instead of literal syntax like `[]`, you can use the keyword `list()` and pass in a different collection to convert it.",
          "`list()`, `tuple()`, `dict()`, and `set()` can create or convert collections.",
          "A common use of `set()` is removing duplicates. You can convert back to a list afterwards if you need list behaviour again."
        ], 10),
        images: [
          { src: "/images/session2/slide24-01.png", alt: "Converting a collection to a list using list()", caption: "`list()` converts another collection to a list." },
          { src: "/images/session2/slide25-01.png", alt: "Converting a collection to a tuple using tuple()", caption: "`tuple()` creates an immutable sequence." },
          { src: "/images/session2/slide27-01.png", alt: "Converting a collection to a set using set()", caption: "`set()` removes duplicates by keeping only unique values." },
        ],
      },
      code("collection-conversion", "Checkpoint: Converting Collections", "Use conversion functions such as `list()` and `set()`.", ["conversion", "set"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Remove duplicate entries from `values`, then print how many unique values remain.", "values = ['a', 'b', 'a', 'c', 'b']\n\n# Remove duplicates, then count what remains.\n", ["3"], ["set", "len", "print"], [], 20),
      code("cb-q2-deduplicate", "Practice: Remove Duplicates", "Use `set()` to keep only unique values.", ["list", "set", "sorted"], [
        "Converting a list to a set removes duplicates because sets only keep unique values.",
        "Converting back to a list and calling `sorted()` gives a clean, ordered result.",
        "This two-step pattern is a common way to deduplicate data."
      ], "Using the provided `mixed` list, print a sorted list of the unique values.", "mixed = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\n\n# Combine the tools from this lesson, then show the result.\n", ["[1, 2, 3, 4, 5, 6, 9]"], ["set", "sorted", "print"], [], 20),
      {
        ...read("len-practice-example", "The `len()` Function", "Use `len()` on strings, lists, and dictionaries.", ["len"], [
          "`len()` tells us the length of collections and strings.",
          "On a list it counts the items. On a string it counts the characters. On a dictionary it counts the key-value pairs."
        ], 10),
        images: [
          { src: "/images/session2/slide29-01.png", alt: "len() called on a list returning its item count", caption: "`len()` counts items in any collection." },
        ],
      },
      code("len-practice", "Checkpoint: The `len()` Function", "Use `len()` on strings, lists, and dictionaries.", ["len"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print the length of `word`, `animals`, and `settings`.", "word = 'Python'\nanimals = ['dog', 'cat', 'llama']\nsettings = {'theme': 'light', 'level': 'intro'}\n\n# Print the length of each variable.\n", ["6", "3", "2"], ["len", "print"], [], 20),
      read("tuple-unpacking-example", "Tuple Unpacking", "Assign tuple elements directly to named variables.", ["tuples", "unpacking"], [
        "Tuple unpacking assigns each element of a tuple to a separate variable in one line.",
        "This is often used to unpack co-ordinates, pairs, or function return values.",
        "The number of names on the left must match the number of values in the tuple."
      ], 10),
      code("tuple-unpacking", "Checkpoint: Tuple Unpacking", "Assign tuple elements directly to named variables.", ["tuples", "unpacking"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Unpack `coords` into `lat`, `lon`, and `altitude`, then print each on its own line.", "coords = (53.4, -1.8, 200)\n\n# Split coords into three named variables, then print them.\n", ["53.4", "-1.8", "200"], ["=", "print"], [], 20),
      {
        ...read("dictionary-lists-example", "Dictionary of Lists", "A dictionary value can be a list.", ["dict", "list", "indexing"], [
          "A list can be a dictionary value but not a dictionary key.",
          "This pattern creates a small table: each key is a column name and its list holds all the values for that column.",
          "Index a value by first picking the key, then picking the position: `students['name'][1]`."
        ], 10),
        images: [
          { src: "/images/session2/slide20-01.png", alt: "Dictionary whose values are lists, showing table-like structure with names and attendance", caption: "A dictionary of lists acts like a small table — each key is a column." },
        ],
      },
      code("dictionary-lists", "Checkpoint: Dictionary of Lists", "A dictionary value can be a list.", ["dict", "list", "indexing"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Using the provided dictionary of lists, print the second student name and that student's score.", "students = {\n    'name': ['Ada', 'Grace', 'Guido'],\n    'score': [91, 76, 84],\n}\n\n# Choose the matching row from each column.\n", ["Grace", "76"], ["[", "print"], [], 25),
      code("cb-q2-dict-max", "Practice: Highest Score", "Index into a dictionary of lists to find the maximum.", ["dict", "list", "max", "indexing"], [
        "A dictionary of lists lets you store table-like data.",
        "Use a key to get a column as a list, then call `max()` to find the largest value.",
        "Index back into the list with the result of `max()` using `.index()` to find the matching name."
      ], "Using the provided students dictionary, find the highest score, then print the matching student name and score.", "students = {\n    'name': ['Ada', 'Grace', 'Guido'],\n    'score': [91, 76, 84],\n}\n\n# Find the row with the largest score.\n", ["Ada", "91"], ["max", "print"], [], 25),
      code("list-methods", "List Methods", "Use methods such as `.append()` and `.remove()`.", ["methods", "lists"], [
        "A method is called with dot syntax.",
        "Some list methods change the list in place.",
        "After a method changes a list, print the list to check the result."
      ], "Use list methods to append `notebook`, remove `terminal`, and print the updated `tools` list.", "tools = ['terminal', 'Python']\n\n# Change tools using methods, then print tools.\n", ["Python", "notebook"], ["append", "remove", "print"], [], 25),
      code("dictionary-methods", "Dictionary Keys, Values, and Items", "Use dictionary methods to inspect keys, values, and pairs.", ["dict", "keys", "values", "items"], [
        "`dict.keys()` shows the available keys.",
        "`dict.values()` shows the stored values.",
        "`dict.items()` gives each key-value pair as a tuple — useful when you need both at the same time."
      ], "Print the keys, then print all items as pairs.", "profile = {'language': 'Python', 'level': 'intro'}\n\n# Print keys, then print items.\n", ["language", "Python"], ["keys", "items", "print"], [], 20),
      quiz("collections-check", "Collections Check", "Check the core collection behaviours.", ["collections"], [
        "Lists are ordered and mutable. Dictionaries use keys. Tuples are ordered and immutable. Sets keep unique values."
      ], "Which statement is correct?", ["A list is ordered and mutable", "A tuple is changed with `.append()`", "A set keeps duplicate values", "A dictionary key can appear twice"], "A list is ordered and mutable", "Lists keep order and can be edited."),
    ],
  },
  {
    id: "functions-modules",
    number: 3,
    title: "Functions and Modules",
    theme: "Functions",
    description: "Functions, arguments, return values, imports, standard libraries, comments, and docstrings.",
    badge: "Functions",
    accent: "#111111",
    lessons: [
      {
        ...read("function-concepts", "Functions", "A function is a block of code assigned to a name.", ["functions"], [
          "A function runs on specified arguments and may or may not return a value.",
          "When we create a function, we \"define\" it. When we run it, we \"call\" it.",
          "Functions help avoid repeating the same code and make programs easier to read."
        ]),
        images: [
          { src: "/images/session2/slide31-01.png", alt: "Diagram showing a function taking inputs and producing an output", caption: "A function takes arguments and optionally returns a value." },
          { src: "/images/session2/slide32-01.png", alt: "Example of a built-in function being called with an argument", caption: "Calling a function runs its body with the arguments you provide." },
        ],
      },
      {
        ...read("basic-function-example", "Define and Call a Function", "Use the `def` keyword, arguments, and a function body.", ["def", "arguments"], [
          "Functions are defined using `def` followed by the function name.",
          "Brackets then provide arguments. The body must be [indented](https://en.wikipedia.org/wiki/Indentation_(typesetting)) — the function ends when you stop indenting.",
          "Indentation should consist of four spaces (In rare cases, it might be a \"tab\" or a different number of spaces. You can't mix and match these though!).",
          "The function can be named anything, much like a variable.",
        ], 10),
        images: [
          { src: "/images/session2/slide33-01.png", alt: "Code showing a def statement with function name, brackets, colon, and indented body", caption: "`def` keyword, then the name, then arguments in brackets, then an indented body." },
        ],
      },
      code("basic-function", "Checkpoint: Define and Call a Function", "Use `def`, arguments, and a function body.", ["def", "arguments"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Create a function that takes a name and prints `Hello ` to that person. in the example below the function should print 'Hello Ada' .", "def hello(name):\n    # Print a greeting.\n    pass\n\nhello('Ada')\n", ["Hello Ada"], ["def", "print"], [], 20),
      code("cb-make-abba", "Practice: `make_abba`", "Concatenate (\"Chain together\") strings inside a function.", ["functions", "strings", "concatenation"], [
        "Write `make_abba(front, back)` that takes two strings and returns `front + back + back + front`.",
        "String concatenation with `+` works inside a function just as it does anywhere else.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p182144)."
      ], "Define `make_abba(front, back)` so it returns the four-part string. Expected output: `['HiByeByeHi', 'xyyx', 'abccab']`.", "def make_abba(front, back):\n    # Return front + back + back + front.\n    pass\n\nprint([make_abba('Hi', 'Bye'), make_abba('x', 'y'), make_abba('ab', 'c')])\n", ["['HiByeByeHi', 'xyyx', 'abccab']"], ["def make_abba", "return", "print"], [], 20),
      {
        ...read("arguments-defaults-example", "Arguments and Defaults", "Functions can have multiple arguments and optional defaults.", ["arguments", "defaults"], [
          "Functions can have multiple arguments separated by commas.",
          "Arguments without default values must be specified every time you call the function.",
          "Arguments with default values are optional — if the caller omits them, the default is used. Default arguments must follow non-default ones."
        ], 10),
        images: [
          { src: "/images/session2/slide35-01.png", alt: "Function with two arguments shown being called", caption: "Functions can take more than one argument." },
          { src: "/images/session2/slide36-01.png", alt: "Function definition with a default argument value", caption: "A default value makes an argument optional." },
          { src: "/images/session2/slide37-01.png", alt: "Calling a function using the default argument", caption: "If you omit an optional argument, Python uses the default." },
        ],
      },
      code("arguments-defaults", "Checkpoint: Arguments and Defaults", "Functions can have multiple arguments and optional defaults.", ["arguments", "defaults"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Write `repeat_text` so it returns `text` repeated `repeats` times, with `repeats` defaulting to `2`. Use the provided function call to print the returned value.", "def repeat_text(text, repeats=2):\n    pass\n\nprint(repeat_text('ha'))\n", ["haha"], ["def", "return"], [], 25),
      code("cb-string-times", "Practice: `string_times`", "Use arguments and the `*` operator on a string.", ["functions", "arguments", "strings"], [
        "Write `string_times(s, n)` that returns the string `s` repeated `n` times.",
        "The `*` operator works on strings as well as numbers: `'Hi' * 3` gives `'HiHiHi'`.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p193507)."
      ], "Define `string_times(s, n)` so it returns `s` repeated `n` times. Expected output: `['HiHi', 'HiHiHi', 'Code']`.", "def string_times(s, n):\n    # Return s repeated n times.\n    pass\n\nprint([string_times('Hi', 2), string_times('Hi', 3), string_times('Code', 1)])\n", ["['HiHi', 'HiHiHi', 'Code']"], ["def string_times", "return", "print"], [], 20),
      {
        ...read("return-values-example", "Return Values", "Use `return` when a function should give a value back.", ["return"], [
          "Printing displays a value to the screen. Returning gives a value back to the caller so it can be used in further calculations.",
          "Functions can return one value or multiple values. Multiple return values are packed as a tuple.",
          "If a function has no `return` statement it returns `None`."
        ], 10),
        images: [
          { src: "/images/session2/slide39-01.png", alt: "Function with a return statement giving a value back to the caller", caption: "`return` sends a value back to wherever the function was called." },
          { src: "/images/session2/slide40-01.png", alt: "Function returning two values at once", caption: "You can return multiple values — they come back as a tuple." },
        ],
      },
      code("return-values", "Checkpoint: Return Values", "Use `return` when a function should give a value back.", ["return"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Return the sum and product of `3` and `4`, then print both.", "def sum_and_product(a, b):\n    pass\n\ns, p = sum_and_product(3, 4)\nprint(s)\nprint(p)\n", ["7", "12"], ["return", "print"], [], 25),
      code("cb-make-pi", "Practice: `make_pi`", "Return a fixed list literal from a function.", ["functions", "lists", "return"], [
        "Write `make_pi()` that returns the list `[3, 1, 4]`.",
        "A function does not need to take arguments — it can just return a value.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p113659)."
      ], "Define `make_pi()` so it returns the list `[3, 1, 4]`. Expected output: `[3, 1, 4]`.", "def make_pi():\n    # Return the list [3, 1, 4].\n    pass\n\nprint(make_pi())\n", ["[3, 1, 4]"], ["def make_pi", "return", "print"], [], 15),
      code("cb-monkey-trouble", "Practice: `monkey_trouble`", "Compare two booleans for equality.", ["functions", "booleans", "=="], [
        "Two monkeys are in trouble when their smile states are the same — both smiling or neither smiling.",
        "When two booleans are equal, the expression `a == b` returns `True` without needing extra keywords.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p120546)."
      ], "Define `monkey_trouble(a_smile, b_smile)` so it returns `True` when both monkeys smile or neither smiles. Expected output: `[True, True, False]`.", "def monkey_trouble(a_smile, b_smile):\n    # Return True when the two smile values are equal.\n    pass\n\nprint([monkey_trouble(True, True), monkey_trouble(False, False), monkey_trouble(True, False)])\n", ["[True, True, False]"], ["def monkey_trouble", "return", "print"], [], 20),
      code("scope-practice", "Function Scope", "Values created inside a function are local to that function.", ["scope", "functions"], [
        "A function can read arguments passed into it.",
        "Variables created inside a function normally stay inside it.",
        "Return values when later code needs to use the result."
      ], "Write `add_bonus(score)` so the returned value can be printed as `85`.", "def add_bonus(score):\n    bonus = 5\n    # Return the adjusted score.\n\nfinal_score = add_bonus(80)\nprint(final_score)\n", ["85"], ["return", "print"], [], 25),
      {
        ...quiz("calling-functions", "Function arguments", "Arguments can be positional or keyword arguments.", ["positional", "keyword"], [
          "Positional arguments use order — the first value goes to the first parameter.",
          "Keyword arguments use the parameter name: `func(b=2)` passes `2` to the `b` parameter regardless of order.",
          "When mixing them, positional arguments must come first."
        ], "Which call mixes arguments correctly?", ["my_func(1, b=2)", "my_func(a=1, 2)", "my_func(b=2, 1)", "my_func(, 1)"], "my_func(1, b=2)", "The positional argument comes before the keyword argument."),
        images: [
          { src: "/images/session2/slide42-01.png", alt: "Calling a function with positional arguments in order", caption: "Positional arguments are matched by their position in the call." },
          { src: "/images/session2/slide43-01.png", alt: "Calling a function with keyword arguments using names", caption: "Keyword arguments use the parameter name so order doesn't matter." },
          { src: "/images/session2/slide44-01.png", alt: "Calling a function mixing positional and keyword arguments", caption: "You can mix both — positional first, keyword after." },
        ],
      },
      code("compare-len-exercise", "Practice: Function Arguments", "Write a function combining positional and keyword arguments.", ["arguments", "defaults", "len"], [
        "A function can have one positional argument and one keyword argument with a default.",
        "Keyword arguments can be passed in any order.",
        "Returning the result lets the caller use it rather than being forced to print it."
      ], "Write `compare_len(a, b='default')` that returns the longer of the two strings. Print `lion` for `compare_len('dog', b='lion')`.", "def compare_len(a, b='default'):\n    # Return the longer string using len().\n    pass\n\nprint(compare_len('dog', b='lion'))\n", ["lion"], ["def", "len", "return", "print"], [], 25),
      code("relu-exercise", "The `relu` Function", "Write a real-world function used in machine learning.", ["functions", "if", "return"], [
        "A rectified linear unit (relu) returns the input if it is positive, and `0` otherwise.",
        "This function is used as an activation function in neural networks.",
        "It is a good example of a function that takes one argument and returns one value."
      ], "Write `relu(x)` so it returns `x` when positive and `0` otherwise. Print `relu(5)`, `relu(0)`, and `relu(-3)`.", "def relu(x):\n    # Return x if positive, 0 otherwise.\n    pass\n\nprint(relu(5))\nprint(relu(0))\nprint(relu(-3))\n", ["5", "0", "0"], ["def", "return", "print"], [], 25),
      code("cb-sum-double", "Practice: `sum_double`", "Return a value that depends on a condition.", ["functions", "if", "return"], [
        "Normally `sum_double(a, b)` returns `a + b`.",
        "If the two values are equal, the function returns double their sum.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p141905)."
      ], "Define `sum_double(a, b)` so it returns `a + b`, but doubles the sum when `a == b`. Expected output: `[3, 5, 8]`.", "def sum_double(a, b):\n    # Return a + b, but double the result if they are equal.\n    pass\n\nprint([sum_double(1, 2), sum_double(3, 2), sum_double(2, 2)])\n", ["[3, 5, 8]"], ["def sum_double", "return", "print"], [], 20),
      code("cb-diff21", "Practice: `diff21`", "Use `abs` and a conditional return.", ["functions", "abs", "if"], [
        "`diff21(n)` returns the absolute difference between `n` and `21`.",
        "If `n` is greater than `21`, the function returns double that difference.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p197466)."
      ], "Define `diff21(n)` so it returns `abs(n - 21)`, doubled when `n > 21`. Expected output: `[2, 11, 0, 8]`.", "def diff21(n):\n    # Return abs(n - 21), doubled when n > 21.\n    pass\n\nprint([diff21(19), diff21(10), diff21(21), diff21(25)])\n", ["[2, 11, 0, 8]"], ["def diff21", "return", "print"], [], 20),
      code("cb-missing-char", "Practice: `missing_char`", "Use slicing inside a function to remove one character.", ["functions", "slicing", "strings"], [
        "`missing_char(s, n)` returns the string `s` with the character at index `n` removed.",
        "Use slicing to take everything before index `n` and everything after it.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p149524)."
      ], "Define `missing_char(s, n)` so it returns `s` without the character at index `n`. Expected output: `['ktten', 'itten', 'kittn']`.", "def missing_char(s, n):\n    # Return s with the character at index n removed.\n    pass\n\nprint([missing_char('kitten', 1), missing_char('kitten', 0), missing_char('kitten', 4)])\n", ["['ktten', 'itten', 'kittn']"], ["def missing_char", "return", "print"], [], 20),
      code("cb-first-two", "Practice: `first_two`", "Combine slicing with a function.", ["functions", "slicing", "strings"], [
        "Write `first_two(s)` that returns the first two characters of `s`.",
        "If `s` is shorter than two characters, return the whole string.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p184816)."
      ], "Define `first_two(s)` so it returns the first two characters of `s`. Expected output: `['He', 'ab', 'a']`.", "def first_two(s):\n    # Return the first 2 characters, or the whole string if shorter.\n    pass\n\nprint([first_two('Hello'), first_two('ab'), first_two('a')])\n", ["['He', 'ab', 'a']"], ["def first_two", "return", "print"], [], 20),
      code("cb-extra-end", "Practice: `extra_end`", "Repeat the last two characters of a string.", ["functions", "slicing", "strings"], [
        "Write `extra_end(s)` that returns the last two characters of `s`, repeated three times.",
        "`s[-2:]` gives the last two characters; use `*` to repeat a string.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p148853)."
      ], "Define `extra_end(s)` so it returns the last two characters repeated three times. Expected output: `['lololo', 'ababab', 'HiHiHi']`.", "def extra_end(s):\n    # Return the last 2 characters repeated 3 times.\n    pass\n\nprint([extra_end('Hello'), extra_end('ab'), extra_end('Hi')])\n", ["['lololo', 'ababab', 'HiHiHi']"], ["def extra_end", "return", "print"], [], 20),
      code("cb-without-end", "Practice: `without_end`", "Wrap slicing in a function.", ["functions", "slicing", "strings"], [
        "Write `without_end(s)` that returns `s` without its first and last character.",
        "Slicing with `[1:-1]` is a clean way to do this.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p138533)."
      ], "Define `without_end(s)` so it returns `s` without its first and last character. Expected output: `['ell', '', '']`.", "def without_end(s):\n    # Return s without the first and last character.\n    pass\n\nprint([without_end('Hello'), without_end('ab'), without_end('Hi')])\n", ["['ell', '', '']"], ["def without_end", "return", "print"], [], 20),
      {
        ...read("imports-libraries", "Imports and Libraries", "You can import functions from files and libraries.", ["import", "from"], [
          "If you put functions in a Python file, you can import them from another file using `import filename`.",
          "The file can be named anything and can have as many functions as you want.",
          "If you do not want to import an entire library, use `from library import function` to bring in just what you need.",
          "A Python library is a collection of prewritten code, often including functions you can use directly."
        ]),
        images: [
          { src: "/images/session2/slide46-01.png", alt: "import statement syntax and a from-import statement side by side", caption: "`import` brings in a whole library; `from ... import` brings in one function." },
          { src: "/images/session2/slide47-01.png", alt: "Using the from keyword to import a specific function", caption: "`from library import function` lets you call the function without the library prefix." },
        ],
      },
      {
        ...read("standard-libraries-example", "Standard Libraries", "Use `statistics`, `math`, and `random`.", ["statistics", "math", "random"], [
          "Python comes with many built-in libraries that you can import without installing anything.",
          "The `statistics` library can calculate mean, median, and mode.",
          "The `math` library contains functions such as `sqrt`."
        ], 10),
        images: [
          { src: "/images/session3/slide08-01.png", alt: "statistics library used to calculate the mean of a list", caption: "`statistics.mean()` is built in — no install needed." },
        ],
      },
      code("standard-libraries", "Checkpoint: Standard Libraries", "Use `statistics`, `math`, and `random`.", ["statistics", "math", "random"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print the mean of the provided list and the square root of `9409`.", "import statistics\nimport math\nvalues = [1, 2, 2, 3, 4]\n\n# Use the imported libraries to calculate both results.\n", ["2.4", "97.0"], ["statistics", "math", "print"], [], 25),
      {
        ...read("comments-docstrings-example", "Comments and Docstrings", "Use comments and docstrings to explain code.", ["comments", "docstrings"], [
          "Comments begin with `#` and do not affect the code. They explain *why* something is done.",
          "Docstrings use triple quotation marks at the beginning of a function and describe what it does, its parameters, and its return value.",
          "A good docstring names the function's purpose, describes its parameters, and states what it returns."
        ], 10),
        images: [
          { src: "/images/session3/slide04-01.png", alt: "Code with a # comment on a line, showing the comment is greyed out", caption: "Comments start with `#` — Python ignores them when running the code." },
          { src: "/images/session3/slide06-01.png", alt: "Function with a docstring using triple quotes at the top", caption: "Docstrings sit inside the function and describe what it does." },
        ],
      },
      code("comments-docstrings", "Checkpoint: Comments and Docstrings", "Use comments and docstrings to explain code.", ["comments", "docstrings"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Write a function `double` with a numpydoc-style docstring listing the parameter and the return value. The function should return (not just print) `14` for input `7`. Print the result after calling it.", "def double(value):\n    \"\"\"\n    Double a number.\n\n    Parameters\n    ----------\n    value : int or float\n        # Describe the parameter here.\n\n    Returns\n    -------\n    int or float\n        # Describe the return value here.\n    \"\"\"\n    pass\n\nprint(double(7))\n", ["14"], ["\"\"\"", "Parameters", "Returns", "return", "print"], [], 25),
      workshop("function-design", "Function Design", "Keep functions small enough to test.", ["functions", "design"], [
        "A useful function usually does one job.",
        "Give it inputs as arguments, return a result, and test it with a small example.",
        "If a function is hard to name, it may be trying to do too many things."
      ]),
      code("cb-first-last6", "Practice: `first_last6`", "Check the first and last list element inside a function.", ["functions", "lists", "indexing"], [
        "Write `first_last6(nums)` that returns `True` when the first or last element of the list is `6`.",
        "Use `nums[0]` and `nums[-1]` — check them with two separate `if` statements.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p181624)."
        ], "Define `first_last6(nums)` so it returns `True` when the first or last element is `6`. Expected output: `[True, True, False]`.", "def first_last6(nums):\n    # Check both ends of the list.\n    pass\n\nprint([first_last6([1, 2, 6]), first_last6([6, 1, 2, 3]), first_last6([1, 2, 3])])\n", ["[True, True, False]"], ["def first_last6", "return", "print"], [], 20),
      code("cb-same-first-last", "Practice: `same_first_last`", "Guard a length check before indexing.", ["functions", "lists", "len"], [
        "Write `same_first_last(nums)` that returns `True` when the list is non-empty and the first element equals the last.",
        "Check `len(nums) >= 1` first to avoid an IndexError on an empty list.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p179078)."
      ], "Define `same_first_last(nums)` matching the description. Expected output: `[False, True, True, False]`.", "def same_first_last(nums):\n    # Return False for empty lists, otherwise compare first and last.\n    pass\n\nprint([same_first_last([1, 2, 3]), same_first_last([1, 2, 3, 1]), same_first_last([1]), same_first_last([])])\n", ["[False, True, True, False]"], ["def same_first_last", "return", "print"], [], 20),
      code("cb-common-end", "Practice: `common_end`", "Combine list indexing across two lists in a function.", ["functions", "lists", "indexing"], [
        "Write `common_end(a, b)` that returns `True` when `a` and `b` share the same first element, or the same last element.",
        "Both lists are guaranteed to have at least one element — check the two ends with separate `if` statements.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p147755)."
      ], "Define `common_end(a, b)` matching the description. Expected output: `[True, False, True]`.", "def common_end(a, b):\n    # Compare the two possible matching ends.\n    pass\n\nprint([common_end([1, 2, 3], [7, 3]), common_end([1, 2, 3], [7, 3, 2]), common_end([1, 2], [1, 3])])\n", ["[True, False, True]"], ["def common_end", "return", "print"], [], 20),
    ],
  },
  {
    id: "control-flow",
    number: 4,
    title: "Loops and Control Flow",
    theme: "Control",
    description: "Loops, comparisons, booleans, conditionals, membership checks, list and dictionary comprehensions.",
    badge: "Control",
    accent: "#111111",
    lessons: [
      {
        ...code("for-loops", "For Loops", "Use a `for` loop to iterate through a list.", ["for", "indentation"], [
          "A `for` loop is used for iterating through a list. For each item, the indented body runs once.",
          "Everything inside the loop is indented. The loop ends when the code unindents.",
          "The variable after `for` takes each value in turn — you can name it anything.",
          "Loops are useful when the same operation should happen to each item."
        ], "Print each animal on its own line.", "animals = ['dog', 'cat', 'llama']\n\n# Loop through animals and print each one.\n", ["dog", "cat", "llama"], ["for", "print"], [], 20),
      },
      code("loop-accumulator", "Loop Accumulator", "Use a loop to build a final value.", ["for", "accumulator"], [
        "A common pattern is to start with a total and update it inside the loop.",
        "Print inside the loop when debugging. Print after the loop when only the final result matters."
      ], "Use a loop to add each value in `numbers` into `total`, then print `total` after the loop.", "numbers = [1, 2, 3, 4]\ntotal = 0\n\n# Update total inside the loop, then print total after the loop.\nprint(total)\n", ["10"], ["for", "total", "print"], [], 20),
      {
        ...read("comparisons-booleans", "Comparisons and Booleans", "Comparisons produce `True` or `False`.", ["comparison", "Boolean"], [
          "In Python we can compare different variables. Comparisons should generally be done on numbers.",
          "Comparison operators include `<` (less than), `>` (greater than), `==` (equal), `!=` (not equal), `<=`, and `>=`.",
          "A comparison returns a Boolean value: `True` or `False`.",
          "These Boolean results are commonly used in `if` statements to decide which code to run."
        ]),
        images: [
          { src: "/images/session3/slide29-01.png", alt: "Comparison operators listed with examples", caption: "Comparison operators compare two values and return True or False." },
          { src: "/images/session3/slide31-01.png", alt: "Less than comparison: 3 < 5 returns True", caption: "`<` returns `True` when the left side is smaller." },
          { src: "/images/session3/slide32-01.png", alt: "Greater than comparison: 5 > 3 returns True", caption: "`>` returns `True` when the left side is larger." },
          { src: "/images/session3/slide33-01.png", alt: "Equality comparison: 5 == 5 returns True", caption: "`==` checks equality — note the double equals, not a single one." },
        ],
      },
      {
        ...read("if-elif-else-example", "If, Elif, Else", "Run different code depending on a condition.", ["if", "elif", "else"], [
          "If statements take a Boolean value and run the indented code only when that value is `True`.",
          "Use `elif` to check a second condition if the first was false. Use `else` to run code when no condition matched.",
          "Use a colon after each condition and indent everything inside each branch.",
          "Python stops at the first true branch — later branches are skipped even if they are also true."
        ], 10),
      },
      code("if-elif-else", "Checkpoint: If, Elif, Else", "Run different code depending on a condition.", ["if", "elif", "else"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Use `if`, `elif`, and `else` to choose what to print from the value stored in `light`.", "light = 'green'\n\n# Choose the message that matches the current light.\n", ["move"], ["if", "print"], [], 20),
      read("logical-operators-example", "Logical Operators", "Combine or flip Boolean values with `not`, `and`, and `or`.", ["not", "and", "or", "booleans"], [
        "`not` flips a Boolean value: `not True` becomes `False`, and `not False` becomes `True`.",
        "`and` returns `True` only when both sides are true.",
        "`or` returns `True` when at least one side is true.",
        "Logical operators are useful when one decision depends on more than one condition."
      ], 10),
      code("cb-sleep-in", "Practice: `sleep_in`", "Use `not` and `or` in a return value.", ["functions", "not", "or"], [
        "Write `sleep_in(weekday, vacation)` that returns `True` when we get to sleep in.",
        "We sleep in when it is not a weekday (`not weekday`), or when we are on vacation.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p173401)."
      ], "Define `sleep_in(weekday, vacation)` so it returns `True` whenever it is not a weekday or we are on vacation. Expected output: `[True, False, True]`.", "def sleep_in(weekday, vacation):\n    # Return True when not a weekday or when on vacation.\n    pass\n\nprint([sleep_in(False, False), sleep_in(True, False), sleep_in(True, True)])\n", ["[True, False, True]"], ["def sleep_in", "return", "print"], [], 20),
      code("cb-in1to10", "Practice: `in1to10`", "Check a range with a mode flip.", ["functions", "and", "or", "not"], [
        "Write `in1to10(n, outside_mode)` that returns whether `n` is in the range 1 to 10 (inclusive).",
        "When `outside_mode` is `True`, flip the result — return `True` when `n` is outside that range.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p158497)."
      ], "Define `in1to10(n, outside_mode)` matching the description. Expected output: `[True, False, True, False]`.", "def in1to10(n, outside_mode):\n    # Handle the normal case and the outside-mode case.\n    pass\n\nprint([in1to10(5, False), in1to10(11, False), in1to10(11, True), in1to10(5, True)])\n", ["[True, False, True, False]"], ["def in1to10", "return", "print"], [], 20),
      {
        ...read("membership-example", "The `in` Keyword", "Ask whether something is in something else.", ["in", "membership"], [
          "You can ask Python whether something is inside something else using the `in` keyword.",
          "`item in list` checks for a full item in a list and returns `True` or `False`.",
          "`text in string` checks for a substring in a string.",
          "This is useful in filters and simple text searches, and combines naturally with `if` statements."
        ], 10),
        images: [
          { src: "/images/session3/slide41-01.png", alt: "in keyword checking if a value is in a list, returning True", caption: "`in` checks membership in a list." },
          { src: "/images/session3/slide41-02.png", alt: "in keyword checking for a substring inside a string", caption: "`in` also checks for substrings inside strings." },
        ],
      },
      code("membership", "Checkpoint: The `in` Keyword", "Ask whether something is in something else.", ["in", "membership"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print whether `'a'` is in `'cat'` and whether `'cat'` is in the list.", "animals = ['dog', 'cat', 'llama']\nword = 'cat'\n\n# Print both checks.\n", ["True", "True"], ["in", "print"], [], 20),
      code("range-and-enumerate", "`range()` and `enumerate()`", "Create indices for loops when you need them.", ["range", "enumerate"], [
        "`range()` creates a sequence of numbers.",
        "`enumerate()` gives both an index and a value while looping.",
        "Use indices only when the position matters."
      ], "Loop over `names`, printing each index with its matching name.", "names = ['Ada', 'Grace', 'Guido']\n\n# Include both the position and the value.\n", ["0 Ada", "1 Grace", "2 Guido"], ["enumerate", "for", "print"], [], 25),
      code("travel-exercise", "Control Flow Exercise", "Use comparisons and conditionals to choose an activity.", ["control flow"], [
        "The original exercise uses comparison operators and if statements to determine which country and activity we will engage in.",
        "This is the same logic pattern used in many decision trees."
      ], "Use `savings` to choose a destination and activity: above `2000` means Japan and skiing; otherwise choose Tasmania and swimming. Print the chosen values.", "savings = 2500\n\n# Choose the branch that matches the savings amount.\n", ["Japan", "Skiing"], ["if", "else", "print"], [], 25),
      code("cb-date-fashion", "Practice: `date_fashion`", "Return one of three values from nested conditions.", ["functions", "if", "elif"], [
        "You and your date each have a fashion rating between 0 and 10.",
        "If either rating is 2 or less, return 0 (stay home). If either is 8 or more, return 2 (great night). Otherwise return 1.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p129125)."
      ], "Define `date_fashion(you, date)` so it returns 0, 1, or 2 using the rules in the summary. Expected output: `[2, 0, 1]`.", "def date_fashion(you, date):\n    # 0 if either <= 2, 2 if either >= 8, 1 otherwise.\n    pass\n\nprint([date_fashion(5, 10), date_fashion(5, 2), date_fashion(5, 5)])\n", ["[2, 0, 1]"], ["def date_fashion", "return", "print"], [], 20),
      code("cb-caught-speeding", "Practice: `caught_speeding`", "Pick a fine level from speed bands.", ["functions", "if", "elif"], [
        "Up to 60 mph is no ticket (0). 61–80 is a small ticket (1). 81 or more is a big ticket (2).",
        "On your birthday you get an extra 5 mph in each band.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p137202)."
      ], "Define `caught_speeding(speed, is_birthday)` so it returns 0, 1, or 2 using the speed bands above, with a 5 mph bonus on a birthday. Expected output: `[0, 1, 1, 2]`.", "def caught_speeding(speed, is_birthday):\n    # 0/1/2 ticket; +5 mph on birthday.\n    pass\n\nprint([caught_speeding(60, False), caught_speeding(65, False), caught_speeding(85, True), caught_speeding(85, False)])\n", ["[0, 1, 1, 2]"], ["def caught_speeding", "return", "print"], [], 20),
      {
        ...read("power-operator-example", "The Power Operator `**`", "Use `**` to raise a number to a power.", ["operators", "**"], [
          "In Python, `**` is the power operator: `2 ** 3` gives `8`.",
          "The power operator follows standard order of operations, so use brackets when the intent might be unclear."
        ], 10),
        images: [
          { src: "/images/session4/slide04-01.png", alt: "Power operator example: 2 ** 3 equals 8", caption: "`**` raises the left number to the power of the right." },
        ],
      },
      code("power-operator", "Checkpoint: The Power Operator `**`", "Use `**` to raise a number to a power.", ["operators", "**"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Calculate `2` to the power of `10`, then calculate `3` to the power of `4`. Print each calculated result.", "# Calculate both powers, then show the results.\n", ["1024", "81"], ["**", "print"], [], 20),
      code("list-comprehensions", "List Comprehensions", "A one-liner way to write some loops.", ["list comprehension"], [
        "List comprehensions are useful when every output item follows the same rule.",
        "To raise to a power, use `x ** 2`.",
        "Only use a comprehension when it remains readable."
      ], "Use a list comprehension to create the square numbers from `1` to `10`, store them in `squares`, and print `squares`.", "squares = []\n\n# Replace with a list comprehension, then print squares.\nprint(squares)\n", ["[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]"], ["for", "**", "print"], [], 25),
      code("cb-alarm-clock", "Practice: `alarm_clock`", "Return one of three strings based on the day.", ["functions", "if", "strings"], [
        "Days are numbered 0 = Sunday through 6 = Saturday.",
        "Weekdays (1–5): return `'7:00'` normally, `'10:00'` on vacation. Weekends (0 and 6): return `'10:00'` normally, `'off'` on vacation.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p119867)."
      ], "Define `alarm_clock(day, vacation)` so it returns the right alarm time. Expected output: `['7:00', '10:00', '10:00', 'off']`.", "def alarm_clock(day, vacation):\n    # Weekday: '7:00' or '10:00' on vacation.\n    # Weekend: '10:00' or 'off' on vacation.\n    pass\n\nprint([alarm_clock(1, False), alarm_clock(5, True), alarm_clock(0, False), alarm_clock(6, True)])\n", ["['7:00', '10:00', '10:00', 'off']"], ["def alarm_clock", "return", "print"], [], 20),
      code("cb-cigar-party", "Practice: `cigar_party`", "Combine a range check with a weekend override.", ["functions", "if", "and"], [
        "A successful cigar party needs at least 40 cigars.",
        "On a weekday there is also an upper limit of 60. On weekends there is no upper limit.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p195669)."
      ], "Define `cigar_party(cigars, is_weekend)` so it returns `True` when the count is at least 40, with the upper limit of 60 only applied on weekdays. Expected output: `[False, True, True]`.", "def cigar_party(cigars, is_weekend):\n    # At least 40 cigars; upper limit 60 unless it is the weekend.\n    pass\n\nprint([cigar_party(30, False), cigar_party(50, False), cigar_party(70, True)])\n", ["[False, True, True]"], ["def cigar_party", "return", "print"], [], 20),
      code("dict-comprehensions", "Dictionary Comprehensions", "Build a dictionary from an existing one in one line.", ["dict comprehension", "items"], [
        "A dictionary comprehension builds a new dictionary by transforming key-value pairs.",
        "Use `dict.items()` to loop over both keys and values at the same time.",
        "The syntax is `{key: expression for key, value in original.items()}`."
      ], "Use a dictionary comprehension to double every value in `course_capacity`, store the result as `doubled`, and print `doubled`.", "course_capacity = {'intro': 12, 'further': 10, 'packaging': 15}\n\n# Build doubled using a dict comprehension, then print doubled.\nprint(doubled)\n", ["24", "20", "30"], ["{", "items", "print"], [], 25),
      code("combined-control-assignment", "Combined Control Flow Practice", "Use loops, `if`, `in`, and list methods together.", ["for", "if", "append"], [
        "This combines knowledge of if statements, for loops, the `in` keyword, and list methods.",
        "Complete code to append all names that include the letter `a`."
      ], "Loop through `names`, append names containing `a` or `A` to `matches`, and print `matches` after the loop.", "names = ['Ada', 'Guido', 'Grace', 'Linus']\nmatches = []\n\n# Append matching names, then print matches.\nprint(matches)\n", ["Ada", "Grace"], ["for", "if", "append", "print"], [], 25),
      quiz("control-flow-reading", "Read the Branches", "Predict which branch will run before executing code.", ["if", "elif"], [
        "Read conditionals from top to bottom.",
        "Python stops at the first true branch in an `if`/`elif` chain."
      ], "For `score = 82`, which label should print in `if score >= 85: High; elif score >= 70: Pass; else: Review`?", ["High", "Pass", "Review", "Both High and Pass"], "Pass", "`82 >= 85` is false, then `82 >= 70` is true."),
      code("cb-parrot-trouble", "Practice: `parrot_trouble`", "Combine `and` with a range check.", ["functions", "and", "or"], [
        "The parrot causes trouble when it is talking and the hour is before 7 or after 20.",
        "Write `parrot_trouble(talking, hour)` that returns `True` in those cases.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p166884)."
      ], "Define `parrot_trouble(talking, hour)` so it returns `True` when the parrot is talking and the hour is before 7 or after 20. Expected output: `[True, False, False, True]`.", "def parrot_trouble(talking, hour):\n    # True when talking and (hour < 7 or hour > 20).\n    pass\n\nprint([parrot_trouble(True, 6), parrot_trouble(True, 7), parrot_trouble(False, 6), parrot_trouble(True, 21)])\n", ["[True, False, False, True]"], ["def parrot_trouble", "return", "print"], [], 20),
      code("cb-near-hundred", "Practice: `near_hundred`", "Check whether a value is close to 100 or 200.", ["functions", "abs", "or"], [
        "`near_hundred(n)` returns `True` when `n` is within 10 of either 100 or 200.",
        "Use `abs` and `or` to write it as a single expression.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p124676)."
      ], "Define `near_hundred(n)` so it returns `True` when `n` is within 10 of 100 or 200. Expected output: `[True, True, False, True, True]`.", "def near_hundred(n):\n    # True when n is within 10 of 100 or 200.\n    pass\n\nprint([near_hundred(93), near_hundred(90), near_hundred(89), near_hundred(190), near_hundred(210)])\n", ["[True, True, False, True, True]"], ["def near_hundred", "return", "print"], [], 20),
      code("cb-love6", "Practice: `love6`", "Use `or` across several conditions.", ["functions", "or", "abs"], [
        "Two numbers love 6 if either of them is 6, or their sum is 6, or their absolute difference is 6.",
        "Use `abs` for the difference so the order of inputs does not matter.",
        "Original CodingBat problem: [CodingBat](https://codingbat.com/prob/p100958)."
      ], "Define `love6(a, b)` so it returns `True` when either value is 6, or `a + b == 6`, or `abs(a - b) == 6`. Expected output: `[True, False, True, True]`.", "def love6(a, b):\n    # True when a or b is 6, or sum/abs(diff) is 6.\n    pass\n\nprint([love6(6, 4), love6(4, 5), love6(1, 5), love6(1, 7)])\n", ["[True, False, True, True]"], ["def love6", "return", "print"], [], 20),
    ],
  },
  {
    id: "packages-numpy",
    number: 5,
    title: "Packages and NumPy",
    theme: "Packages",
    description: "Third-party packages, aliases, NumPy arrays, operations, shape, indexing, masks.",
    badge: "NumPy",
    accent: "#111111",
    lessons: [
      read("packages", "Third-Party Packages", "Packages add functionality that does not come with base Python.", ["pip", "packages"], [
        "There are many community-created libraries.",
        "pip is used in the terminal to install Python packages.",
        "NumPy, pandas, and matplotlib are common packages for scientific/data work.",
        "In this website, packages are loaded in the browser when an exercise needs them."
      ]),
      {
        ...read("import-aliases", "Import Aliases", "Use `as` to rename a package when importing.", ["import", "as"], [
          "The `as` keyword allows you to rename a library when you import it.",
          "Common convention is `import numpy as np`, `import pandas as pd`, and `import matplotlib.pyplot as plt`.",
          "These short aliases save typing and are recognised by other programmers as standard shorthand."
        ]),
        images: [
          { src: "/images/session3/slide17-01.png", alt: "import numpy as np — the as keyword renames numpy to np", caption: "`as` gives the library a shorter name for the rest of your script." },
          { src: "/images/session3/slide18-01.png", alt: "Using np.array after importing numpy as np", caption: "After `import numpy as np`, use `np.` to access NumPy functions." },
        ],
      },
      workshop("install-command-reading", "Reading Install Commands", "Recognise package commands before using them locally.", ["pip", "conda"], [
        "Inside this website, package loading is handled for you.",
        "Outside the website, install commands belong in a terminal, not inside a Python script.",
        "Use `python -m pip install package_name` for pip installs, and `conda install package_name` inside a conda environment.",
        "pip installs Python packages only. conda can also install non-Python dependencies.",
        "Two useful pip commands beyond install: `pip uninstall package_name` and `pip install package_name --upgrade`."
      ]),
      {
        ...read("numpy-max-argmax-example", "NumPy Functions", "Use `np.max` and `np.argmax`.", ["np.max", "np.argmax"], [
          "NumPy is useful for operations on arrays. A numpy array is a class — it has attributes and methods as well as functions that act on it.",
          "`np.max` returns the maximum value. `np.argmax` returns the index of the maximum value.",
          "These functions work efficiently on large arrays because NumPy operations run in optimised C code under the hood."
        ], 10),
        images: [
          { src: "/images/session3/slide20-01.png", alt: "NumPy array created and used with np.max", caption: "NumPy makes mathematical operations on collections fast and concise." },
          { src: "/images/session3/slide21-01.png", alt: "np.argmax finding the index of the maximum value", caption: "`np.argmax` returns the *position* of the maximum, not the value." },
          { src: "/images/session3/slide22-01.png", alt: "NumPy array class attributes: dtype and shape", caption: "A NumPy array is a class with attributes like `.dtype` and `.shape`." },
        ],
      },
      code("numpy-max-argmax", "Checkpoint: NumPy Functions", "Use `np.max` and `np.argmax`.", ["np.max", "np.argmax"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print the maximum value in `values`, then print the index where that maximum occurs.", "import numpy as np\nvalues = [3, 9, 2, 5]\n\n# Use the two NumPy functions from the lesson.\n", ["9", "1"], ["np.max", "np.argmax", "print"], ["numpy"], 25),
      {
        ...read("array-operations-example", "Array Operations", "Perform mathematical operations on arrays.", ["arrays", "operations"], [
          "A NumPy array is a class useful for mathematical operations on an entire collection.",
          "Operations like `+`, `-`, `*`, and `/` apply to every element at once — no loop needed.",
          "We can also perform operations between two arrays with the same shape — each element is paired up."
        ], 10),
        images: [
          { src: "/images/session4/slide08-01.png", alt: "Array operation: multiplying an array by a scalar value", caption: "A single operation applies to every element — no loop needed." },
          { src: "/images/session4/slide09-01.png", alt: "Array operation: adding two arrays of the same shape element-wise", caption: "Operating on two arrays pairs up elements by position." },
          { src: "/images/session4/slide11-01.png", alt: "Array operation combining multiple steps", caption: "You can chain multiple operations just like with plain numbers." },
        ],
      },
      code("array-operations", "Checkpoint: Array Operations", "Perform mathematical operations on arrays.", ["arrays", "operations"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Create a NumPy array from `5`, `10`, `15`, and `20`. Calculate `scaled` by multiplying the array by `2` and subtracting `3`, then print `scaled`.", "import numpy as np\n\n# Build the array, then apply the arithmetic to every element.\nprint(scaled)\n", ["[ 7 17 27 37]"], ["np.array", "print"], ["numpy"], 25),
      quiz("array-vs-list", "Array or List?", "Choose the right tool for repeated numeric operations.", ["arrays", "lists"], [
        "Lists are general-purpose collections.",
        "NumPy arrays are designed for fast numeric operations across many values."
      ], "Which type of variable is usually better for multiplying every measurement by the same number?", ["A NumPy array", "A plain string", "A dictionary key", "A module name"], "A NumPy array", "Arrays support vectorised mathematical operations."),
      code("cb-np-sum-max", "Practice: Array Statistics", "Use `np.sum` and `np.max` on a real array.", ["numpy", "np.sum", "np.max"], [
        "Once you have a NumPy array you can summarise it with aggregation functions.",
        "`np.sum(a)` adds all elements. `np.max(a)` returns the largest.",
        "These work on any array shape — no loop needed."
      ], "Using the provided array, print its sum and its maximum.", "import numpy as np\na = np.array([3, 1, 4, 1, 5, 9, 2, 6])\n\n# Summarise the array in two ways.\n", ["31", "9"], ["np.sum", "np.max", "print"], ["numpy"], 20),
      {
        ...read("shape-and-indexing-example", "Shape and Indexing", "Create and index multidimensional arrays.", ["shape", "indexing"], [
          "A 2-dimensional array has rows and columns, like a grid.",
          "Create one by passing a list of lists to `np.array`. All inner lists must have the same length.",
          "The `.shape` attribute returns `(rows, columns)`.",
          "Index with `array[row, column]` — both dimensions separated by a comma."
        ], 10),
        images: [
          { src: "/images/session4/slide14-01.png", alt: "Creating a 2D array from a list of lists", caption: "Pass a list of equal-length lists to create a 2D array." },
          { src: "/images/session4/slide15-01.png", alt: "2D array printed showing rows and columns", caption: "Printing a 2D array shows its row-column structure." },
          { src: "/images/session4/slide16-01.png", alt: "Indexing a 2D array with row and column numbers", caption: "`array[1, 2]` picks row 1, column 2." },
        ],
      },
      code("shape-and-indexing", "Checkpoint: Shape and Indexing", "Create and index multidimensional arrays.", ["shape", "indexing"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Create a 2x3 array containing the values `1` through `6`, print its `.shape`, then use row-column indexing to print the bottom-right value.", "import numpy as np\n\n# Build the grid.\n# Inspect its shape, then choose the required cell.\n", ["(2, 3)", "6"], ["np.array", ".shape", "print"], ["numpy"], 25),
      {
        ...read("array-range-indexing-example", "Array Range Indexing", "Slice rows and columns from a multidimensional array.", ["slicing", "arrays"], [
          "Range indexing with `:` works inside multidimensional arrays too.",
          "Use `array[row, :]` to select a whole row, and `array[:, col]` to select a whole column.",
          "Combining row and column slices extracts a sub-array."
        ], 10),
        images: [
          { src: "/images/session4/slide19-01.png", alt: "Array indexing selecting a single element by row and column", caption: "Use `[row, col]` to pick one cell." },
          { src: "/images/session4/slide20-01.png", alt: "Array range indexing selecting the first row", caption: "`array[0, :]` selects the entire first row." },
          { src: "/images/session4/slide22-01.png", alt: "Array range indexing selecting a column slice", caption: "`array[:, 1]` selects the entire second column." },
        ],
      },
      code("array-range-indexing", "Checkpoint: Array Range Indexing", "Slice rows and columns from a multidimensional array.", ["slicing", "arrays"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Using the provided grid, print the first row, the second column, and the bottom-right 2x2 block.", "import numpy as np\ngrid = np.array([[1, 2, 3, 4],\n                 [5, 6, 7, 8],\n                 [9, 10, 11, 12]])\n\n# Use row, column, and block slices.\n", ["[1 2 3 4]", "[ 2  6 10]"], [":", "print"], ["numpy"], 25),
      {
        ...read("masks-example", "Masks", "Use comparison operators to filter arrays.", ["masks", "comparison"], [
          "A comparison on an array creates a mask — an array of `True` and `False` values, one per element.",
          "Applying the mask to the array keeps only the values where the mask is `True`.",
          "This idea is also central to pandas filtering, so the skill transfers directly."
        ], 10),
        images: [
          { src: "/images/session4/slide23-01.png", alt: "Array masking: comparison creates True/False array, applied to filter values", caption: "A comparison produces a boolean mask; applying it filters the array." },
        ],
      },
      code("masks", "Checkpoint: Masks", "Use comparison operators to filter arrays.", ["masks", "comparison"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print temperatures greater than `25`.", "import numpy as np\ntemperatures = np.array([18, 22, 26, 31, 19])\n\n# Create and apply a mask.\n", ["[26 31]"], [">", "print"], ["numpy"], 25),
      code("cb-np-mask", "Practice: Filter an Array", "Apply a boolean mask to extract matching values.", ["numpy", "masks"], [
        "Create a comparison on an array to get a boolean mask.",
        "Index the array with that mask to keep only the values where the mask is `True`.",
        "Print the filtered result to verify the mask worked as expected."
      ], "Using the provided temperatures array, create a mask for readings above `37.0`, then print the values selected by that mask.", "import numpy as np\ntemps = np.array([36.6, 37.2, 38.1, 36.9, 37.8])\n\n# Build the comparison first, then apply it to the array.\n", ["[37.2 38.1 37.8]"], [">", "print"], ["numpy"], 20),
      read("library-name-warning", "File Name Warning", "Do not name files after libraries.", ["imports"], [
        "Do not make a file called `numpy.py`.",
        "If you do, Python may import your file instead of the real NumPy package.",
        "The same warning applies to other library names such as `pandas.py` or `random.py`."
      ]),
    ],
  },
  {
    id: "pandas-plotting",
    number: 6,
    title: "Pandas and Plotting",
    theme: "Data",
    description: "DataFrames, exploration, CSV/Excel files, iloc, masking, grouping, and matplotlib plots.",
    badge: "Data",
    accent: "#111111",
    lessons: [
      {
        ...read("dataframes-example", "DataFrames", "Create and inspect a pandas DataFrame.", ["pandas", "DataFrame"], [
          "Pandas is useful for working with tabular data — like Excel but in Python.",
          "A pandas DataFrame is very similar to a dictionary of lists: each key becomes a column name.",
          "Create one with `pd.DataFrame(dictionary)` and pandas turns it into a labelled table.",
          "Columns are selected by name, and multiple columns can be selected with a list of names."
        ], 10),
        images: [
          { src: "/images/session4/slide25-01.png", alt: "Creating a pandas DataFrame from a dictionary and printing it", caption: "A DataFrame is built from a dictionary — each key becomes a column." },
          { src: "/images/session4/slide26-01.png", alt: "DataFrame printed showing column headers and row indexes", caption: "pandas adds row numbers and labels the columns automatically." },
        ],
      },
      code("dataframes", "Checkpoint: DataFrames", "Create and inspect a pandas DataFrame.", ["pandas", "DataFrame"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Create a DataFrame with `name`, `score`, and `group` columns, then select and print only the `name` and `score` columns.", "import pandas as pd\n\n# Build the table.\n# Print the smaller table requested in the prompt.\n", ["score"], ["pd.DataFrame", "print"], ["pandas"], 25),
      {
        ...read("column-selection-example", "Selecting Columns", "Select one column or a smaller table of columns.", ["columns", "DataFrame"], [
          "Use `df['column']` for one column — this returns a pandas Series.",
          "Use `df[['a', 'b']]` with a list inside the brackets for a smaller DataFrame with multiple columns.",
          "Column names must match exactly, including capitalisation."
        ], 10),
        images: [
          { src: "/images/session4/slide27-01.png", alt: "Selecting a single column from a DataFrame using df['column']", caption: "`df['column']` returns one column as a Series." },
          { src: "/images/session4/slide28-01.png", alt: "Selecting multiple columns with a list of column names", caption: "`df[['a', 'b']]` returns a smaller DataFrame." },
        ],
      },
      code("column-selection", "Checkpoint: Selecting Columns", "Select one column or a smaller table of columns.", ["columns", "DataFrame"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "From `df`, select and print the `name` column, then select and print the smaller DataFrame containing `name` and `score`.", "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace'], 'score': [91, 76], 'group': ['A', 'B']})\n\n# Select and print the requested columns.\n", ["Ada", "score"], ["[", "print"], ["pandas"], 25),
      code("cb-pd-column", "Practice: Column Mean", "Select a column and compute its mean.", ["pandas", "column", "mean"], [
        "Use `df['column']` to select a Series, then call `.mean()` to get the average.",
        "The result is a single float — print it directly.",
      ], "Using the provided DataFrame, select the `score` column, calculate its mean, and print the calculated mean.", "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'score': [80, 90, 70]})\n\n# Select the numeric column, then summarise it.\n", ["80.0"], ["mean", "print"], ["pandas"], 20),
      read("iloc-indexing-example", "Integer-Location Indexing with `iloc`", "Use `.iloc` to index rows and columns by position.", ["iloc", "indexing"], [
        "`.iloc` stands for integer-location: it uses row and column numbers, not names.",
        "The syntax is `df.iloc[row, col]` and accepts slices just like NumPy arrays.",
        "This is useful when you want the first N rows or a specific positional slice of the data."
      ], 10),
      code("iloc-indexing", "Checkpoint: Integer-Location Indexing with `iloc`", "Use `.iloc` to index rows and columns by position.", ["iloc", "indexing"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Use `.iloc` to select and print the first two rows, then use `.iloc` again to print the value at row `0`, column `1`.", "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84], 'group': ['A', 'B', 'A']})\n\n# Make one row selection and one single-cell selection.\n", ["Ada", "Grace", "91"], ["iloc", "print"], ["pandas"], 25),
      {
        ...read("dataframe-masking-example", "DataFrame Masking", "Filter rows with a Boolean mask.", ["masking"], [
          "Pandas behaves very similarly to NumPy — you can use numpy functions on pandas columns.",
          "A comparison on a column creates a boolean mask, and passing that mask to the DataFrame filters the rows.",
          "This is a common data-cleaning step: keep only rows that meet a condition."
        ], 10),
        images: [
          { src: "/images/session4/slide30-01.png", alt: "Using a numpy function on a pandas column", caption: "NumPy functions work directly on pandas columns." },
          { src: "/images/session4/slide31-01.png", alt: "Creating a boolean mask from a comparison on a DataFrame column", caption: "A comparison on a column produces a True/False mask." },
          { src: "/images/session4/slide32-01.png", alt: "Applying a mask to a DataFrame to filter rows", caption: "Passing the mask to the DataFrame keeps only matching rows." },
        ],
      },
      code("dataframe-masking", "Checkpoint: DataFrame Masking", "Filter rows with a Boolean mask.", ["masking"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Print rows where `score` is at least `80`.", "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84]})\n\n# Filter and print.\n", ["Ada", "Guido"], [">=", "print"], ["pandas"], 25),
      code("cb-pd-filter", "Practice: Filter Rows", "Apply a boolean mask to select matching rows.", ["pandas", "masking"], [
        "Create a comparison on a column to build a boolean mask, then pass it to the DataFrame.",
        "Only rows where the mask is `True` are kept in the result.",
      ], "Using the provided cities DataFrame, filter to rows where `pop` is above `3`, then print the `city` column from the filtered rows.", "import pandas as pd\ndf = pd.DataFrame({'city': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], 'pop': [5.3, 5.0, 2.6, 2.2]})\n\n# Filter first, then choose the column to display.\n", ["Sydney", "Melbourne"], [">", "print"], ["pandas"], 20),
      code("dataframe-explore", "Exploring a DataFrame", "Use `.head()`, `.unique()`, and `.value_counts()` before cleaning.", ["DataFrame", "exploration"], [
        "Before cleaning or analysing data, explore it first.",
        "`.head()` shows the first few rows. `.unique()` shows distinct values in a column. `.value_counts()` counts how many times each value appears.",
        "These three methods together help you understand what is in the data and whether cleaning is needed."
      ], "Print the first 2 rows, the unique species values, and the count of each species.", "import pandas as pd\ndf = pd.DataFrame({\n    'species': ['oak', 'oak', 'elm', 'pine', 'elm'],\n    'height': [12, 15, 8, 20, 9]\n})\n\n# Inspect rows, distinct labels, and label counts.\n", ["oak", "elm", "pine"], ["head", "unique", "value_counts", "print"], ["pandas"], 25),
      {
        ...dataset("read-clean-weather", "Read and Clean a CSV", "Use `read_csv` and a quality mask.", ["read_csv", "masking"], [
          "Use `pd.read_csv(path)` to load a CSV file into a DataFrame.",
          "Real datasets often need filtering before analysis — rows with bad data should be removed first.",
          "In the weather file, keep rows where `Quality` is `Y` using a mask."
        ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "Load the weather CSV, keep only quality checked rows, store them as `clean`, and print `len(clean)`.", "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Load the file, clean the rows, then count the result.\n", ["19479"], ["pandas"], ["Use `pd.read_csv(path)`.", "Filter `Quality == 'Y'`."], 0, 25),
        images: [
          { src: "/images/session4/slide35-01.png", alt: "pd.read_csv loading a CSV file into a DataFrame", caption: "`pd.read_csv(path)` loads a CSV into a DataFrame in one line." },
          { src: "/images/session4/slide37-01.png", alt: "Data cleaning step: filtering rows by a quality column", caption: "Filter out low-quality rows before any analysis." },
        ],
      },
      {
        ...dataset("groupby-weather", "GroupBy", "Summarise data by year or month.", ["groupby"], [
          "Use `.groupby('column')` to cluster your data into groups based on repeated values.",
          "In the returned grouped DataFrame, the value you grouped by becomes the row index.",
          "Chain `.mean()`, `.sum()`, or `.count()` after `groupby` to summarise each group."
        ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "After cleaning the weather data, group by `Year`, calculate the yearly mean maximum temperature, and print the final row of the grouped result.", "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Prepare the data, summarise by year, then show the last row.\n", ["2024", "23.323"], ["pandas"], ["Use `.groupby('Year')`.", "Average `Maximum temperature (Degree C)`."], 0, 25),
        images: [
          { src: "/images/session4/slide42-01.png", alt: "groupby clustering rows by a category column", caption: "`groupby` clusters rows that share the same value in a column." },
          { src: "/images/session4/slide43-01.png", alt: "GroupBy result showing the grouped value as the index", caption: "The grouped column becomes the index in the result." },
        ],
      },
      code("random-int-arrays", "Random Integer Arrays", "Use `np.random.randint` to generate random integer data.", ["numpy", "random"], [
        "`np.random.randint(low, high, size)` generates random integers between `low` (inclusive) and `high` (exclusive).",
        "This is useful for creating test data before using real measurements.",
        "Always print `len()` to confirm the array has the expected size."
      ], "Create two arrays `x` and `y` of `20` random integers between `0` and `100`. Print the length of `x`.", "import numpy as np\n\n# Generate both arrays before checking the length.\nprint(len(x))\n", ["20"], ["np.random.randint", "print"], ["numpy"], 20),
      {
        ...read("random-scatter-example", "Scatter Plots", "Create random x/y values and plot them.", ["matplotlib", "scatter"], [
          "Matplotlib is the most popular plotting library in Python and creates Matlab-like plots.",
          "The basic plotting flow is: create data, specify the plot type, insert the data, and call `plt.show()`.",
          "Matplotlib can be confusing because there are multiple ways to create the same plot — the simplest is `plt.scatter(x, y)`."
        ], 10),
        images: [
          { src: "/images/session4/slide46-01.png", alt: "Matplotlib example: line plot with code and resulting graph", caption: "Matplotlib produces plots like this from just a few lines of code." },
          { src: "/images/session4/slide48-01.png", alt: "Generating random data with np.random and plotting it", caption: "`np.random.randint` generates test data before using real measurements." },
        ],
      },
      code("random-scatter", "Checkpoint: Scatter Plots", "Create random x/y values and plot them.", ["matplotlib", "scatter"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Create `20` random integer x values and `20` random integer y values, scatter plot them, call `plt.show()`, and print the length of `x`.", "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Generate the data.\n# Plot it, display it, then confirm the sample size.\n", ["20"], ["plt.scatter", "plt.show", "len", "print"], ["numpy", "matplotlib"], 25),
      {
        ...read("plot-labels-example", "Plot Labels", "Add labels so a plot can be interpreted.", ["matplotlib", "labels"], [
          "A plot should make the variables clear to anyone reading it.",
          "Use `plt.xlabel`, `plt.ylabel`, and `plt.title` to label the figure.",
          "Labels are part of the analysis because they stop readers guessing what the axes mean."
        ], 10),
        images: [
          { src: "/images/session4/slide50-01.png", alt: "Matplotlib plot with xlabel, ylabel, and title labels added", caption: "Labels make the axes readable — always add them before sharing a plot." },
          { src: "/images/session4/slide51-01.png", alt: "Plot of random scatter data with axis labels", caption: "The same data with labels is immediately clearer." },
        ],
      },
      code("plot-labels", "Checkpoint: Plot Labels", "Add labels so a plot can be interpreted.", ["matplotlib", "labels"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Using the provided `years` and `values`, create a labelled plot, call `plt.show()`, then print the provided `status` value.", "import matplotlib.pyplot as plt\nyears = [2020, 2021, 2022]\nvalues = [21.2, 22.1, 21.8]\nstatus = 'labelled'\n\n# Build the plot, make it readable, display it, then report completion.\n", ["labelled"], ["plt.plot", "plt.xlabel", "plt.ylabel", "plt.title", "plt.show", "status"], ["matplotlib"], 25),
      dataset("weather-plot", "Plot Climate Data", "Plot mean maximum temperature by year.", ["matplotlib", "groupby"], [
        "After cleaning and grouping the data, plot the yearly values.",
        "The plot is used to inspect the result, not just decorate the page.",
        "If the plot looks wrong, inspect the data before trusting the conclusion."
      ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "Clean the weather CSV, group by year, print the final row of the yearly result, plot the yearly result, and call `plt.show()`.", "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Prepare the yearly summary, print the final row, then plot it.\n", ["2024", "23.323"], ["pandas", "matplotlib"], ["Call `plt.show()`."], 1, 30),
      read("excel-files", "CSV and Excel Files", "Pandas can read CSV and Excel files.", ["read_csv", "read_excel"], [
        "Use `pandas.read_csv('file.csv')` for CSV files.",
        "Use `pandas.read_excel('file.xlsx')` for Excel files.",
        "Some formats need extra packages installed in the environment."
      ]),
    ],
  },
  {
    id: "errors-objects-structure",
    number: 7,
    title: "Errors, Objects, and Code Structure",
    theme: "Engineering",
    description: "Methods, objects, classes, inheritance, errors, exceptions, files, clean code, and project structure.",
    badge: "Engineering",
    accent: "#111111",
    lessons: [
      {
        ...read("methods-example", "Methods", "A method is a function belonging to a datatype.", ["methods"], [
          "It is called using dot syntax: `object.method()`.",
          "Strings have methods. Lists have methods. NumPy arrays and pandas DataFrames have methods.",
          "`list.append` modifies a list in place. String methods like `.upper()` and `.lower()` return new strings."
        ], 10),
        images: [
          { src: "/images/session3/slide49-01.png", alt: "Calling a method on an object using dot syntax", caption: "Methods are called with a dot: `object.method()`." },
          { src: "/images/session3/slide50-01.png", alt: "String method example: .upper() returning uppercase", caption: "String methods return a modified version of the string." },
          { src: "/images/session3/slide53-01.png", alt: "List of useful string and list methods with examples", caption: "Python's built-in types come with many useful methods." },
        ],
      },
      code("methods", "Checkpoint: Methods", "A method is a function belonging to a class or datatype.", ["methods"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Add `cat` to `animals`, then print the updated list and the uppercase version of `word`.", "animals = ['dog']\nword = 'python'\n\n# Update the list.\n# Transform the string for display.\n", ["cat", "PYTHON"], ["append", ".upper", "print"], [], 25),
      code("animal-name-class", "Creating a Class", "Use `class`, `__init__`, and `self` to create a custom data type. This is called a \"class\"", ["classes", "objects", "__init__", "self"], [
        "As you've seen, data types represent (collections of) data and can have their own methods.",
        "`__init__` is a special method called automatically when you create a new object.",
        "`self` refers to the specific instance — it lets the instance store and access its own data.",
        "Methods added to the class can read the instance's data (sometimes called attributes) via `self`.",
        "This is tricky to understand at first, and looking at the example might be of particular help to understand this."
      ], "Create an `Animal` class with a `name` attribute and a `greet` method that prints \"Hello, I'm \"+`name`. Create a `pingu` instance and call `greet()`.", "class Animal():\n    def __init__(self, name):\n        # Store name on self.\n       self.name = name\n\n    def greet(self):\n        # Print a greeting using self.name.\n        print(\"Hello, I am \"+self.name)\n\npingu = Animal('Pingu')\npingu.greet()\n\n# self.name is different for different instances of the class:\ngary = Animal('Gary')\ngary.greet()\n", [], [], [], 30),
      code("animal-species-class", "Practice: creating a Class", "Practice the concepts from the previous slide", ["methods"], [
        "Now solve a similar task yourself. The checkpoint checks the output, not whether you copied the worked example."
      ], "Expand the `Animal` class from the previous slide with a `species` attribute and include it in the `greet` method so it prints `Hello, I'm Pingu, I am a penguin`. Create a `pingu` instance and call `greet()`.", "class Animal():\n    def __init__(self, name, species):\n        # Store name AND species on self.\n        self.name = name\n\n    def greet(self):\n        # Print a greeting using both attributes.\n        pass\n\npingu = Animal('Pingu', 'Penguin')\npingu.greet()\n\n", ["Hello, I'm Pingu, I am a penguin"], ["class", "def", "__init__", "self", "print"], [], 30),
      code("objects-classes", "Objects and Classes", "Instances of classes are also referred to as \"objects\". (Under the hood, everything in Python is an object.) Here is another exercise for you to practice these concepts, this time with less given code scaffolding: define a custom data type (a \"class\") and then make an instance of it (an \"object\")", ["objects", "classes"], [
      ], "Create a `Cell` class with `relative_expression()` returning `GFP_level / RFP_level`, then instantiate it with `300` and `200` and print the method result.", "class Cell:\n    def __init__(self, GFP_level, RFP_level):\n        pass\n\n# Add relative_expression and print the result.\n", ["1.5"], ["class", "def", "return", "print"], [], 30),
      code("inheritance", "Inheritance and `super()`", "Child classes inherit from parent classes and can extend them.", ["inheritance", "super"], [
        "A child class inherits all attributes and methods of the parent class.",
        "When the child has its own `__init__`, call `super().__init__(...)` to set up the parent's attributes too.",
        "Child classes can add new attributes and methods, or override existing ones."
      ], "Create a `Bus` class that inherits from `Vehicle`, adds a `fare` attribute, and still has `rev_engine()`. Create a bus and print its fare then call `rev_engine()`.", "class Vehicle():\n    def __init__(self, registration, colour):\n        self.registration = registration\n        self.colour = colour\n\n    def rev_engine(self):\n        print('Vroom!')\n\nclass Bus(Vehicle):\n    def __init__(self, registration, colour, fare):\n        # Reuse the parent setup, then add the new attribute.\n        pass\n\nschool_bus = Bus('B1 BUS', 'yellow', '£1.55')\nprint(school_bus.fare)\nschool_bus.rev_engine()\n", ["£1.55", "Vroom!"], ["class", "super", "print"], [], 30),
      read("errors-tracebacks", "Errors and Tracebacks", "Read error messages before changing code randomly.", ["errors", "tracebacks"], [
        "**Syntax errors** happen when Python cannot parse the code — a missing colon, unmatched bracket, or wrong indentation.",
        "**Exceptions** happen while the code is running. Common ones are: `NameError` (misspelled variable), `IndexError` (index out of range), `ZeroDivisionError` (dividing by zero), `TypeError` (wrong type), `ValueError` (e.g. passing a negative number to something that expects positive numbers).",
        "When you see a traceback, read the *last line* first — it names the error type and often says exactly what went wrong.",
        "Then look at the lines above it to trace back which function call caused the problem.",
        "The debugging habit: read the error, find the line, understand what Python is complaining about, then change one thing."
      ]),
      quiz("traceback-practice", "Traceback Practice", "Use the final line of an error message to identify the problem.", ["tracebacks"], [
        "The final line usually names the error type.",
        "The earlier lines help locate where the error came from."
      ], "If the final line says `NameError: name 'totl' is not defined`, what is the most likely issue?", ["A misspelled variable name", "A missing CSV file", "A plot label is too long", "The code used too much memory"], "A misspelled variable name", "`totl` is probably a typo for another variable name."),
      code("try-except", "Handling Exceptions", "Use `try` and `except` for expected failures.", ["try", "except"], [
        "A `try` block contains code that might fail.",
        "An `except` block handles the failure.",
        "Catch specific exception types (e.g. `except ZeroDivisionError`) so that unexpected errors still surface."
      ], "Write `find_length(x)` so it returns `len(x)`, or `None` if calling `len` on the object throws a `TypeError`.", "def find_length(x):\n    pass\n\nprint(find_length('python'))\nprint(find_length(42))\n", ["6", "None"], ["try", "except", "return"], [], 25),
      read("clean-code", "Clean Code and Documentation", "Good names, comments, docstrings, and a README make code understandable.", ["naming", "comments", "docstrings", "README"], [
        "**Naming**: prefer `foci_per_cell = foci_number / cell_number` over `fpc = f / c`. The longer name is self-explanatory.",
        "**Comments**: explain *why*, not *what*. `# remove noise` is useful; `# run gaussian blur` just restates the function name.",
        "**Docstrings**: describe what the function does, its parameters, and its return value. Use triple quotes at the start of a function.",
        "**README**: a plain-text file at the root of a project. Covers what it does, how to install, how to run, and what the output means.",
        "Run `import this` in a Python terminal to see the Zen of Python — 19 guiding principles such as 'Readability counts' and 'Explicit is better than implicit'."
      ]),
      read("structure-docs", "Structure and Documentation", "Organise code and document intent.", ["modules", "README", "docstrings"], [
        "Individual scripts get confusing quickly. Structuring code organises things and promotes reuse.",
        "You can import functions from files such as `my_funcs.py` or from folders such as `utils.my_funcs`.",
      ]),
      quiz("copying", "Deep vs Shallow Copy", "Assignment can create two names for the same mutable object.", ["copy", "mutable"], [
        "If `b = a` and `a` is a list, both names refer to the same list.",
        "This matters for mutable collections and objects."
      ], "What prints after `a=[1,2,3]; b=a; b[0]=42; print(a[0])`?", ["42", "1", "0", "Error"], "42", "Both names refer to the same list."),
    ],
  },
  {
    id: "exams-support",
    number: 8,
    title: "exams and Working Outside the Website",
    theme: "Practice",
    description: "Larger assignments, dataset missions, responsible AI use, and setup guidance for continuing in an IDE with Jupyter and conda.",
    badge: "Finish",
    accent: "#111111",
    lessons: [
      read("conda-environments", "Conda Environments", "Use conda to create isolated Python environments for each project.", ["conda", "environments", "packages"], [
        "A virtual environment keeps a project's Python version and packages separate from other projects.",
        "Create a new environment: `conda create --name my-project python=3.12 notebook`.",
        "Activate it before working: `conda activate my-project`.",
        "You can have as many environments as you like — activate the right one before installing or running code.",
        "pip installs Python packages only. conda can also install non-Python libraries (useful for scientific packages).",
        "Environments make your work reproducible: you can share an environment file so a colleague gets exactly the same setup."
      ]),
      read("ways-of-working", "Ways of Working with Python", "Choose between the REPL, notebooks, and scripts depending on your task.", ["REPL", "notebooks", "scripts", "Jupyter"], [
        "There are three main ways to run Python: the REPL (interactive console), notebooks (.ipynb), and scripts (.py).",
        "The **REPL** (Read-Eval-Print Loop) runs one line at a time. Good for quick experiments.",
        "**Notebooks** mix code, output, notes, and plots in one file. Good for exploratory analysis.",
        "**Scripts** run from top to bottom every time. Good for repeatable work and automation.",
        "A common workflow: explore in a notebook, then move the final steps into a script once the analysis is settled.",
        "In VS Code or PyCharm, open your project folder, select the correct conda interpreter, and use the integrated terminal for environment commands."
      ]),
      code("student-assignment", "Assignment: Student Dictionary", "Use dictionaries, functions, and NumPy together.", ["dict", "function", "np.argmax"], [
        "Start with a dictionary whose values are lists.",
        "Write a function that takes the dictionary and an index.",
        "Use NumPy to determine the index of the student with the highest attendance percentage."
      ], "Use `np.argmax` to find the row with the highest attendance, then print the record values for that student.", "import numpy as np\nstudents = {\n    'name': ['Ada', 'Grace', 'Guido'],\n    'attendance': [88, 92, 81],\n    'score': [91, 76, 84]\n}\n\n# Write a helper for reading one row from all columns.\n# Find the best attendance row, then display it.\n", ["Grace", "92"], ["def", "np.argmax", "print"], ["numpy"], 30),
      dataset("hospital-mission", "Exam Task: Public Hospitals", "Answer two questions about the public hospitals dataset.", ["pandas", "filtering", "sum"], [
        "The column `Peer Group Name` identifies the hospital type — look for `'Psychiatric'`.",
        "The column `Remoteness area` classifies location — `'Major Cities'` is one value.",
        "The column `Number of available beds` holds bed counts; filter to `State == 'NSW'` first."
      ], `${csvBase}/public_hospital_list.csv`, "Load `public_hospital_list.csv` and print two answers: (1) how many `Psychiatric` hospitals have `Remoteness area` equal to `'Major Cities'`, and (2) the total `Number of available beds` across all `NSW` hospitals.", "import pandas as pd\npath = '/data/public_hospital_list.csv'\n\n# Q1: combine the hospital type and location filters, then count rows.\n# Q2: filter to the requested state, then total the beds column.\n", ["18", "21146.8"], ["pandas"], ["Combine two masks with `&` for Q1.", "For Q2, filter `State == 'NSW'` then call `.sum()` on `Number of available beds`."], 0, 30),
      dataset("street-tree-mission", "Exam Task: Street Trees", "Plot the location of every street tree in Manningham.", ["matplotlib", "scatter"], [
        "The dataset has `lat` and `lon` columns giving GPS coordinates for each tree.",
        "A scatter plot with `lon` on the x-axis and `lat` on the y-axis maps the tree locations spatially."
      ], `${csvBase}/manningham_street_trees.csv`, "Load `manningham_street_trees.csv`, print `len(df)`, then create a scatter plot with `lon` on the x-axis and `lat` on the y-axis. Call `plt.show()`.", "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/manningham_street_trees.csv'\n\n# Load the data, report its size, then plot longitude against latitude.\n", ["66904"], ["pandas", "matplotlib"], ["Use `df['lon']` for x and `df['lat']` for y in `plt.scatter()`.", "Call `plt.show()` after the plot."], 1, 30),
      dataset("vaccination-mission", "Exam Task: Vaccination Data", "Find the NSW area with the lowest childhood vaccination rate.", ["Excel", "sorting"], [
        "The file is an Excel spreadsheet — use `pd.read_excel(path)` to load it.",
        "The column `% Fully` holds the percentage of children fully vaccinated.",
        "Sort by `% Fully` ascending and read the first row: `SA3_Name` is the area, `Age Group` is the age bracket."
      ], `${csvBase}/childhood_vaccination_data_nsw.xlsx`, "Load `childhood_vaccination_data_nsw.xlsx`, sort by `% Fully` ascending, select the lowest row, and print that row's `SA3_Name`, `Age Group`, and `% Fully` values.", "import pandas as pd\npath = '/data/childhood_vaccination_data_nsw.xlsx'\n\n# Load the spreadsheet.\n# Put the lowest vaccination rate first.\n# Print the requested fields from that row.\n", ["Richmond Valley - Coastal", "2 Year olds", "76.164"], ["pandas", "openpyxl"], ["Use `.sort_values('% Fully')` then `.iloc[0]` to access the lowest row.", "Print individual values with `row['SA3_Name']`, `row['Age Group']`, `row['% Fully']`."], 0, 30),
      dataset("weather-exam", "Climate Data exam", "Clean, summarise, and explore the full weather dataset.", ["read_csv", "groupby", "plot"], [
        "Use masking to keep only rows where `Quality` is `Y`.",
        "Group by `Year` to find the hottest and coldest average years.",
        "Group by `Month` to find the hottest and coldest average months.",
        "Plot yearly mean temperatures."
      ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "Print the hottest average year (2023), the coldest average year (2018), the hottest average month (1), and the coldest average month (7). Then plot yearly mean temperatures and call `plt.show()`.", "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Prepare the clean dataset.\n# Summarise years and months to find the extremes.\n# Plot the yearly summary.\n", ["2023", "2018", "1", "7"], ["pandas", "matplotlib"], ["Use `Quality == 'Y'`.", "Use `.idxmax()` and `.idxmin()` on a grouped mean.", "Group by 'Month' for monthly averages."], 1, 35),
      workshop("notebook-and-script-outputs", "Notebook and Script Outputs", "Turn a working browser exercise into a local notebook or script later.", ["notebooks", "scripts"], [
        "A notebook is useful while exploring because code, output, notes, and plots live together.",
        "A script is better when the same analysis should run from top to bottom repeatedly.",
        "When moving work out of the website, keep the same habit: small changes, run often, inspect output."
      ]),
      read("ai-use", "Using AI as a Beginner", "Use AI for explanation, not to skip understanding.", ["AI", "learning"], [
        "You need the skills to comprehend what the AI is saying to you.",
        "Sometimes you reach a problem the AI cannot solve. What then?",
        "It is OK to use AI when you need something explained so that you can do it yourself."
      ]),
      workshop("leaving-the-website", "Working Outside the Website", "Set up VS Code, Jupyter, conda, and scripts when you are ready to work locally.", ["VS Code", "conda", "Jupyter", "scripts"], [
        "This belongs near the end because the website lets you practise Python without local setup first.",
        "When leaving the website, create a project folder, open it in VS Code or PyCharm, select the correct interpreter, and use the terminal for environment/package commands.",
        "Use conda environments to separate project dependencies. Use notebooks for exploratory work and scripts for repeatable work.",
        "Troubleshooting checks: make sure the correct conda environment is active, check `which python` and `which pip`, and read error messages carefully."
      ], 15),
      read("next-steps", "Next Steps", "Practice is the next step.", ["practice"], [
        "We have covered basic programming principles.",
        "Next step: practice. Mess around. Solve problems. Google things. Ask for help.",
        "Useful resources include CS50, UCL ARC courses, Software Carpentry, research software engineering materials, and Exercism."
      ]),
    ],
  },
];

export const allLessons = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({ ...lesson, courseId: course.id })),
);

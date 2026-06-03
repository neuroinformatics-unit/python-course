import type { Course } from "../types";
import { code, quiz, read } from "../lessonBuilders";

export const errorsObjectsStructure: Course = {
  id: "errors-objects-structure",
  number: 7,
  title: "Errors, Objects, and Code Structure",
  theme: "Engineering",
  description: "Methods, objects, classes, inheritance, errors, exceptions, files, clean code, and project structure.",
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
    code("methods", "Practice: Methods", "A method is a function belonging to a class or datatype.", ["methods"], [
      "Now solve a similar task yourself. The practice checks the output."
    ], "Add `cat` to `animals`, then print the updated list and the uppercase version of `word`.", "animals = ['dog']\nword = 'python'\n\n# Update the list.\n# Transform the string for display.\n", ["cat", "PYTHON"], ["append", ".upper", "print"], [], 25),
    code("animal-name-class", "Creating a Class", "Use `class`, `__init__`, and `self` to create a custom data type. This is called a \"class\"", ["classes", "objects", "__init__", "self"], [
      "As you've seen, data types represent (collections of) data and can have their own methods.",
      "`__init__` is a special method called automatically when you create a new object.",
      "`self` refers to the specific instance — it lets the instance store and access its own data.",
      "Methods added to the class can read the instance's data (sometimes called attributes) via `self`.",
      "This is tricky to understand at first, and looking at the example might be of particular help to understand this."
    ], "Create an `Animal` class with a `name` attribute and a `greet` method that prints \"Hello, I'm \"+`name`. Create a `pingu` instance and call `greet()`.", "class Animal():\n    def __init__(self, name):\n        # Store name on self.\n       self.name = name\n\n    def greet(self):\n        # Print a greeting using self.name.\n        print(\"Hello, I am \"+self.name)\n\npingu = Animal('Pingu')\npingu.greet()\n\n# self.name is different for different instances of the class:\ngary = Animal('Gary')\ngary.greet()\n", [], [], [], 30),
    code("animal-species-class", "Practice: creating a Class", "Practice the concepts from the previous slide", ["methods"], [
      "Now solve a similar task yourself. The practice checks the output, not whether you copied the worked example."
    ], "Expand the `Animal` class from the previous slide with a `species` attribute and include it in the `greet` method so it prints `Hello, I'm Pingu, I am a penguin`. Create a `pingu` instance and call `greet()`.", "class Animal():\n    def __init__(self, name, species):\n        # Store name AND species on self.\n        self.name = name\n\n    def greet(self):\n        # Print a greeting using both attributes.\n        pass\n\npingu = Animal('Pingu', 'Penguin')\npingu.greet()\n\n", ["Hello, I'm Pingu, I am a penguin"], ["class", "def", "__init__", "self", "print"], [], 30),
    code("objects-classes", "Objects and Classes", "Instances of classes are also referred to as \"objects\". (Under the hood, everything in Python is an object.) Here is another exercise for you to practice these concepts, this time with less given code scaffolding: define a custom data type (a \"class\") and then make an instance of it (an \"object\")", ["objects", "classes"], [
    ], "Create a `Cell` class with `relative_expression()` returning `GFP_level / RFP_level`, then instantiate it with `300` and `200` and print the method result.", "class Cell:\n    def __init__(self, GFP_level, RFP_level):\n        pass\n\n# Add relative_expression and print the result.\n", ["1.5"], ["class", "def", "return", "print"], [], 30),
    code("inheritance", "Inheritance and `super()`", "Child classes inherit from parent classes and can extend them.", ["inheritance", "super"], [
      "A child class inherits all attributes and methods of the parent class.",
      "When the child has its own `__init__`, call `super().__init__(...)` to set up the parent's attributes too.",
      "Child classes can add new attributes and methods, or override existing ones."
    ], "Create a `Bus` class that inherits from `Vehicle`, adds a `fare` attribute, and still has `rev_engine()`. Create a bus and print its fare then call `rev_engine()`.", "class Vehicle():\n    def __init__(self, registration, colour):\n        self.registration = registration\n        self.colour = colour\n\n    def rev_engine(self):\n        print('Vroom!')\n\nclass Bus(Vehicle):\n    def __init__(self, registration, colour, fare):\n        # Reuse the parent setup, then add the new attribute.\n        pass\n\nschool_bus = Bus('B1 BUS', 'yellow', '£1.55')\nprint(school_bus.fare)\nschool_bus.rev_engine()\n", ["£1.55", "Vroom!"], ["class", "super", "print"], [], 30),
    quiz("copying", "Deep vs Shallow Copy", "Watch out: Assignment (the `=` operation) can create two names for the same mutable object.", ["copy", "mutable"], [
      "If `b = a` and `a` is a list, both names refer to the same list.",
      "This matters for mutable collections and objects."
    ], "What prints after `a=[1,2,3]; b=a; b[0]=42; print(a[0])`?", ["42", "1", "0", "Error"], "42", "Both names refer to the same list."),
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
    quiz("copying", "Deep vs Shallow Copy", "Using `=` can create two names for the same mutable object.", ["copy", "mutable"], [
      "If `b = a` and `a` is a list, both names refer to the same list.",
      "This matters for mutable collections and objects."
    ], "What prints after `a=[1,2,3]; b=a; b[0]=42; print(a[0])`?", ["42", "1", "0", "Error"], "42", "Both names refer to the same list."),
  ],
};

import type { Course } from "../types";
import { code, quiz, read, workshop } from "../lessonBuilders";

export const packagesNumpy: Course = {
  id: "packages-numpy",
  number: 5,
  title: "Packages and NumPy",
  theme: "Packages",
  description: "Third-party packages, aliases, NumPy arrays, operations, shape, indexing, masks.",
  accent: "#111111",
  lessons: [
    {
      ...read("packages", "Third-Party Packages", "Packages add functionality that does not come with base Python.", ["pip", "packages"], [
        "There are many community-created libraries.",
        "pip is used in the terminal to install Python packages.",
        "NumPy, pandas, and matplotlib are common packages for scientific/data work.",
        "Packages developed by the NIU are also a (smaller, domain-focused) part of this ecosystem.",
        "For this course, packages are loaded in the browser when an exercise needs them."
      ]),
      images: [
        { src: "https://zenodo.org/records/17436793/files/Scientific-Python-Ecosystem.png", alt: "Scientific Python ecosystem diagram showing connected third-party packages", caption: "The scientific Python ecosystem includes many connected third-party packages such as NumPy, pandas, and matplotlib." },
      ],
    },
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
    workshop("install-command-reading", "Installing packages", "Read install commands before using them locally.", ["pip", "conda"], [
      "For this course, package installing and loading is handled for you.",
      "Beyond this course, you will need to install third-party Python packages yourself, using commands such as `pip install` or `conda install`.",
      "We will talk more about where and how to install packages in [Module 8](#assignments-support)."
    ]),
    {
      ...read("numpy-max-argmax-example", "NumPy Functions", "Use `np.max` and `np.argmax`.", ["np.max", "np.argmax"], [
        "NumPy is useful for operations on arrays. A numpy array is its own datatype provided by the `numpy` package — it is designed to contain (typically) numerical data arranged linearly. Arrays can be multidimensional: a 1-dimensional array may represent height measurements of people, or a 2-dimensional array may contain a (grayscale) photograph.",
        "NumPy also provides some functions for arrays. For example, `np.max` returns the maximum value. `np.argmax` returns the index of the maximum value.",
        "These functions work efficiently on large arrays because NumPy operations run in optimised C code under the hood."
      ], 10),
      images: [
        { src: "/images/session3/slide20-01.png", alt: "NumPy array created and used with np.max", caption: "NumPy makes mathematical operations on collections fast and concise." },
        { src: "/images/session3/slide21-01.png", alt: "np.argmax finding the index of the maximum value", caption: "`np.argmax` returns the *position* of the maximum, not the value." },
        { src: "/images/session3/slide22-01.png", alt: "NumPy array class attributes: dtype and shape", caption: "A NumPy array is a class with attributes like `.dtype` and `.shape`." },
      ],
    },
    code("numpy-max-argmax", "Practice: NumPy Functions", "Use `np.max` and `np.argmax`.", ["np.max", "np.argmax"], [
      "Now solve a similar task yourself. The practice checks the output."
    ], "Print the maximum value in `values`, then print the index where that maximum occurs.", "import numpy as np\nvalues = [3, 9, 2, 5]\n\n# Use the two NumPy functions from the lesson.\n", ["9", "1"], ["np.max", "np.argmax", "print"], ["numpy"], 25),
    {
      ...read("array-operations-example", "Array Operations", "Perform mathematical operations on arrays.", ["arrays", "operations"], [
        "Operations like `+`, `-`, `*`, and `/` apply to every element at once — no loop needed.",
        "We can also perform operations between two arrays with the same shape — each element is paired up."
      ], 10),
      images: [
        { src: "/images/session4/slide08-01.png", alt: "Array operation: multiplying an array by a scalar value", caption: "A single operation applies to every element — no loop needed." },
        { src: "/images/session4/slide09-01.png", alt: "Array operation: adding two arrays of the same shape element-wise", caption: "Operating on two arrays pairs up elements by position." },
        { src: "/images/session4/slide11-01.png", alt: "Array operation combining multiple steps", caption: "You can chain multiple operations just like with plain numbers." },
      ],
    },
    code("array-operations", "Practice: Array Operations", "Perform mathematical operations on arrays.", ["arrays", "operations"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("shape-and-indexing", "Practice: Shape and Indexing", "Create and index multidimensional arrays.", ["shape", "indexing"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("random-int-arrays", "Random Integer Arrays", "So far, we have seen how arrays can be created based on an input list, e.g. `arr = np.array([1,2,3]). Use `np.random.randint` to generate arrays containing random integer data.", ["numpy", "random"], [
      "`np.random.randint(low, high, size)` generates random integers between `low` (inclusive) and `high` (exclusive).",
      "This is useful for creating test data before using real measurements.",
      "Always print `len()` to confirm the array has the expected size."
    ], "Create two arrays `x` and `y` of `20` random integers between `0` and `100`. Print the length of `x`.", "import numpy as np\n\n# Generate both arrays before checking the length.\nprint(len(x))\n", ["20"], ["np.random.randint", "print"], ["numpy"], 20),

    code("create-arrays-ones-zeros", "Creating Arrays", "Use `np.ones` and `np.zeros` to generate arrays containing all ones or all zeros, respectively.", ["numpy", "ones", "zeros"], [
      "`np.ones((20, 30))` and `np.zeros((20, 30))` create new 2D arrays filled with ones or zeros.",
      "You can also create zeros with the same shape as an existing array."
    ], "Create an array full of ones with shape `(10, 20, 30)`. Then create an array full of zeros with the same shape. Print the shape of each array.", "import numpy as np\n\n# Create the ones array.\n# Create the zeros array with the same shape.\n# Print both shapes.\n", ["(10, 20, 30)\n(10, 20, 30)"], ["np.ones", "np.zeros", "shape", "print"], ["numpy"], 20),
    code("array-range-indexing", "Practice: Array Range Indexing", "Slice rows and columns from a multidimensional array.", ["slicing", "arrays"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("masks", "Practice: Masks", "Use comparison operators to filter arrays.", ["masks", "comparison"], [
      "Now solve a similar task yourself. The practice checks the output."
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
};

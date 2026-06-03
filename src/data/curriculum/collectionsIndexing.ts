import type { Course } from "../types";
import { code, quiz, read } from "../lessonBuilders";

export const collectionsIndexing: Course = {
  id: "collections-indexing",
  number: 2,
  title: "Collections and Indexing",
  theme: "Collections",
  description: "Lists, dictionaries, tuples, sets, indexing, slicing, tuple unpacking, conversion, and `len()`.",
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
    code("mutation-demo", "Practice: Mutability", "Mutate a list by changing one of its items.", ["mutable", "list"], [
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
    code("slicing", "Practice: Range Indexing and Slicing", "Use a colon to take part of a list.", ["slicing"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("collection-conversion", "Practice: Converting Collections", "Use conversion functions such as `list()` and `set()`.", ["conversion", "set"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("len-practice", "Practice: The `len()` Function", "Use `len()` on strings, lists, and dictionaries.", ["len"], [
      "Now solve a similar task yourself. The practice checks the output."
    ], "Print the length of `word`, `animals`, and `settings`.", "word = 'Python'\nanimals = ['dog', 'cat', 'llama']\nsettings = {'theme': 'light', 'level': 'intro'}\n\n# Print the length of each variable.\n", ["6", "3", "2"], ["len", "print"], [], 20),
    read("tuple-unpacking-example", "Tuple Unpacking", "Assign tuple elements directly to named variables.", ["tuples", "unpacking"], [
      "Tuple unpacking assigns each element of a tuple to a separate variable in one line.",
      "This is often used to unpack co-ordinates, pairs, or function return values.",
      "The number of names on the left must match the number of values in the tuple."
    ], 10),
    code("tuple-unpacking", "Practice: Tuple Unpacking", "Assign tuple elements directly to named variables.", ["tuples", "unpacking"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("dictionary-lists", "Practice: Dictionary of Lists", "A dictionary value can be a list.", ["dict", "list", "indexing"], [
      "Now solve a similar task yourself. The practice checks the output."
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
};

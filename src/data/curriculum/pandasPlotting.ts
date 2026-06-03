import type { Course } from "../types";
import { code, csvBase, dataset, read } from "../lessonBuilders";

export const pandasPlotting: Course = {
  id: "pandas-plotting",
  number: 6,
  title: "Pandas and Plotting",
  theme: "Data",
  description: "DataFrames, exploration, CSV/Excel files, iloc, masking, grouping, and matplotlib plots.",
  accent: "#111111",
  lessons: [
    {
      ...read("dataframes-example", "DataFrames", "Create and inspect a pandas DataFrame.", ["pandas", "DataFrame"], [
        "Pandas is useful for working with tabular data — like Excel but in Python.",
        "A pandas DataFrame is very similar to a dictionary of lists: each key becomes a column name.",
        "Create one with `pd.DataFrame(dictionary)` and pandas turns it into a labelled table."
      ], 10),
      images: [
        { src: "/images/session4/slide25-01.png", alt: "Creating a pandas DataFrame from a dictionary and printing it", caption: "A DataFrame is built from a dictionary — each key becomes a column." },
        { src: "/images/session4/slide26-01.png", alt: "DataFrame printed showing column headers and row indexes", caption: "pandas adds row numbers and labels the columns automatically." },
      ],
    },
    code("dataframes", "Practice: DataFrames", "Create and inspect a pandas DataFrame.", ["pandas", "DataFrame"], [
      "Now solve a similar task yourself. The practice checks the output."
    ], "Create a DataFrame with `name`, `score`, and `group` columns, then print the full DataFrame.", "import pandas as pd\n\n# Build the table.\n# Print the full DataFrame.\n", ["score", "group"], ["pd.DataFrame", "print"], ["pandas"], 25),
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
    code("column-selection", "Practice: Selecting Columns", "Select one column or a smaller table of columns.", ["columns", "DataFrame"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("iloc-indexing", "Practice: Integer-Location Indexing with `iloc`", "Use `.iloc` to index rows and columns by position.", ["iloc", "indexing"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("dataframe-masking", "Practice: DataFrame Masking", "Filter rows with a Boolean mask.", ["masking"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    read("excel-files", "CSV and Excel Files", "Pandas can read CSV and Excel files.", ["read_csv", "read_excel"], [
      "Use `pandas.read_csv('file.csv')` for CSV files.",
      "Use `pandas.read_excel('file.xlsx')` for Excel files.",
      "Some formats need extra packages installed in the environment."
    ]),
    {
      ...dataset("read-clean-weather", "Read and Clean a CSV", "Use `read_csv` and a quality mask.", ["read_csv", "masking"], [
        "Use `pd.read_csv(path)` to load a CSV file into a DataFrame.",
        "Real datasets often need filtering before analysis — rows with bad data should be removed first.",
        "In the weather file, keep rows where `Quality` is `Y` using a mask."
      ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "Load the weather CSV, keep only quality checked rows, store them as `clean`, and print `len(clean)`.", "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Load the file, clean the rows, then count the result.\n", ["19479"], ["pandas"], ["Use `pd.read_csv(path)`.", "Filter `Quality == 'Y'`."], 0, 25),
      examples: [
        {
          code: `import pandas as pd

path = "/data/parramatta_daily_maximum_temperature.csv"
df = pd.read_csv(path)

print(df.head())
print(len(df))`,
          caption: "`pd.read_csv(path)` loads the full weather CSV into a DataFrame.",
          packages: ["pandas"],
          datasetPaths: [`${csvBase}/parramatta_daily_maximum_temperature.csv`],
        },
        {
          code: `import pandas as pd

path = "/data/parramatta_daily_maximum_temperature.csv"
df = pd.read_csv(path)

clean = df[df["Quality"] == "Y"]
print(clean.head())
print(len(clean))`,
          caption: "Filter out low-quality rows before any analysis.",
          packages: ["pandas"],
          datasetPaths: [`${csvBase}/parramatta_daily_maximum_temperature.csv`],
        },
      ],
    },
    {
      ...dataset("groupby-weather", "GroupBy", "Summarise data by year or month.", ["groupby"], [
        "Use `.groupby('column')` to cluster your data into groups based on repeated values.",
        "In the returned grouped DataFrame, the value you grouped by becomes the row index.",
        "Chain `.mean()`, `.sum()`, or `.count()` after `groupby` to summarise each group."
      ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "After cleaning the weather data, group by `Year`, calculate the yearly mean maximum temperature, and print the final row of the grouped result.", "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Prepare the data, summarise by year, then show the last row.\n", ["2024", "23.323"], ["pandas"], ["Use `.groupby('Year')`.", "Average `Maximum temperature (Degree C)`."], 0, 25),
      examples: [
        {
          code: `import pandas as pd

path = "/data/parramatta_daily_maximum_temperature.csv"
df = pd.read_csv(path)
clean = df[df["Quality"] == "Y"]

yearly = clean.groupby("Year")["Maximum temperature (Degree C)"].mean()
print(yearly.head())`,
          caption: "`groupby` clusters rows that share the same value, then `.mean()` summarises each group.",
          packages: ["pandas"],
          datasetPaths: [`${csvBase}/parramatta_daily_maximum_temperature.csv`],
        },
        {
          code: `import pandas as pd

path = "/data/parramatta_daily_maximum_temperature.csv"
df = pd.read_csv(path)
clean = df[df["Quality"] == "Y"]

yearly = clean.groupby("Year")["Maximum temperature (Degree C)"].mean()
print(yearly.tail())
print(yearly.tail(1))`,
          caption: "The grouped column becomes the index in the result.",
          packages: ["pandas"],
          datasetPaths: [`${csvBase}/parramatta_daily_maximum_temperature.csv`],
        },
      ],
    },
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
    code("random-scatter", "Practice: Scatter Plots", "Create random x/y values and plot them.", ["matplotlib", "scatter"], [
      "Now solve a similar task yourself. The practice checks the output."
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
    code("plot-labels", "Practice: Plot Labels", "Add labels so a plot can be interpreted.", ["matplotlib", "labels"], [
      "Now solve a similar task yourself. The practice checks that your code creates a plot."
    ], "Using the provided `years` and `values`, create a labelled plot, then call `plt.show()`.", "import matplotlib.pyplot as plt\nyears = [2020, 2021, 2022]\nvalues = [21.2, 22.1, 21.8]\n\n", [], ["plt.plot", "plt.xlabel", "plt.ylabel", "plt.title", "plt.show"], ["matplotlib"], 25, 1),
    dataset("weather-plot", "Plot Climate Data", "Plot mean maximum temperature by year.", ["matplotlib", "groupby"], [
      "After cleaning and grouping the data, plot the yearly values.",
      "The plot is used to inspect the result, not just decorate the page.",
      "If the plot looks wrong, inspect the data before trusting the conclusion."
    ], `${csvBase}/parramatta_daily_maximum_temperature.csv`, "Clean the weather CSV, group by year, print the final row of the yearly result, plot the yearly result, and call `plt.show()`.", "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/parramatta_daily_maximum_temperature.csv'\n\n# Prepare the yearly summary, print the final row, then plot it.\n", ["2024", "23.323"], ["pandas", "matplotlib"], ["Call `plt.show()`."], 1, 30),
  ],
};

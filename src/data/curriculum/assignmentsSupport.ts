import type { Course } from "../types";
import { code, csvBase, dataset, read, workshop } from "../lessonBuilders";

export const assignmentsSupport: Course = {
  id: "assignments-support",
  number: 8,
  title: "Assignments and Working Outside this Website",
  theme: "Practice",
  description: "Larger assignments, dataset missions, responsible AI use, and setup guidance for continuing in an IDE with Jupyter and conda.",
  accent: "#111111",
  lessons: [
    read("conda-environments", "Conda Environments", "Use conda to create isolated Python environments for each project.", ["conda", "environments", "packages"], [
      "A virtual environment keeps a project's Python version and packages separate from other projects.",
      "[Conda installation instructions are available here.](https://www.anaconda.com/docs/getting-started/anaconda/install/overview)",
      "Create a new environment: `conda create --name my-project python=3.12 notebook`.",
      "Activate it before working: `conda activate my-project`.",
      "You can have as many environments as you like — activate the right one before installing or running code.",
      "pip installs Python packages only. conda can also install non-Python libraries (useful for scientific packages).",
      "Environments make your work reproducible: you can share an environment file so a colleague gets exactly the same setup."
    ]),
    read("integrated-development-environments", "Integrated Development Environments", "Use an IDE such as VS Code to write, run, and manage Python projects on your own computer.", ["IDE", "VS Code", "Python", "projects"], [
      "An IDE (Integrated Development Environment) gives you a code editor, project file browser, terminal, autocomplete, and debugging tools in one place.",
      "VS Code is a popular free choice for Python work. [VS Code installation instructions are available here.](https://code.visualstudio.com/docs/setup/setup-overview)",
      "After installing VS Code, install the Python extension so it can recognise Python files, notebooks, interpreters, and environments.",
      "Open your project folder in VS Code, then select the conda environment you created for that project.",
      "Use the built-in terminal for commands such as `conda activate my-project`, `pip install ...`, and `python script.py`.",
      "The key habit is to keep each project in its own folder and use the matching environment whenever you work on it."
    ]),
    read("ways-of-working", "Ways of Working with Python", "Choose between the REPL, notebooks, and scripts depending on your task.", ["REPL", "notebooks", "scripts", "Jupyter"], [
      "There are three main ways to run Python: the REPL (interactive console), notebooks (.ipynb), and scripts (.py).",
      "The **REPL** (Read-Eval-Print Loop) runs one line at a time. Good for quick experiments.",
      "**Notebooks** mix code, output, notes, and plots in one file. Good for exploratory analysis.",
      "**Scripts** run from top to bottom every time. Good for repeatable work and automation.",
      "A common workflow: explore in a notebook, then move the final steps into a script once the analysis is settled.",
      "In VS Code or PyCharm, open your project folder, select the correct conda interpreter, and use the integrated terminal for environment commands."
    ]),
    read("osss-readiness", "Ready for OSSS", "Completing the next assignments means you are ready for OSSS.", ["OSSS", "assignments", "readiness"], [
      "The following assignments combine the main skills from this course: data structures, functions, NumPy, pandas, filtering, and plotting.",
      "If you can complete them with careful use of documentation, debugging, and your own notes, you are ready for OSSS.",
      "You do not need to memorise every command. You need to recognise the task, choose the right tool, and work through mistakes methodically."
    ]),
    code("student-assignment", "Assignment: Student Dictionary", "Use dictionaries, functions, and NumPy together.", ["dict", "function", "np.argmax"], [
      "Start with a dictionary whose values are lists.",
      "Write a function that takes the dictionary and an index.",
      "Use NumPy to determine the index of the student with the highest attendance percentage."
    ], "Use `np.argmax` to find the row with the highest attendance, then print the record values for that student.", "import numpy as np\nstudents = {\n    'name': ['Ada', 'Grace', 'Guido'],\n    'attendance': [88, 92, 81],\n    'score': [91, 76, 84]\n}\n\n# Write a helper for reading one row from all columns.\n# Find the best attendance row, then display it.\n", ["Grace", "92"], ["def", "np.argmax", "print"], ["numpy"], 30),
    dataset("hospital-mission", "Assignment: Public Hospitals", "Answer two questions about the public hospitals dataset.", ["pandas", "filtering", "sum"], [
      "The column `Peer Group Name` identifies the hospital type — look for `'Psychiatric'`.",
      "The column `Remoteness area` classifies location — `'Major Cities'` is one value.",
      "The column `Number of available beds` holds bed counts; filter to `State == 'NSW'` first."
    ], `${csvBase}/public_hospital_list.csv`, "Load `public_hospital_list.csv` and print two answers: (1) how many `Psychiatric` hospitals have `Remoteness area` equal to `'Major Cities'`, and (2) the total `Number of available beds` across all `NSW` hospitals.", "import pandas as pd\npath = '/data/public_hospital_list.csv'\n\n# Q1: combine the hospital type and location filters, then count rows.\n# Q2: filter to the requested state, then total the beds column.\n", ["18", "21146.8"], ["pandas"], ["Combine two masks with `&` for Q1.", "For Q2, filter `State == 'NSW'` then call `.sum()` on `Number of available beds`."], 0, 30),
    dataset("street-tree-mission", "Assignment: Street Trees", "Plot the location of every street tree in Manningham.", ["matplotlib", "scatter"], [
      "The dataset has `lat` and `lon` columns giving GPS coordinates for each tree.",
      "A scatter plot with `lon` on the x-axis and `lat` on the y-axis maps the tree locations spatially."
    ], `${csvBase}/manningham_street_trees.csv`, "Load `manningham_street_trees.csv`, print `len(df)`, then create a scatter plot with `lon` on the x-axis and `lat` on the y-axis. Call `plt.show()`.", "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/manningham_street_trees.csv'\n\n# Load the data, report its size, then plot longitude against latitude.\n", ["66904"], ["pandas", "matplotlib"], ["Use `df['lon']` for x and `df['lat']` for y in `plt.scatter()`.", "Call `plt.show()` after the plot."], 1, 30),
    dataset("vaccination-mission", "Assignment: Vaccination Data", "Find the NSW area with the lowest childhood vaccination rate.", ["Excel", "sorting"], [
      "The file is an Excel spreadsheet — use `pd.read_excel(path)` to load it.",
      "The column `% Fully` holds the percentage of children fully vaccinated.",
      "Sort by `% Fully` ascending and read the first row: `SA3_Name` is the area, `Age Group` is the age bracket."
    ], `${csvBase}/childhood_vaccination_data_nsw.xlsx`, "Load `childhood_vaccination_data_nsw.xlsx`, sort by `% Fully` ascending, select the lowest row, and print that row's `SA3_Name`, `Age Group`, and `% Fully` values.", "import pandas as pd\npath = '/data/childhood_vaccination_data_nsw.xlsx'\n\n# Load the spreadsheet.\n# Put the lowest vaccination rate first.\n# Print the requested fields from that row.\n", ["Richmond Valley - Coastal", "2 Year olds", "76.164"], ["pandas", "openpyxl"], ["Use `.sort_values('% Fully')` then `.iloc[0]` to access the lowest row.", "Print individual values with `row['SA3_Name']`, `row['Age Group']`, `row['% Fully']`."], 0, 30),
    dataset("weather-assignment", "Assignment: Climate Data", "Clean, summarise, and explore the full weather dataset.", ["read_csv", "groupby", "plot"], [
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
    read("jupyter-notebooks-vscode", "Jupyter Notebooks in VS Code", "Use notebooks when you want code, output, notes, and plots together in one interactive document.", ["Jupyter", "notebooks", "VS Code", "cells"], [
      "A Jupyter notebook is a `.ipynb` file made of cells. Code cells run Python, while Markdown cells hold notes, explanations, and headings.",
      "Notebooks are useful for exploration because each cell can be run separately and the output appears directly below the code.",
      "They are especially common in data analysis, where you often want to inspect tables, test small steps, and create plots as you work.",
      "VS Code can open and run notebooks. Install the Python and Jupyter extensions, then open a `.ipynb` file in your project.",
      "Choose the correct Python kernel at the top of the notebook. This should be the conda environment for your project.",
      "When your notebook workflow becomes repeatable, move the final version into a script so it can be rerun from top to bottom."
    ]),
    read("python-scripts", "Python Scripts", "Save repeatable Python work in a `.py` file and run it from the terminal.", ["scripts", ".py", "terminal", "VS Code"], [
      "A Python script is a plain text file ending in `.py`, such as `analysis.py` or `main.py`.",
      "Scripts run from top to bottom, which makes them useful when you want the same analysis or task to run the same way each time.",
      "In VS Code, create a new file, write your Python code, and save it with a `.py` ending inside your project folder.",
      "Open the VS Code terminal, activate the correct conda environment, then run the script with `python analysis.py`.",
      "Use `print()` while developing so you can inspect values and check that each step is working.",
      "If your notebook has become a reliable workflow, copy the final code cells into a script and clean them into a clear top-to-bottom order."
    ]),
    read("ai-use", "Using AI as a Beginner", "Use AI for explanation, not to skip understanding.", ["AI", "learning"], [
      "You need the skills to comprehend what the AI is saying to you.",
      "Sometimes you reach a problem the AI cannot solve. What then?",
      "It is OK to use AI when you need something explained so that you can do it yourself.",
      "For more guidance, read UCL ARC's [AI-assisted coding guidance](https://github-pages.arc.ucl.ac.uk/research-software-practices/tooling/ai-assisted-coding.html)."
    ]),
    workshop("leaving-the-website", "Working Outside this Website", "", ["VS Code", "conda", "Jupyter", "scripts"], [
      "When leaving the website, create a project folder, open it in VS Code or PyCharm, select the correct interpreter, and use the terminal for environment/package commands.",
      "Use conda environments to separate project dependencies. Use notebooks for exploratory work and scripts for repeatable work.",
      "Troubleshooting checks: make sure the correct conda environment is active, check `which python` and `which pip`, and read error messages carefully.",
      "For more information of installing anaconda see [here](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html)"
    ], 15),
    read("next-steps", "Next Steps", "", ["practice"], [
      "We have covered basic programming principles.",
      "Next step: practice. Mess around. Solve problems. Google things. Ask for help.",
      "Useful resources include [CS50](https://cs50.harvard.edu/python/), [UCL ARC courses](https://www.ucl.ac.uk/advanced-research-computing/education/training), [Software Carpentry](https://software-carpentry.org/), [research software engineering materials](https://github-pages.arc.ucl.ac.uk/research-software-practices/), and [Exercism](https://exercism.org/)."
    ]),
  ],
};

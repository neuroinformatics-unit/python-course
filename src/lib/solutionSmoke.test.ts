import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { courses } from "../data/curriculum";
import type { CodeExercise, DatasetChallenge } from "../data/types";
import { validateCodeSubmission } from "./exerciseValidation";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const publicData = path.join(repoRoot, "public", "data").replace(/\\/g, "/");

const solutions: Record<string, string> = {
  "calculator-print-exercise": "first_number = 12\nsecond_number = 8\nresult = first_number + second_number\nprint(result)\n",
  "operator-precedence-exercise": "first_number = 12\nsecond_number = 8\ntotal = (first_number + second_number) * 3\nprint(total)\n",
  "variables-exercise": "a = 5\nb = 6\nc = a + b\nprint(c)\n",
  "strings-and-casting-exercise": "value = '20'\nresult = int(value) - 2\nprint(result)\n",
  "type-inspection-exercise": "number_value = 100\nword_value = 'Dog'\nflag_value = False\nprint(type(number_value))\nprint(type(word_value))\nprint(type(flag_value))\n",
  "debug-with-print-exercise": "amount = '10'\nbonus = 1\ntotal = int(amount) + bonus\nprint(total)\n",
  "mutation-demo-exercise": "items = ['apple', 'banana']\nitems[0] = 'kiwi'\nprint(items)\n",
  "create-collections-exercise": "colours = ['red', 'green', 'blue']\nprofile = {'goal': 'data'}\nprint(colours)\nprint(profile)\n",
  "indexing-practice-exercise": "animals = ['dog', 'cat', 'llama']\ncourse = {'language': 'Python', 'level': 'intro'}\nprint(animals[1])\nprint(course['language'])\n",
  "negative-indexing-exercise": "animals = ['dog', 'cat', 'llama']\nnumbers = [10, 20, 30, 40]\nprint(animals[-1])\nprint(numbers[-2])\n",
  "slicing-exercise": "numbers = [1, 2, 3, 4, 5]\nprint(numbers[1:4])\n",
  "collection-conversion-exercise": "values = ['a', 'b', 'a', 'c', 'b']\nunique = set(values)\nprint(len(unique))\n",
  "cb-q2-deduplicate-exercise": "mixed = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]\nprint(sorted(set(mixed)))\n",
  "len-practice-exercise": "word = 'Python'\nanimals = ['dog', 'cat', 'llama']\nsettings = {'theme': 'light', 'level': 'intro'}\nprint(len(word))\nprint(len(animals))\nprint(len(settings))\n",
  "tuple-unpacking-exercise": "coords = (53.4, -1.8, 200)\nlat, lon, altitude = coords\nprint(lat)\nprint(lon)\nprint(altitude)\n",
  "dictionary-lists-exercise": "students = {'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84]}\nprint(students['name'][1])\nprint(students['score'][1])\n",
  "cb-q2-dict-max-exercise": "students = {'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84]}\nhighest = max(students['score'])\nindex = students['score'].index(highest)\nprint(students['name'][index])\nprint(highest)\n",
  "list-methods-exercise": "tools = ['terminal', 'Python']\ntools.append('notebook')\ntools.remove('terminal')\nprint(tools)\n",
  "dictionary-methods-exercise": "profile = {'language': 'Python', 'level': 'intro'}\nprint(profile.keys())\nprint(profile.items())\n",
  "basic-function-exercise": "def hello(name):\n    print('Hello ' + name)\n\nhello('Ada')\n",
  "cb-make-abba-exercise": "def make_abba(front, back):\n    return front + back + back + front\n\nprint([make_abba('Hi', 'Bye'), make_abba('x', 'y'), make_abba('ab', 'c')])\n",
  "arguments-defaults-exercise": "def repeat_text(text, repeats=2):\n    return text * repeats\n\nprint(repeat_text('ha'))\n",
  "cb-string-times-exercise": "def string_times(s, n):\n    return s * n\n\nprint([string_times('Hi', 2), string_times('Hi', 3), string_times('Code', 1)])\n",
  "return-values-exercise": "def sum_and_product(a, b):\n    return a + b, a * b\n\ns, p = sum_and_product(3, 4)\nprint(s)\nprint(p)\n",
  "cb-make-pi-exercise": "def make_pi():\n    return [3, 1, 4]\n\nprint(make_pi())\n",
  "cb-monkey-trouble-exercise": "def monkey_trouble(a_smile, b_smile):\n    return a_smile == b_smile\n\nprint([monkey_trouble(True, True), monkey_trouble(False, False), monkey_trouble(True, False)])\n",
  "scope-practice-exercise": "def add_bonus(score):\n    bonus = 5\n    return score + bonus\n\nfinal_score = add_bonus(80)\nprint(final_score)\n",
  "relu-exercise-exercise": "def relu(x):\n    if x > 0:\n        return x\n    return 0\n\nprint(relu(5))\nprint(relu(0))\nprint(relu(-3))\n",
  "cb-sum-double-exercise": "def sum_double(a, b):\n    total = a + b\n    if a == b:\n        return total * 2\n    return total\n\nprint([sum_double(1, 2), sum_double(3, 2), sum_double(2, 2)])\n",
  "cb-diff21-exercise": "def diff21(n):\n    result = abs(n - 21)\n    if n > 21:\n        return result * 2\n    return result\n\nprint([diff21(19), diff21(10), diff21(21), diff21(25)])\n",
  "compare-len-exercise-exercise": "def compare_len(a, b='default'):\n    if len(a) >= len(b):\n        return a\n    return b\n\nprint(compare_len('dog', b='lion'))\n",
  "cb-missing-char-exercise": "def missing_char(s, n):\n    return s[:n] + s[n + 1:]\n\nprint([missing_char('kitten', 1), missing_char('kitten', 0), missing_char('kitten', 4)])\n",
  "cb-first-two-exercise": "def first_two(s):\n    return s[:2]\n\nprint([first_two('Hello'), first_two('ab'), first_two('a')])\n",
  "cb-extra-end-exercise": "def extra_end(s):\n    return s[-2:] * 3\n\nprint([extra_end('Hello'), extra_end('ab'), extra_end('Hi')])\n",
  "cb-without-end-exercise": "def without_end(s):\n    return s[1:-1]\n\nprint([without_end('Hello'), without_end('ab'), without_end('Hi')])\n",
  "standard-libraries-exercise": "import statistics\nimport math\nvalues = [1, 2, 2, 3, 4]\nprint(statistics.mean(values))\nprint(math.sqrt(9409))\n",
  "glob-docs-exercise": "import glob\nprint(len(glob.glob('/data/*.csv')))\n",
  "comments-docstrings-exercise": "def double(value):\n    \"\"\"\n    Double a number.\n\n    Parameters\n    ----------\n    value : int or float\n        Number to double.\n\n    Returns\n    -------\n    int or float\n        Doubled value.\n    \"\"\"\n    return value * 2\n\nprint(double(7))\n",
  "cb-first-last6-exercise": "def first_last6(nums):\n    return nums[0] == 6 or nums[-1] == 6\n\nprint([first_last6([1, 2, 6]), first_last6([6, 1, 2, 3]), first_last6([1, 2, 3])])\n",
  "cb-same-first-last-exercise": "def same_first_last(nums):\n    return len(nums) >= 1 and nums[0] == nums[-1]\n\nprint([same_first_last([1, 2, 3]), same_first_last([1, 2, 3, 1]), same_first_last([1]), same_first_last([])])\n",
  "cb-common-end-exercise": "def common_end(a, b):\n    return a[0] == b[0] or a[-1] == b[-1]\n\nprint([common_end([1, 2, 3], [7, 3]), common_end([1, 2, 3], [7, 3, 2]), common_end([1, 2], [1, 3])])\n",
  "for-loops-exercise": "animals = ['dog', 'cat', 'llama']\nfor animal in animals:\n    print(animal)\n",
  "loop-accumulator-exercise": "numbers = [1, 2, 3, 4]\ntotal = 0\nfor number in numbers:\n    total = total + number\nprint(total)\n",
  "if-elif-else-exercise": "light = 'green'\nif light == 'green':\n    print('move')\nelif light == 'amber':\n    print('wait')\nelse:\n    print('stop')\n",
  "cb-sleep-in-exercise": "def sleep_in(weekday, vacation):\n    return not weekday or vacation\n\nprint([sleep_in(False, False), sleep_in(True, False), sleep_in(True, True)])\n",
  "cb-in1to10-exercise": "def in1to10(n, outside_mode):\n    if outside_mode:\n        return n <= 1 or n >= 10\n    return n >= 1 and n <= 10\n\nprint([in1to10(5, False), in1to10(11, False), in1to10(11, True), in1to10(5, True)])\n",
  "membership-exercise": "animals = ['dog', 'cat', 'llama']\nword = 'cat'\nprint('a' in word)\nprint('cat' in animals)\n",
  "range-and-enumerate-exercise": "names = ['Ada', 'Grace', 'Guido']\nfor index, name in enumerate(names):\n    print(index, name)\n",
  "travel-exercise-exercise": "savings = 2500\nif savings > 2000:\n    destination = 'Japan'\n    activity = 'Skiing'\nelse:\n    destination = 'Tasmania'\n    activity = 'Swimming'\nprint(destination)\nprint(activity)\n",
  "cb-date-fashion-exercise": "def date_fashion(you, date):\n    if you <= 2 or date <= 2:\n        return 0\n    elif you >= 8 or date >= 8:\n        return 2\n    return 1\n\nprint([date_fashion(5, 10), date_fashion(5, 2), date_fashion(5, 5)])\n",
  "cb-caught-speeding-exercise": "def caught_speeding(speed, is_birthday):\n    allowance = 5 if is_birthday else 0\n    if speed <= 60 + allowance:\n        return 0\n    elif speed <= 80 + allowance:\n        return 1\n    return 2\n\nprint([caught_speeding(60, False), caught_speeding(65, False), caught_speeding(85, True), caught_speeding(85, False)])\n",
  "power-operator-exercise": "print(2 ** 10)\nprint(3 ** 4)\n",
  "list-comprehensions-exercise": "squares = [x ** 2 for x in range(1, 11)]\nprint(squares)\n",
  "cb-alarm-clock-exercise": "def alarm_clock(day, vacation):\n    weekend = day == 0 or day == 6\n    if weekend and vacation:\n        return 'off'\n    if weekend or vacation:\n        return '10:00'\n    return '7:00'\n\nprint([alarm_clock(1, False), alarm_clock(5, True), alarm_clock(0, False), alarm_clock(6, True)])\n",
  "cb-cigar-party-exercise": "def cigar_party(cigars, is_weekend):\n    if is_weekend:\n        return cigars >= 40\n    return cigars >= 40 and cigars <= 60\n\nprint([cigar_party(30, False), cigar_party(50, False), cigar_party(70, True)])\n",
  "dict-comprehensions-exercise": "course_capacity = {'intro': 12, 'further': 10, 'packaging': 15}\ndoubled = {key: value * 2 for key, value in course_capacity.items()}\nprint(doubled)\n",
  "combined-control-assignment-exercise": "names = ['Ada', 'Guido', 'Grace', 'Linus']\nmatches = []\nfor name in names:\n    if 'a' in name or 'A' in name:\n        matches.append(name)\nprint(matches)\n",
  "cb-parrot-trouble-exercise": "def parrot_trouble(talking, hour):\n    return talking and (hour < 7 or hour > 20)\n\nprint([parrot_trouble(True, 6), parrot_trouble(True, 7), parrot_trouble(False, 6), parrot_trouble(True, 21)])\n",
  "cb-near-hundred-exercise": "def near_hundred(n):\n    return abs(n - 100) <= 10 or abs(n - 200) <= 10\n\nprint([near_hundred(93), near_hundred(90), near_hundred(89), near_hundred(190), near_hundred(210)])\n",
  "cb-love6-exercise": "def love6(a, b):\n    return a == 6 or b == 6 or a + b == 6 or abs(a - b) == 6\n\nprint([love6(6, 4), love6(4, 5), love6(1, 5), love6(1, 7)])\n",
  "numpy-max-argmax-exercise": "import numpy as np\nvalues = [3, 9, 2, 5]\nprint(np.max(values))\nprint(np.argmax(values))\n",
  "array-operations-exercise": "import numpy as np\narray = np.array([5, 10, 15, 20])\nscaled = array * 2 - 3\nprint(scaled)\n",
  "cb-np-sum-max-exercise": "import numpy as np\na = np.array([3, 1, 4, 1, 5, 9, 2, 6])\nprint(np.sum(a))\nprint(np.max(a))\n",
  "shape-and-indexing-exercise": "import numpy as np\ngrid = np.array([[1, 2, 3], [4, 5, 6]])\nprint(grid.shape)\nprint(grid[1, 2])\n",
  "array-range-indexing-exercise": "import numpy as np\ngrid = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])\nprint(grid[0, :])\nprint(grid[:, 1])\nprint(grid[1:, 2:])\n",
  "masks-exercise": "import numpy as np\ntemperatures = np.array([18, 22, 26, 31, 19])\nprint(temperatures[temperatures > 25])\n",
  "cb-np-mask-exercise": "import numpy as np\ntemps = np.array([36.6, 37.2, 38.1, 36.9, 37.8])\nprint(temps[temps > 37.0])\n",
  "dataframes-exercise": "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace'], 'score': [91, 76], 'group': ['A', 'B']})\nprint(df)\n",
  "column-selection-exercise": "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace'], 'score': [91, 76], 'group': ['A', 'B']})\nprint(df['name'])\nprint(df[['name', 'score']])\n",
  "cb-pd-column-exercise": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'score': [80, 90, 70]})\nprint(df['score'].mean())\n",
  "iloc-indexing-exercise": "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84], 'group': ['A', 'B', 'A']})\nprint(df.iloc[:2])\nprint(df.iloc[0, 1])\n",
  "dataframe-masking-exercise": "import pandas as pd\ndf = pd.DataFrame({'name': ['Ada', 'Grace', 'Guido'], 'score': [91, 76, 84]})\nprint(df[df['score'] >= 80])\n",
  "cb-pd-filter-exercise": "import pandas as pd\ndf = pd.DataFrame({'city': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], 'pop': [5.3, 5.0, 2.6, 2.2]})\nprint(df[df['pop'] > 3]['city'])\n",
  "dataframe-explore-exercise": "import pandas as pd\ndf = pd.DataFrame({'species': ['oak', 'oak', 'elm', 'pine', 'elm'], 'height': [12, 15, 8, 20, 9]})\nprint(df.head(2))\nprint(df['species'].unique())\nprint(df['species'].value_counts())\n",
  "read-clean-weather-challenge": "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\ndf = pd.read_csv(path)\nclean = df[df['Quality'] == 'Y']\nprint(len(clean))\n",
  "groupby-weather-challenge": "import pandas as pd\npath = '/data/parramatta_daily_maximum_temperature.csv'\ndf = pd.read_csv(path)\nclean = df[df['Quality'] == 'Y']\nyearly = clean.groupby('Year')['Maximum temperature (Degree C)'].mean()\nprint(yearly.tail(1))\n",
  "random-int-arrays-exercise": "import numpy as np\nx = np.random.randint(0, 100, 20)\ny = np.random.randint(0, 100, 20)\nprint(len(x))\n",
  "random-scatter-exercise": "import numpy as np\nimport matplotlib.pyplot as plt\nx = np.random.randint(0, 100, 20)\ny = np.random.randint(0, 100, 20)\nplt.scatter(x, y)\nplt.show()\nprint(len(x))\n",
  "plot-labels-exercise": "import matplotlib.pyplot as plt\nyears = [2020, 2021, 2022]\nvalues = [21.2, 22.1, 21.8]\nplt.plot(years, values)\nplt.xlabel('Year')\nplt.ylabel('Value')\nplt.title('Values by year')\nplt.show()\n",
  "weather-plot-challenge": "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/parramatta_daily_maximum_temperature.csv'\ndf = pd.read_csv(path)\nclean = df[df['Quality'] == 'Y']\nyearly = clean.groupby('Year')['Maximum temperature (Degree C)'].mean()\nprint(yearly.tail(1))\nyearly.plot()\nplt.show()\n",
  "methods-exercise": "animals = ['dog']\nword = 'python'\nanimals.append('cat')\nprint(animals)\nprint(word.upper())\n",
  "animal-class-exercise": "class Animal():\n    def __init__(self, species):\n        self.species = species\n\n    def greet(self):\n        print(\"Hello, I'm a \" + self.species)\n\npingu = Animal('penguin')\npingu.greet()\n",
  "objects-classes-exercise": "class Cell:\n    def __init__(self, GFP_level, RFP_level):\n        self.GFP_level = GFP_level\n        self.RFP_level = RFP_level\n\n    def relative_expression(self):\n        return self.GFP_level / self.RFP_level\n\ncell = Cell(300, 200)\nprint(cell.relative_expression())\n",
  "inheritance-exercise": "class Vehicle():\n    def __init__(self, registration, colour):\n        self.registration = registration\n        self.colour = colour\n\n    def rev_engine(self):\n        print('Vroom!')\n\nclass Bus(Vehicle):\n    def __init__(self, registration, colour, fare):\n        super().__init__(registration, colour)\n        self.fare = fare\n\nschool_bus = Bus('B1 BUS', 'yellow', '£1.55')\nprint(school_bus.fare)\nschool_bus.rev_engine()\n",
  "try-except-exercise": "def find_length(x):\n    try:\n        return len(x)\n    except TypeError:\n        return None\n\nprint(find_length('python'))\nprint(find_length(42))\n",
  "text-files-exercise": "with open('notes.txt', 'w') as f:\n    f.write('Python\\n')\n    f.write('is great\\n')\n\nwith open('notes.txt', 'r') as f:\n    print(f.read())\n",
  "student-assignment-exercise": "import numpy as np\nstudents = {'name': ['Ada', 'Grace', 'Guido'], 'attendance': [88, 92, 81], 'score': [91, 76, 84]}\n\ndef get_student(data, index):\n    return data['name'][index], data['attendance'][index], data['score'][index]\n\nbest = np.argmax(students['attendance'])\nprint(get_student(students, best))\n",
  "hospital-mission-challenge": "import pandas as pd\npath = '/data/public_hospital_list.csv'\ndf = pd.read_csv(path)\nmajor_psych = df[(df['Peer Group Name'] == 'Psychiatric') & (df['Remoteness area'] == 'Major Cities')]\nnsw = df[df['State'] == 'NSW']\nprint(len(major_psych))\nprint(nsw['Number of available beds'].sum())\n",
  "street-tree-mission-challenge": "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/manningham_street_trees.csv'\ndf = pd.read_csv(path)\nprint(len(df))\nplt.scatter(df['lon'], df['lat'])\nplt.show()\n",
  "vaccination-mission-challenge": "import pandas as pd\npath = '/data/childhood_vaccination_data_nsw.xlsx'\ndf = pd.read_excel(path)\nrow = df.sort_values('% Fully').iloc[0]\nprint(row['SA3_Name'])\nprint(row['Age Group'])\nprint(row['% Fully'])\n",
  "weather-assignment-challenge": "import pandas as pd\nimport matplotlib.pyplot as plt\npath = '/data/parramatta_daily_maximum_temperature.csv'\ndf = pd.read_csv(path)\nclean = df[df['Quality'] == 'Y']\nyearly = clean.groupby('Year')['Maximum temperature (Degree C)'].mean()\nmonthly = clean.groupby('Month')['Maximum temperature (Degree C)'].mean()\nprint(yearly.idxmax())\nprint(yearly.idxmin())\nprint(monthly.idxmax())\nprint(monthly.idxmin())\nyearly.plot()\nplt.show()\n",
};

describe("exercise solutions", () => {
  it("run and pass checkpoints for every puzzle, challenge, and assignment", () => {
    const items = courses.flatMap((course) =>
      course.lessons.flatMap((lesson) => [lesson.exercise, lesson.challenge].filter(Boolean)),
    ) as Array<CodeExercise | DatasetChallenge>;

    const missingSolutions = items.filter((item) => !solutions[item.id]).map((item) => item.id);
    expect(missingSolutions).toEqual([]);

    for (const item of items) {
      const code = solutions[item.id];
      const { output, plotCount } = runPythonSolution(code);
      const validation = validateCodeSubmission(item, code, output, plotCount);
      expect(validation, `${item.id}\n${output}`).toMatchObject({ passed: true });
    }
  }, 120_000);
});

function runPythonSolution(code: string): { output: string; plotCount: number } {
  const tempDir = mkdtempSync(path.join(tmpdir(), "python-course-solution-"));
  const scriptPath = path.join(tempDir, "solution.py");
  const runnableCode = code.replace(/\/data\//g, `${publicData}/`);
  writeFileSync(
    scriptPath,
    [
      "import matplotlib",
      "matplotlib.use('Agg')",
      "import matplotlib.pyplot as plt",
      "_plot_count = 0",
      "def _capture_show(*args, **kwargs):",
      "    global _plot_count",
      "    _plot_count += 1",
      "    plt.close('all')",
      "plt.show = _capture_show",
      runnableCode,
      "print(f'__PLOT_COUNT__:{_plot_count}')",
    ].join("\n"),
  );

  const rawOutput = execFileSync("python3", [scriptPath], {
    cwd: tempDir,
    encoding: "utf8",
    timeout: 30_000,
  });
  const marker = rawOutput.match(/__PLOT_COUNT__:(\d+)\s*$/);
  return {
    output: rawOutput.replace(/__PLOT_COUNT__:\d+\s*$/, ""),
    plotCount: marker ? Number(marker[1]) : 0,
  };
}

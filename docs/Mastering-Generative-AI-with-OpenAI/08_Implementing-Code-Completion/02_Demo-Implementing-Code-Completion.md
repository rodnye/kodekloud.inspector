# Demo Implementing Code Completion - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Implementing-Code-Completion/Demo-Implementing-Code-Completion)

---

## Table of Contents

- Demo Implementing Code Completion
  - Table of Contents
  - Setup
  - 1. HTML/JavaScript Code Generation
  - 2. Python Data-Science Script Creation
  - 4. SQL DDL & Query Generation
  - Resources & References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Implementing Code Completion

# Demo Implementing Code Completion

In this tutorial, we’ll explore how to leverage the OpenAI ChatCompletion API to auto-generate and refine code snippets for HTML/JavaScript, Python data analysis, code commenting, and SQL DDL tasks. By the end, you’ll know how to integrate AI-powered coding assistance directly into your development workflow.

## Table of Contents

- [Setup](#setup)
- [1\. HTML/JavaScript Code Generation](#1-htmljavascript-code-generation)
- [2\. Python Data-Science Script Creation](#2-python-data-science-script-creation)
- [3\. Auto-Commenting with Docstrings](#3-auto-commenting-with-docstrings)
- [4\. SQL DDL & Query Generation](#4-sql-ddl--query-generation)
- [Resources & References](#resources--references)

## Setup

First, install the OpenAI Python package if you haven't already:

```
pip install openai
```

Then import the modules and set your API key (either via `OPENAI_API_KEY` in your environment or by uncommenting the manual assignment).

```
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY"),[object Object],
```

Define helper functions to request completions and clean up the returned code:

````
def get_code_completion(prompt, language):
    """
    Send a prompt to the OpenAI ChatCompletion API and return the generated code snippet.
    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": f"You are a helpful {language} coding assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=3000,
        temperature=1,
        n=1
    )
    return response.choices[0].message.content

def cleanup_code(snippet, language):
    """
    Remove markdown code fences and language tags, then trim whitespace.
    """
    snippet = snippet.replace("```", "")
    snippet = snippet.replace(language, "")
    return snippet.strip()
````

| Section | Language        | Purpose                                    |
| ------- | --------------- | ------------------------------------------ |
| 1       | HTML/JavaScript | Generate dynamic webpage code              |
| 2       | Python          | Load, preview, and save a data-science CSV |
| 3       | Python          | Auto-add docstring comments                |
| 4       | SQL             | Create tables, insert rows, and query data |

## 1\. HTML/JavaScript Code Generation

Define a prompt to build a simple webpage with a button that cycles the background color through red, green, and blue. Request **only the code**:

```
prompt = """
You are a front-end developer. Generate HTML and JavaScript for a page
with a button that, when clicked, cycles the background through red, green, and blue.
Include only the code.
"""

raw = get_code_completion(prompt, "html")
html_code = cleanup_code(raw, "html")
print(html_code)
```

Example output:

```
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background-color: red; }
  </style>
</head>
<body>
  <button onclick="changeColor()">Change Color</button>
  <script>
    var colors = ["red", "green", "blue"];
    var currentColor = 0;
    function changeColor() {
      document.body.style.backgroundColor = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    }
  </script>
</body>
</html>
```

You can render this in a Jupyter notebook via IPython’s display utilities or save it as an `.html` file and open it in your browser.

## 2\. Python Data-Science Script Creation

Generate a Python script using Pandas to load the Iris dataset, preview its rows, and save it as a CSV file:

````
context = """
# Print the version of Pandas
import pandas as pd
print(pd.__version__)

# Load the Iris dataset from URL
url = 'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv'
df = pd.read_csv(url)

# Display first 5 rows
print(df.head())

# Display last 5 rows
print(df.tail())

# Save to iris.csv without the index
df.to_csv('iris.csv', index=False)
"""
prompt = f"""
You are a Python data science developer. Return only the code:
```{context}```
"""

raw = get_code_completion(prompt, "python")
python_code = cleanup_code(raw, "python")
print(python_code)
```text
,[object Object],

## 3. Auto-Commenting with Docstrings

Enhance an existing helper function by adding detailed docstring comments and explain its output:

```python
context = '''
def to_dictionary(keys, values):
    return dict(zip(keys, values))

keys = ["a", "b", "c"]
values = [2, 3, 4]
print(to_dictionary(keys, values))
'''
prompt = f"""
Regenerate this code with a proper docstring and explain its behavior:
```{context}```
"""

raw = get_code_completion(prompt, "python")
commented_code = cleanup_code(raw, "python")
print(commented_code)
````

Expected result:

```
def to_dictionary(keys, values):
    """
    Convert two lists into a dictionary.

    Parameters:
        keys (list): List of keys.
        values (list): List of values.

    Returns:
        dict: Mapping of keys to values.
    """
    return dict(zip(keys, values))

keys = ["a", "b", "c"]
values = [2, 3, 4]
print(to_dictionary(keys, values))
# Possible outcome: {'a': 2, 'b': 3, 'c': 4}
```

## 4\. SQL DDL & Query Generation

Generate SQL statements to create a table, insert CSV rows, and query customers from Chile:

````
context = '''
Index,Customer Id,First Name,Last Name,Company,City,Country,Phone 1,Phone 2,Email,Subscription Date,Website
1,D37CF93EacA6D0,Sheryl,Baxter,Rasmussen Group,East Leonard,Chile,229.077.5154,397.884.0519x718,zunigavanessa@smith.in,2020-08-24,http://www.stephenson.com/
2,1EF7b824ACAD10,Preston,Lozano,Vega-Gentry,East Jimmychester,Djibouti,5153435776,686-620-1820x944,vmata@colon.com,2021-04-23,http://www.hobbs.com/
3,6F94879bdAfE5a6,Roy,Berry,Murillo-Perry,Isabelborough,Antigua and Barbuda,+1-539-402-0259,(496)978-3969x58947,beckycarr@hogan.com,2020-03-25,http://www.lawrence.com/
4,5CFE8FAB1E56e3c,Linda,Olsen,"Dominguez, Mcmillan and Donovan",Bensonview,Dominican Republic,001-808-617-6467x12895,+1-813-324-8756,stanleyblackwell@benson.org,2020-06-02,http://www.good-lyons.com/
5,053d5B5Ab61359,Joanna,Bender,"Martin, Lang and Andrade",West Priscilla,Slovakia (Slovak Republic),001-234-203-0635x76146,001-199-4460-3860x3486,colinalvarado@miles.net,2021-04-17,https://goodwin-ingram.com/
6,2d08F817E2E73F4,Aimee,Downs,Steele Group,Chavezborough,Bosnia and Herzegovina,(283)437-3886x88321,999-728-1637,louis27@gilbert.com,2020-02-25,http://www.berger.net/
'''
prompt = f"""
Using the CSV data below, write SQL to:
1. Create a table `customers`.
2. Insert all rows.
3. Select customers where country = 'Chile'.
Also, show the expected query result.
```{context}```
"""

raw = get_code_completion(prompt, "sql")
sql_code = cleanup_code(raw, "sql")
print(sql_code)
```text

Sample output:

```sql
CREATE TABLE customers (
    id INT PRIMARY KEY,
    customer_id VARCHAR(50),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    company VARCHAR(100),
    city VARCHAR(50),
    country VARCHAR(50),
    phone_1 VARCHAR(30),
    phone_2 VARCHAR(30),
    email VARCHAR(100),
    subscription_date DATE,
    website VARCHAR(200)
);

INSERT INTO customers (id, customer_id, first_name, last_name, company, city, country, phone_1, phone_2, email, subscription_date, website) VALUES
  (1, 'D37CF93EacA6D0', 'Sheryl', 'Baxter', 'Rasmussen Group', 'East Leonard', 'Chile', '229.077.5154', '397.884.0519x718', 'zunigavanessa@smith.in', '2020-08-24', 'http://www.stephenson.com/'),
  -- (remaining rows omitted for brevity)
;

SELECT * FROM customers WHERE country = 'Chile';

-- Possible outcome:
-- 1 | D37CF93EacA6D0 | Sheryl | Baxter | Rasmussen Group | East Leonard | Chile | 229.077.5154 | 397.884.0519x718 | zunigavanessa@smith.in | 2020-08-24 | http://www.stephenson.com/
````

## Resources & References

- [OpenAI Python Library](https://pypi.org/project/openai/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/)
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [IPython Display Utilities](https://ipython.readthedocs.io/en/stable/api/generated/IPython.display.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/573b1c18-d6a4-4faa-b3c0-1aa306ea6d25/lesson/f51af4b8-7291-40ea-bc66-41050d44a86a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/573b1c18-d6a4-4faa-b3c0-1aa306ea6d25/lesson/6e2105ed-19af-4cad-bb9b-5e3b0db7a311)**
>
> Practice lab

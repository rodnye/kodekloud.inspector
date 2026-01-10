# Demo Automating with Agent Mode - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Understanding-and-Customizing-Cursor/Demo-Automating-with-Agent-Mode)

---

## Table of Contents

- Demo Automating with Agent Mode
  - Prerequisites
  - 1. Enable Autocompletion Mode
  - 2. Attach Data and Select Model
  - 3. Provide an Instruction List
  - 4. Set Up Your Local Environment
  - 5. Run the Data Processing Script
  - 6. Inspect Output Samples
  - 7. Run and Auto-Fix Tests
  - 8. Generate requirements.txt and README.md
  - Links and References
  - Watch Video
    - Configure Autocompletion Settings

---

## Content

Cursor AI

Understanding and Customizing Cursor

# Demo Automating with Agent Mode

In this walkthrough, we’ll explore how to use **Agent Mode** in Cursor AI to automate a full Python project—from reading customer data to generating tests and documentation—in minutes. You’ll learn how to:

- Enable and configure **Autocompletion** safely.
- Define an allowlist/denylist for automated commands.
- Generate code, tests, and docs with a single instruction set.
- Run and verify the output locally using a Python virtual environment.

## Prerequisites

- Cursor AI with **Agent Mode** enabled
- Python 3.8 or higher installed
- A CSV file named `customers.csv` containing customer data

## 1\. Enable Autocompletion Mode

First, open **Cursor Settings** and turn on **Autocompletion mode**. Read the disclaimer carefully before proceeding.

> [!important]
> **Warning**
>
> Enabling Autocompletion mode may increase the risk of prompt injection. Only proceed if you trust the source of your prompts.

![The image shows a software interface with a dark theme, displaying a "Cursor Settings" menu with various options related to auto-run mode, command allowlist/denylist, and file protection. A file named "customers.csv" is open in the sidebar.](https://kodekloud.com/kk-media/image/upload/v1752872787/notes-assets/images/Cursor-AI-Demo-Automating-with-Agent-Mode/cursor-settings-dark-theme-interface.jpg)

### Configure Autocompletion Settings

| Setting           | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| Auto Run Prompt   | Natural-language instructions the agent will execute automatically.       |
| Command Allowlist | List commands the agent is permitted to run (e.g., `pip install pytest`). |
| Command Denylist  | Block undesired commands (e.g., `rm -rf /`).                              |
| File Protection   | Prevent deletion or modification of critical files.                       |
| MCP Tools         | Disable resource-intensive operations to control cloud costs.             |

Save these settings and switch to **Agent** mode.

## 2\. Attach Data and Select Model

1.  Upload `customers.csv` (large CSV with customer records).
2.  Choose whether to include the full context or let the agent use intelligent compression.
3.  Select your model (e.g., `gpt-4o-cloud`).

## 3\. Provide an Instruction List

Ask the agent to perform these steps:

1.  Create `process_customers.py` to read `customers.csv`.
2.  Extract first and last names → write to `namevalues.csv`.
3.  Extract phone numbers → write to `phone.txt`.
4.  Install `pytest`.
5.  Generate a `pytest` test suite validating the script.

Click **Generate**. The agent will:

- Read the first 200 lines of `customers.csv`.
- Produce `process_customers.py` with data-processing logic.
- Create unit tests in `test_process_customers.py`.
- Display all proposed code changes for your approval.

Once you **Accept**, the files appear in your workspace.

## 4\. Set Up Your Local Environment

Open a terminal and create a Python virtual environment:

```
# Create and activate venv
python -m venv venv
source venv/bin/activate


# Install pytest
pip install pytest
```

## 5\. Run the Data Processing Script

Execute the generated script:

```
python process_customers.py
```

> [!important]
> **Note**
>
> The script writes output files `namevalues.csv` and `phone.txt` without printing to the console. Verify with:
>
> ```
> head -n 5 namevalues.csv
> head -n 5 phone.txt
> ```

## 6\. Inspect Output Samples

```
# namevalues.csv
first_name,last_name
Joye,Lonnon
Charyl,Wanka
Merrel,Palumbo
Dannel,Tarplee


# phone.txt
619-459-1773
916-472-7327
215-772-7423
723-375-1649
217-778-2922
```

## 7\. Run and Auto-Fix Tests

```
pytest test_process_customers.py -v
```

If any tests fail, Agent Mode will update the tests and re-run them automatically until they pass.

## 8\. Generate `requirements.txt` and `README.md`

Ask the agent to scaffold these files:

**requirements.txt**

```
pytest>=8.0
```

**README.md**

````
## Setup


1. Clone the repository.
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```text
3. Activate:
   - macOS/Linux: `source venv/bin/activate`
   - Windows: `venv\Scripts\activate`
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```text


## Usage


```bash
python process_customers.py
```text
Reads `customers.csv`, writes names to `namevalues.csv` and phones to `phone.txt`.


## Testing


```bash
pytest -v
```text
````

---

```
import csv


def process_customer_data(input_file, name_output_file, phone_output_file):
    """
    Process customer data from a CSV file and extract names and phone numbers.


    Args:
        input_file (str): Path to the input CSV file.
        name_output_file (str): Path to the output CSV file for names.
        phone_output_file (str): Path to the output TXT file for phone numbers.
    """
    with open(input_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        names, phones = [], []
        for row in reader:
            first = row.get('first_name', '').strip()
            last = row.get('last_name', '').strip()
            phone = row.get('phone_number', '').strip()
            if first or last:
                names.append((first, last))
            if phone:
                phones.append(phone)


    with open(name_output_file, 'w', newline='') as namefile:
        writer = csv.writer(namefile)
        writer.writerow(['first_name', 'last_name'])
        writer.writerows(names)


    with open(phone_output_file, 'w') as phonefile:
        for phone in phones:
            phonefile.write(phone + '\n')


if __name__ == '__main__':
    process_customer_data('customers.csv', 'namevalues.csv', 'phone.txt')
```

---

## Links and References

- [Python venv documentation](https://docs.python.org/3/library/venv.html)
- [pytest documentation](https://docs.pytest.org/en/stable/)
- [Python csv module](https://docs.python.org/3/library/csv.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/fcc10c1c-5240-4626-9bfc-bf172a3a00c6/lesson/4c460141-9452-4eed-a5fb-fe6882f49918)**
>
> Watch video content

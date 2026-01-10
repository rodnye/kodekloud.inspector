# A Quick Look GitHub Copilot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Introduction-to-AI-Assisted-Development/A-Quick-Look-GitHub-Copilot)

---

## Table of Contents

- A Quick Look GitHub Copilot
  - Getting Started
  - Creating a Python Virtual Environment and Application File
  - Building the CSV Reader Application
  - Reading the CSV File
  - Processing CSV Data
  - Debugging and Enhancing with Copilot
  - Generating Unit Tests
  - Conclusion
  - Watch Video
    - Creating a Sample CSV File

---

## Content

AI-Assisted Development

Introduction to AI Assisted Development

# A Quick Look GitHub Copilot

In this article, we explore GitHub Copilot—a powerful extension for Visual Studio Code—that assists you in developing a small CSV Reader application using Python. We cover setting up your project environment, scaffolding the application, reading and processing a CSV file, and even generating unit tests. GitHub Copilot helps both beginners and seasoned developers write less repetitive code and focus on solving problems.

---

## Getting Started

GitHub Copilot provides intelligent code suggestions and generates boilerplate code to speed up development. To begin, install the GitHub Copilot extension in Visual Studio Code. Once installed, you will notice a "ready" status in the lower right-hand corner along with an integrated chat interface for code assistance.

For example, if you ask, "How do I create a new Python app?" Copilot might suggest these steps:

```
mkdir my_python_app
cd my_python_app
python3 -m venv venv
source venv/bin/activate
# app.py
def main():
    print("Hello, World!")


if __name__ == "__main__":
    main()
pip install requests
python app.py
```

You can activate Copilot’s inline help by pressing Command+I (or Control+I on Windows/Linux) and entering your prompt. Experimenting in the terminal is highly encouraged!

---

## Creating a Python Virtual Environment and Application File

Open your terminal in Visual Studio Code and create your project directory with a dedicated virtual environment:

```
mkdir my_python_app
cd my_python_app
python3 -m venv venv
source venv/bin/activate
```

Next, create your main Python file:

```
touch main.py
```

As you start writing code in `main.py`, GitHub Copilot will offer contextual suggestions and help scaffold the basic structure of your application.

---

## Building the CSV Reader Application

GitHub Copilot might initially scaffold a simple Python application that prints a greeting. For example:

```
import argparse


def main():
    parser = argparse.ArgumentParser(description="Your application description")
    # Add your arguments here
    args = parser.parse_args()


    # TODO: Implement your application logic
    print("Hello, World!")


if __name__ == "__main__":
    main()
```

After confirming that the base application works (by running `python main.py`), you can extend it to read a CSV file.

### Creating a Sample CSV File

Create a CSV file named `data.csv` with the following sample data:

```
first_name,last_name,ip_address,city,state
John,Doe,192.168.1.1,New York,NY
Jane,Smith,192.168.1.2,Los Angeles,CA
Bob,Johnson,192.168.1.3,Chicago,IL
Alice,Williams,192.168.1.4,Houston,TX
Michael,Brown,192.168.1.5,Phoenix,AZ
```

---

## Reading the CSV File

Enhance your Python application by adding a function to read the CSV file. The following example, suggested by GitHub Copilot, demonstrates how to do this:

```
import argparse


# Function to open a CSV file and read the data
def read_csv(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()
    return data


def main():
    parser = argparse.ArgumentParser(description="Your application description")
    # Add an argument for the CSV file path
    parser.add_argument('csv_file', type=str, help='Path to the CSV file')
    args = parser.parse_args()
    # Read the CSV file argument
    csv_file = args.csv_file
    print(csv_file)

    # Read and print the CSV file content
    data = read_csv(csv_file)
    for line in data:
        print(line.strip())


if __name__ == "__main__":
    main()
```

Execute the application using the command below:

```
python main.py data.csv
```

This command displays the contents of the CSV file in your terminal.

---

## Processing CSV Data

To improve the output, the application can be modified to display only the first and last names from each record (excluding the header). Update your code as follows:

```
import argparse


# Function to open a CSV file and read the data
def read_csv(file_path):
    with open(file_path, 'r') as file:
        data = file.readlines()
    return data


def main():
    parser = argparse.ArgumentParser(description="Your application description")
    parser.add_argument('csv_file', type=str, help='Path to the CSV file')
    args = parser.parse_args()
    csv_file = args.csv_file
    print(csv_file)


    # Read and print the CSV file content
    data = read_csv(csv_file)
    # Skip the header row and print first and last names
    for line in data[1:]:
        fields = line.strip().split(',')
        print(f"{fields[0]} {fields[1]}")


if __name__ == "__main__":
    main()
```

When you run the code, your terminal output should display:

```
(venv) $ python main.py data.csv
data.csv
John Doe
Jane Smith
Bob Johnson
Alice Williams
Michael Brown
```

---

## Debugging and Enhancing with Copilot

> [!important]
> **Note**
>
> If you encounter errors such as an undefined attribute (e.g., "AttributeError: 'Namespace' object has no attribute 'csv_file'"), GitHub Copilot can help diagnose and fix these issues by suggesting the correct argument definitions.

Simply add the missing argument definition, and Copilot will adjust the code accordingly.

---

## Generating Unit Tests

GitHub Copilot can also assist by generating unit tests for your code. The following is an example test file (`test_main.py`) for the `read_csv` function:

```
import os
import unittest
from main import read_csv


class TestReadCSV(unittest.TestCase):
    def setUp(self):
        # Create a temporary CSV file
        self.test_csv_file = 'test.csv'
        with open(self.test_csv_file, 'w') as file:
            file.write('header1,header2\n')
            file.write('row1col1,row1col2\n')
            file.write('row2col1,row2col2\n')


    def tearDown(self):
        # Remove the temporary CSV file
        os.remove(self.test_csv_file)


    def test_read_csv(self):
        """
        Test that the read_csv function correctly reads the CSV file.
        """
        expected_data = [
            'header1,header2\n',
            'row1col1,row1col2\n',
            'row2col1,row2col2\n'
        ]
        actual_data = read_csv(self.test_csv_file)
        self.assertEqual(actual_data, expected_data)


if __name__ == '__main__':
    unittest.main()
```

To run the tests, execute:

```
python -m pytest
```

A successful test run will confirm that all tests have passed.

---

## Conclusion

In this article, we demonstrated how GitHub Copilot can streamline your development process by helping you:

• Scaffold a new Python application  
• Set up and work within a virtual environment  
• Read and process CSV file data effectively  
• Troubleshoot errors with contextual code suggestions  
• Generate boilerplate unit tests automatically

GitHub Copilot enhances productivity for both beginners and experienced developers by saving time on repetitive code tasks. Next, explore Cursor—a fork of Visual Studio Code offering a uniquely enhanced IDE experience.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/d64636e3-1af6-4ab7-934f-5676c4266ac7/lesson/f64f3ba7-b610-4e98-b0e2-9a9315bd9017)**
>
> Watch video content

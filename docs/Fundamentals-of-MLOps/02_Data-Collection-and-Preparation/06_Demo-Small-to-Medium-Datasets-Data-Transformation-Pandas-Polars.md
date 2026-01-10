# Demo Small to Medium Datasets Data Transformation Pandas Polars - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Data-Collection-and-Preparation/Demo-Small-to-Medium-Datasets-Data-Transformation-Pandas-Polars)

---

## Table of Contents

- Demo Small to Medium Datasets Data Transformation Pandas Polars
  - 1. Data Exploration and Quality Checks
  - 2. Data Cleaning
  - 3. Transforming Complex JSON Data from the "profile" Column
  - 4. Further Data Transformations
  - 5. Conclusion
  - Watch Video
  - Practice Lab
    - Loading the Data
    - Inspecting Data Types and Missing Values
    - Analyzing Categorical Data
    - Handling Missing Numeric Values
    - Handling Categorical Data
    - Converting JSON Strings
    - Extracting Information from JSON
    - Adding Derived Columns
    - Grouping and Aggregation

---

## Content

Fundamentals of MLOps

Data Collection and Preparation

# Demo Small to Medium Datasets Data Transformation Pandas Polars

Welcome to this hands-on tutorial demonstrating data transformation with Pandas. In this guide, you'll learn how to import a mock CSV dataset, perform data quality checks, handle missing values, and transform complex JSON data—all to prepare your dataset for downstream machine learning (ML) tasks.

---

## 1\. Data Exploration and Quality Checks

Begin by launching your Jupyter Notebook and loading the mock CSV file into a DataFrame. This CSV dataset is destined for your ML model, but first, its quality must be verified.

> [!important]
> **Quick Tip**
>
> Before diving into transformations, always inspect your data using basic functions such as `head()`, `info()`, and `describe()`.

### Loading the Data

Start by importing Pandas and reading the CSV:

```
import pandas as pd


# Load the CSV file into a DataFrame
df = pd.read_csv("mock_data.csv")


# Display the first few rows
df.head()
```

### Inspecting Data Types and Missing Values

Check the DataFrame summary to inspect data types and count non-null entries:

```
# Display DataFrame summary and missing value counts
df.info()
df.isnull().sum()
```

Notice that columns like "hire date," "profile," and "department" might have null values, while numeric columns such as 'salary' are stored as float64.

For a statistical summary (which includes non-numeric columns), run:

```
df.describe(include='all')
```

![The image shows a Jupyter Notebook interface displaying Python code and output, including a summary of missing values and a statistical summary of a dataset's numeric columns using Pandas.](https://kodekloud.com/kk-media/image/upload/v1752875035/notes-assets/images/Fundamentals-of-MLOps-Demo-Small-to-Medium-Datasets-Data-Transformation-Pandas-Polars/jupyter-notebook-python-pandas-summary.jpg)

### Analyzing Categorical Data

To better understand categorical properties, inspect the unique values in the 'department' column:

```
df['department'].unique()
```

The output may look like:

```
array(['Marketing', 'HR', nan, 'IT', 'Finance'], dtype=object)
```

Notice the `NaN` value, which indicates missing data that could affect grouping and analysis later.

---

## 2\. Data Cleaning

Cleaning your dataset is a vital step before modeling. You'll address missing numeric values and categorical inconsistencies.

### Handling Missing Numeric Values

Identify rows with missing numeric values such as 'age' or 'salary':

```
# Identify and display records with missing age and salary
print("Records with missing age:")
print(df[df['age'].isnull()][['age', 'salary', 'department']])
print("\nRecords with missing salary:")
print(df[df['salary'].isnull()][['age', 'salary', 'department']])
```

A common strategy is to fill missing values with the median value:

```
# Calculate median values for age and salary
age_median = df['age'].median()
salary_median = df['salary'].median()


print("\nMedian values used:")
print(f"Age median: {age_median}")
print(f"Salary median: {salary_median}")


# Fill missing numeric values with the median
df['age'] = df['age'].fillna(age_median)
df['salary'] = df['salary'].fillna(salary_median)
```

Confirm the imputation:

```
print("\nMissing values after numeric cleaning:")
print(df.isnull().sum())
```

### Handling Categorical Data

For categorical columns such as 'department', replace missing values with a default placeholder:

```
df['department'] = df['department'].fillna('Unknown')
print("\nMissing values after handling department:")
print(df.isnull().sum())
```

To get a quick overview of your cleaned DataFrame:

```
print("Cleaned DataFrame overview:")
print(df.head(), "\n")
print("Missing values in each column:")
print(df.isnull().sum(), "\n")
```

---

## 3\. Transforming Complex JSON Data from the "profile" Column

The "profile" column contains JSON strings with structured details like address, phone number, and email. Transform these into Python dictionaries and extract the individual fields as separate columns.

### Converting JSON Strings

First, import the JSON module:

```
import json
```

Then, convert the JSON strings in the "profile" column:

```
df['profile'] = df['profile'].apply(lambda x: json.loads(x) if pd.notnull(x) else {})
```

### Extracting Information from JSON

Extract specific fields from the JSON data:

```
df['address'] = df['profile'].apply(lambda x: x.get('address', None))
df['phone']   = df['profile'].apply(lambda x: x.get('phone', None))
df['email']   = df['profile'].apply(lambda x: x.get('email', None))
```

Review the newly created columns:

```
print("\nSample extracted data:")
print(df[['address', 'phone', 'email']].head())
```

If the original "profile" column is no longer needed, drop it:

```
df.drop(columns=['profile'], inplace=True)


# Save the cleaned data to CSV for further processing
df.to_csv("cleaned_data.csv", index=False)
print("\nCleaned data saved to 'cleaned_data.csv'")
```

![The image shows a spreadsheet titled "mock_data.csv" with columns for ID, name, age, salary, hire date, department, bonus, address, phone, and email. It contains various entries with corresponding data.](https://kodekloud.com/kk-media/image/upload/v1752875036/notes-assets/images/Fundamentals-of-MLOps-Demo-Small-to-Medium-Datasets-Data-Transformation-Pandas-Polars/mock-data-spreadsheet-columns.jpg)

---

## 4\. Further Data Transformations

With your cleaned data saved, you can perform additional transformations by reloading the dataset.

### Adding Derived Columns

For instance, you can create a new column "address_length" to verify that addresses meet a certain length requirement:

```
df = pd.read_csv("cleaned_data.csv")


# Calculate the length of each address
df['address_length'] = df['address'].apply(lambda x: len(str(x)))
print("Sample data after adding 'address_length':")
print(df[['address', 'address_length']].head(), "\n")
```

Next, categorize salaries into buckets such as low, medium, and high:

```
# Define salary bins and labels
bins = [0, 50000, 70000, 100000]
labels = ['low', 'medium', 'high']


# Create a new column for salary categorization
df['salary_category'] = pd.cut(df['salary'], bins=bins, labels=labels, include_lowest=True)
print("Sample data after adding 'salary_category':")
print(df[['salary', 'salary_category']].head(), "\n")
```

### Grouping and Aggregation

Aggregate key metrics by grouping data by the 'department' column:

```
# Group data by department and compute mean salary and age
summary_report = df.groupby('department').agg({
    'salary': 'mean',
    'age': 'mean'
}).reset_index()


# Rename columns for clarity
summary_report.rename(columns={'salary': 'average_salary', 'age': 'average_age'}, inplace=True)
print("Summary report by department:")
print(summary_report)
```

> [!important]
> **Data Insight**
>
> Grouping and aggregation help in identifying trends and outliers within each department, which is critical for further ML model tuning.

---

## 5\. Conclusion

In this tutorial, we covered the following steps to transform raw data into actionable insights for machine learning pipelines:

- Explored the dataset using Pandas functions such as `head()`, `info()`, `isnull()`, and `describe()`.
- Cleaned missing numeric values by imputing medians and handled missing categorical data with placeholders.
- Transformed a complex JSON column into separate, meaningful columns.
- Derived new columns, including address length and salary categories, to provide additional insights.
- Grouped and aggregated data by department to summarize key metrics.

These transformation practices are crucial when preparing your data for scalable ML models, especially in real-world scenarios with large datasets.

Thank you for following this guide. For more information on data transformation and ML pipeline best practices, explore additional resources such as [Pandas Documentation](https://pandas.pydata.org/docs/) and [Kaggle Learn](https://www.kaggle.com/learn).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/87ca9a04-612c-4647-a43d-99e6efff84cf)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/d72a3430-8b54-48d6-89ad-6a5f8b74f4ab/lesson/7a6fb098-18b6-4237-a449-8a606d42fe3e)**
>
> Practice lab

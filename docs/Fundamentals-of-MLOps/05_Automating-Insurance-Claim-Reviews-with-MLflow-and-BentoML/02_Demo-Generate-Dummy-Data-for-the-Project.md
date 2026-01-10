# Demo Generate Dummy Data for the Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Automating-Insurance-Claim-Reviews-with-MLflow-and-BentoML/Demo-Generate-Dummy-Data-for-the-Project)

---

## Table of Contents

- Demo Generate Dummy Data for the Project
  - Step 1: Installing Required Packages
  - Step 2: Generating Synthetic Health Claims Data
  - Step 3: Preparing Data for Model Experiment
  - Watch Video
    - How the Script Works
    - Code Implementation
    - Code Implementation for Model Experiment

---

## Content

Fundamentals of MLOps

Automating Insurance Claim Reviews with MLflow and BentoML

# Demo Generate Dummy Data for the Project

Welcome to this guide on how to generate a synthetic healthcare claims dataset for your project. In this tutorial, you'll learn how to set up your development environment, create realistic synthetic data with anomalies, and export it to a CSV file for further analysis or model training.

---

## Step 1: Installing Required Packages

Begin by creating a new file named `requirements.txt` in your VS Code editor. Add the following package list to the file:

```
mlflow
pandas
numpy
bentoml
```

Save the file and open your terminal. Then run the command below to install all required packages:

```
$ pip3 install -r requirements.txt
Collecting mlflow (from -r requirements.txt (line 1))
  Downloading mlflow-2.18.0-py3-none-any.whl.metadata (29 kB)
Requirement already satisfied: pandas in /home/codespace/.local/lib/python3.12/site-packages (from -r requirements.txt (line 2)) (2.2.3)
Requirement already satisfied: numpy in /home/codespace/.local/lib/python3.12/site-packages (from -r requirements.txt (line 3)) (2.1.1)
Collecting bentoml (from -r requirements.txt (line 4))
  Downloading bentoml-1.3.15-py3-none-any.whl.metadata (16 kB)
Collecting mlflow-skinny==2.18.0 (from mlflow->-r requirements.txt (line 1))
  Downloading mlflow_skinny-2.18.0-py3-none-any.whl.metadata (10 kB)
Downloading mlflow_skinny-2.18.0-py3-none-any.whl (30 kB)
```

The command above installs all dependencies mentioned in your `requirements.txt` file. Once the installation is complete, you are ready to move on to generating synthetic data.

---

## Step 2: Generating Synthetic Health Claims Data

Create a new Python file named `synthetic_health_claims.py`. This script generates a synthetic dataset with both normal claims and anomalous claims to simulate outlier events.

### How the Script Works

- Imports necessary libraries and sets a random seed for reproducibility.
- Generates 1,000 normal claim records with fields such as `claim_id`, `claim_amount`, `num_services`, `patient_age`, `provider_id`, and `days_since_last_claim`.
- Introduces 50 anomalous entries with significantly higher claim amounts and additional service counts.
- Combines, shuffles, and exports the dataset to a CSV file.

### Code Implementation

```
import pandas as pd
import numpy as np


# Set random seed for reproducibility
np.random.seed(42)


# Generate synthetic normal claim data
num_samples = 1000
data = {
    'claim_id': np.arange(1, num_samples + 1),
    'claim_amount': np.random.normal(1000, 250, num_samples),
    'num_services': np.random.randint(1, 10, num_samples),
    'patient_age': np.random.randint(18, 90, num_samples),
    'provider_id': np.random.randint(1, 50, num_samples),
    'days_since_last_claim': np.random.randint(0, 365, num_samples),
}


# Convert normal data to DataFrame
df = pd.DataFrame(data)


# Introduce anomalies (e.g., very high claim amounts)
num_anomalies = 50
anomalies = {
    'claim_id': np.arange(num_samples + 1, num_samples + num_anomalies + 1),
    'claim_amount': np.random.normal(10000, 2500, num_anomalies),  # Much higher amounts
    'num_services': np.random.randint(10, 20, num_anomalies),
    'patient_age': np.random.randint(18, 90, num_anomalies),
    'provider_id': np.random.randint(1, 50, num_anomalies),
    'days_since_last_claim': np.random.randint(0, 365, num_anomalies),
}


# Convert anomalies to DataFrame
df_anomalies = pd.DataFrame(anomalies)


# Combine and shuffle the dataset
df = pd.concat([df, df_anomalies]).reset_index(drop=True)
df = df.sample(frac=1).reset_index(drop=True)


# Save the dataset to CSV
df.to_csv('synthetic_health_claims.csv', index=False)
print("Synthetic data generated and saved to 'synthetic_health_claims.csv'.")
```

To run the script, execute the following command in your terminal:

```
$ python3 synthetic_health_claims.py
Synthetic data generated and saved to 'synthetic_health_claims.csv'.
```

> [!important]
> **Note**
>
> This script creates a balanced dataset containing both normal and anomalous data points, ideal for training and testing anomaly detection models.

---

## Step 3: Preparing Data for Model Experiment

After generating the initial synthetic dataset, you might want to simulate a different testing scenario by modifying the dataset. In this step, we introduce a smaller set of anomalies (5 records) and omit the `num_services` field to tailor the dataset for a specific model experiment.

### Code Implementation for Model Experiment

```
import pandas as pd
import numpy as np


# Assumption: The normal data (df) and the variable num_samples (e.g., num_samples = 1000)
# Introduce a smaller set of anomalies for the experiment
num_anomalies = 5
anomalies = {
    'claim_id': np.arange(num_samples + 1, num_samples + num_anomalies + 1),
    'claim_amount': np.random.normal(10000, 2500, num_anomalies),  # Significantly higher amounts
    'patient_age': np.random.randint(10, 20, num_anomalies),
    'provider_id': np.random.randint(1, 50, num_anomalies),
    'days_since_last_claim': np.random.randint(0, 365, num_anomalies)
}


# Convert new anomalies to a DataFrame
df_anomalies = pd.DataFrame(anomalies)


# Combine with the existing data
df = pd.concat([df, df_anomalies]).reset_index(drop=True)


# Save the updated dataset to CSV
df.to_csv('synthetic_health_claims.csv', index=False)
print("Synthetic data for the experiment generated and saved to 'synthetic_health_claims.csv'.")
```

Run the updated script with the command below:

```
$ python3 synthetic_health_claims.py
Synthetic data for the experiment generated and saved to 'synthetic_health_claims.csv'.
```

> [!important]
> **Note**
>
> The modified dataset now includes an updated anomaly configuration, which is useful for various experimental setups in model validation.

---

In this guide, we demonstrated how to create a comprehensive synthetic dataset with both normal and anomalous healthcare claims. The resulting CSV file, `synthetic_health_claims.csv`, can now be used in your data analysis or machine learning projects. For more insights on data preparation and anomaly detection, explore our related articles and documentation.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/e6813732-5ba7-496f-84db-2272a4c2b188/lesson/a7c02846-a52c-46ed-b9c5-ab142d3f0a65)**
>
> Watch video content

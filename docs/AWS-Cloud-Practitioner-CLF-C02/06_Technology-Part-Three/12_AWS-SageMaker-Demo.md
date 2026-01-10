# AWS SageMaker Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/AWS-SageMaker-Demo)

---

## Table of Contents

- AWS SageMaker Demo
  - Navigating SageMaker Studio and Opening a Notebook
  - Setting Up the Environment
  - Importing Libraries and Configuring S3
  - Uploading Sample Data and Loading It into the Feature Store
  - Running Autopilot for Tabular Data Problems
  - Querying the Feature Store
  - Conclusion
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# AWS SageMaker Demo

Welcome to this comprehensive lesson on AWS SageMaker. In this demo, you will explore how to build, train, and deploy machine learning models using SageMaker’s robust suite of tools. This article highlights key SageMaker subservices and walks you through the process of setting up and executing common machine learning tasks.

SageMaker includes several powerful features such as:

- **Edge Manager**
- **Augmented AI** (for human evaluation of data)
- **Inference** (for model predictions and testing)
- **Training and Data Processing**
- **Notebooks** (with integrated Jupyter notebooks and Git repository support)
- **Ground Truth** (for dataset labeling)
- Additional governance options and quick-start jumpstarts

![The image shows the Amazon SageMaker interface, highlighting features for building, training, and deploying machine learning models, with navigation options and setup guides.](https://kodekloud.com/kk-media/image/upload/v1752862049/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_20.jpg)

For this lesson, we focus on SageMaker Studio—an integrated development environment (IDE) designed to streamline access to all SageMaker functionalities. The demonstration environment has been pre-configured, and the necessary workshop materials are already downloaded.

![The image shows the Amazon SageMaker Studio interface, an integrated development environment for machine learning, with sections on features, pricing, and documentation.](https://kodekloud.com/kk-media/image/upload/v1752862051/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_80.jpg)

## Navigating SageMaker Studio and Opening a Notebook

Start by navigating to the folder named "built-in algorithm HPO tabular" and double-click on the first notebook titled "autopilot and XGBoost." This notebook contains step-by-step instructions and code cells for configuring your environment. You will be prompted to select the "medium" instance type when initializing the notebook kernel, which then launches an instance in the background.

To execute a code cell in the notebook, simply click the play button or use the shortcut Shift+Enter. This interactive approach is ideal for data scientists and ML engineers as it facilitates immediate feedback and iterative development.

![The image shows an Amazon SageMaker Studio interface, setting up a notebook environment with options for image, kernel, instance type, and startup script.](https://kodekloud.com/kk-media/image/upload/v1752862052/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_120.jpg)

## Setting Up the Environment

The notebook begins by importing essential libraries, configuring an S3 bucket, defining the IAM role, and establishing a connection to SageMaker services using the SageMaker SDK. Below is the initial setup code:

```
# Load the autoreload extension
%load_ext autoreload
%autoreload 2


# Python Built-Ins:
import json
import time


# External Dependencies:
import boto3  # AWS SDK for Python
import numpy as np  # For numerical and matrix operations
import pandas as pd  # Utilities for tabular data
import sagemaker  # High-level SDK for Amazon SageMaker
from sagemaker.automl.automl import AutoMLEstimator
from sagemaker.feature_store.feature_group import FeatureGroup


# Local Helper Functions:
import util


# Setting up SageMaker parameters
sgmk_session = sagemaker.Session()  # Connect to SageMaker APIs
region = sgmk_session.boto_session.region_name  # AWS Region (e.g., 'ap-southeast-1')
bucket_name = sgmk_session.default_bucket()  # Default Amazon S3 bucket
bucket_prefix = "sme101/direct-marketing"  # S3 path for file storage
sgmk_role = sagemaker.get_execution_role()  # IAM role with necessary permissions


print(f"s3://{bucket_name}/{bucket_prefix}")
print(sgmk_role)
```

This script initializes your connection with AWS services by setting parameters like the AWS region, S3 bucket name, bucket prefix, and execution role.

If you'd like to verify the instance, check the notebook instances section in the SageMaker interface or the corresponding section in Studio.

![The image shows the Amazon SageMaker interface, highlighting features like Studio Notebooks, One-click Training, and Deployment options for machine learning workflows.](https://kodekloud.com/kk-media/image/upload/v1752862053/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_320.jpg)

> [!important]
> **Execution Tip**
>
> Once the kernel is up and running, click the play button on each cell to execute the code.

## Importing Libraries and Configuring S3

After setting up the environment, the subsequent cell imports essential libraries and finalizes connections. The refined code is shown below:

```
# Python Built-Ins:
import json
import time


# External Dependencies:
import boto3  # AWS SDK for Python
import numpy as np  # Numerical and matrix processing
import pandas as pd  # Utilities for tabular data
import sagemaker  # AWS SDK for Amazon SageMaker
from sagemaker.automl.automl import AutoMLEstimator
from sagemaker.feature_store.feature_group import FeatureGroup


# Local Helper Functions:
import util


# Setting up SageMaker parameters
sgmk_session = sagemaker.Session()  # Connect to SageMaker APIs
region = sgmk_session.boto_session.region_name  # AWS Region (e.g., 'ap-southeast-1')
bucket_name = sgmk_session.default_bucket()  # Default S3 bucket for SageMaker
bucket_prefix = "sml01/direct-marketing"  # File path in the S3 bucket to store files
sgmk_role = sagemaker.get_execution_role()  # IAM Execution Role for required permissions


print(f"{bucket_name}/{bucket_prefix}")
print(sgmk_role)
```

Executing this cell confirms that your S3 bucket and IAM role are properly configured.

## Uploading Sample Data and Loading It into the Feature Store

In the next step, the notebook demonstrates how to fetch sample data, upload it to S3, and load the CSV file into the SageMaker Feature Store. The code below outlines these steps:

```
# Fetch the sample data using a helper function
raw_data_path = util.data.fetch_sample_data()
print(f"Got: {raw_data_path}\n")


print("Uploading raw dataset to Amazon S3:")
raw_data_s3_uri = f"s3://{bucket_name}/{bucket_prefix}/raw.csv"
!aws s3 cp {raw_data_path} {raw_data_s3_uri}


# Timing the operation and preparing the feature group
%time
feature_group_name = "sm101-direct-marketing"
print("Loading data to SageMaker Feature Store")
util.data.load_sample_data(
    raw_data_path,
    f"{raw_data_s3_uri.split('/raw.csv')[0]}/feature-store",
    feature_group_name=feature_group_name,
    ignore_columns=[
        "duration", "emp.var.rate", "cons.conf.idx", "euribor3m", "nr.employed"
    ],
)
```

This cell performs the following tasks:

- Fetches the sample CSV file.
- Uploads the CSV to a specified S3 path.
- Loads the data into the Feature Store while excluding certain columns.

After running this cell, check the SageMaker Feature Store in Studio to confirm that the data has loaded successfully.

![The image shows Amazon SageMaker Studio with a Jupyter notebook open, displaying code and instructions related to data processing and feature store setup.](https://kodekloud.com/kk-media/image/upload/v1752862054/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_460.jpg)

![The image shows the Amazon SageMaker Studio interface, specifically the Feature Store section, displaying a feature group catalog with details like name, description, and status.](https://kodekloud.com/kk-media/image/upload/v1752862056/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_470.jpg)

## Running Autopilot for Tabular Data Problems

With the feature store populated, the notebook now showcases SageMaker Autopilot—an AutoML tool that automates data preparation and model training for tabular data problems.

To create an Autopilot experiment, you can follow the Studio GUI or execute the following code to run the job manually:

```
autopilot = AutoMLEstimator(
    role=sgmk_role,
    target_attribute_name="y",
    max_candidates=20,
    base_job_name="sm101-autopilot",
    output_path=f"s3://{bucket_name}/{bucket_prefix}/autopilot"
)
autopilot.fit(raw_data_s3_uri, wait=False)
```

You can also experiment with specific algorithms like XGBoost. Retrieve the appropriate container image for XGBoost with the following code:

```
image_uri = sagemaker.image_uris.retrieve("xgboost", region=region, version="1.5-1")
print(image_uri)
```

This portion of the demo underlines SageMaker Studio’s support for a wide range of machine learning workflows—from basic model training to advanced AutoML experiments.

![The image shows the Amazon SageMaker Studio interface with a file explorer, terminal, and a notebook open, discussing starting with SageMaker Autopilot for machine learning tasks.](https://kodekloud.com/kk-media/image/upload/v1752862057/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_500.jpg)

## Querying the Feature Store

The final part of the notebook demonstrates how to extract a snapshot from the SageMaker Feature Store using an Athena query. The following code snippet shows how to perform this query:

```
feature_group = FeatureGroup(feature_group_name, sagemaker_session=sgmk_session)
query = feature_group.athena_query()
table_name = query.table_name


data_extract_s3_uri = f"s3://{bucket_name}/{bucket_prefix}/data-extract"
!aws s3 rm --quiet --recursive {data_extract_s3_uri}  # Clear previous data extracts
print(f"Querying feature store to extract snapshot at:\n{data_extract_s3_uri}")


query.run("""
SELECT *
FROM (
    SELECT
        ROW_NUMBER() OVER (
            PARTITION BY "customer_id"
            ORDER BY "event_time" DESC, api_invocation_time DESC, write_time DESC
        ) AS row_number,
        *
    FROM "{table_name}"
    WHERE "event_time" = {time.time()}
) t
WHERE row_number = 1 AND NOT is_deleted;
""", output_location=data_extract_s3_uri)
query.wait()


full_df = query.as_dataframe()
print(f"Got {len(full_df)} records")
```

In summary, this process:

- Executes an Athena query on the feature store table to extract the latest records for each customer.
- Stores results at a specified S3 URI.
- Loads the data into a pandas DataFrame for further analysis.

A similar version of the query is provided later in the notebook, featuring slight variations in syntax.

![The image shows the Amazon SageMaker Studio interface, focusing on setting up an AutoML experiment with input data from an S3 location.](https://kodekloud.com/kk-media/image/upload/v1752862058/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_650.jpg)

![The image shows the Amazon SageMaker Studio interface, focusing on setting up a machine learning experiment with target and feature selection options.](https://kodekloud.com/kk-media/image/upload/v1752862059/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_710.jpg)

![The image shows the Amazon SageMaker Studio interface for creating an Autopilot experiment, focusing on selecting training methods and algorithms.](https://kodekloud.com/kk-media/image/upload/v1752862060/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_780.jpg)

![The image shows the Amazon SageMaker Studio interface, specifically the "Create an Autopilot experiment" section with deployment settings and advanced options for machine learning.](https://kodekloud.com/kk-media/image/upload/v1752862062/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_800.jpg)

![The image shows the Amazon SageMaker Studio interface, specifically the "Create an Autopilot experiment" section, detailing experiment configuration and data input settings.](https://kodekloud.com/kk-media/image/upload/v1752862063/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-SageMaker-Demo/frame_820.jpg)

## Conclusion

In this lesson, we demonstrated how AWS SageMaker Studio streamlines machine learning model development. You learned how to:

- Navigate the SageMaker Studio interface
- Import essential libraries and set up your environment
- Upload sample data to S3 and load it into the Feature Store
- Run AutoML experiments with SageMaker Autopilot and test with XGBoost
- Query the Feature Store using Athena to extract data snapshots

By leveraging SageMaker, you focus on model development and experimentation while AWS handles the underlying infrastructure. We hope this demo has provided valuable insights into efficient machine learning workflows using AWS SageMaker. Happy modeling, and see you in the next lab!

> [!important]
> **Further Learning**
>
> For more information on AWS SageMaker and advanced machine learning workflows, visit the [AWS SageMaker Documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/56b16cb5-00a3-4ce6-860f-a04929b9a2b3)**
>
> Watch video content

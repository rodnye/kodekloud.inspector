# Demo Model Evaluation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Building-and-Training-Models/Demo-Model-Evaluation)

---

## Table of Contents

- Demo Model Evaluation
  - Data Preparation and Transformation
  - Defining the Dataset
  - Loading the Model
  - Real-Time Model Inference
  - Batch Inference
  - Evaluating Model Performance with TorchMetrics
  - Evaluating on the Test Dataset with TorchMetrics
  - Custom Metric Calculation
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

PyTorch

Building and Training Models

# Demo Model Evaluation

In this guide, we evaluate multiple trained models to identify the best performer for deployment. We cover every step—from loading and preprocessing unseen data to executing real-time and batch inferences, and finally computing performance metrics.

---

## Data Preparation and Transformation

Begin by importing the necessary modules and defining an image preprocessing transformation. These transformations ensure the image data is in the required input format during inference.

```
# Import necessary modules
import pandas as pd
import torch
import os
from torch.utils.data import Dataset, DataLoader
from PIL import Image
from torchvision.transforms import v2


# Define the test transformation pipeline
test_transform = v2.Compose([
    v2.Resize((128, 128)),
    v2.ToImage(),
    v2.ToType(torch.float32, scale=True),
    v2.Normalize(mean=[0.485, 0.456, 0.406],
                 std=[0.229, 0.224, 0.225])
])
```

---

## Defining the Dataset

Create a custom dataset class to load images along with their corresponding labels. In this example, the label encoding maps "malignant" to 0 and "benign" to 1.

```
# Define label encoding
label_encoding = {"malignant": 0, "benign": 1}


# Custom dataset class for images
class CustomImageDataset(Dataset):
    def __init__(self, annotations_file, img_dir, transform, target_transform):
        self.img_labels = pd.read_csv(annotations_file)
        self.img_dir = img_dir
        self.transform = transform
        self.target_transform = lambda y: target_transform[y]


    def __len__(self):
        return len(self.img_labels)


    def __getitem__(self, idx):
        img_path = os.path.join(self.img_dir, self.img_labels.iloc[idx, 0])
        image = Image.open(img_path)
        label = self.img_labels.iloc[idx, 1]
        image = self.transform(image)
        label = self.target_transform(label)
        return image, label
```

After defining the dataset, instantiate it and create a DataLoader. The DataLoader processes the test data in batches (batch size of 32) without shuffling, which is standard for evaluation purposes.

```
# Instantiate the test dataset and create a DataLoader
test_dataset = CustomImageDataset(
    annotations_file='test_data.csv',
    img_dir='../../../',
    transform=test_transform,
    target_transform=label_encoding
)


test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)
```

> [!important]
> **Note**
>
> Ensure that your CSV file and image directory path are correctly set to avoid file not found errors.

---

## Loading the Model

Load your pre-trained model by defining its network architecture and then loading the checkpoint containing the trained weights. Below is a sample implementation of a breast cancer classification model.

```
import torch.nn as nn
import torch.nn.functional as F


class BreastCancerClassification(nn.Module):
    def __init__(self):
        super(BreastCancerClassification, self).__init__()
        # Define convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2)
        # Define fully connected layers
        self.fc1 = nn.Linear(64 * 32 * 32, 256)
        self.fc2 = nn.Linear(256, 128)
        self.fc3 = nn.Linear(128, 2)


    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 32 * 32)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x


# Create an instance of the model
model = BreastCancerClassification()


# Load model checkpoint (weights only)
checkpoint = torch.load('model_checkpoint.tar', map_location=torch.device('cpu'))
model.load_state_dict(checkpoint['model_state_dict'])
```

After verifying that the model keys match, the model is ready for evaluation.

---

## Real-Time Model Inference

Real-time inference processes a single prediction request instantly. The example below shows how to load an image, apply the transformation, and then perform inference to obtain a class prediction.

```
# Import required module for image handling
from PIL import Image


# Open a sample image
image_path = 'sample-input.jpg'
image = Image.open(image_path)


# Set the model to evaluation mode
model.eval()


# Apply the test transformation
transformed_image = test_transform(image)


# Perform inference
output = model(transformed_image)
_, predicted = torch.max(output.data, 1)  # Identify the highest scoring class


# Print the predicted class
print(f"Class: {predicted.item()}")


# Map the predicted index to a human-readable label
index_to_class_map = {v: k for k, v in label_encoding.items()}
print(f"Predicted label: {index_to_class_map[predicted.item()]}")
```

---

## Batch Inference

Batch inference processes multiple images simultaneously. This approach mirrors the method used during training. The following code demonstrates batch processing using the DataLoader.

```
# Batch Inference Example
print(f"Batch size: {test_loader.batch_size}")
print(f"Total images in dataset: {len(test_dataset)}")


# Process and predict in batches
for i, data in enumerate(test_loader, 0):
    inputs, labels = data
    outputs = model(inputs)
    _, predicted = torch.max(outputs.data, 1)
    print(f"Batch {i + 1} prediction: {predicted}")
```

Since the dataset contains 100 images and the batch size is 32, the DataLoader returns three full batches and a final batch of 4 images.

It is good practice to perform inference without tracking gradients to speed up processing and lower memory consumption:

```
# Batch Inference with gradient tracking disabled
with torch.no_grad():
    for i, data in enumerate(test_loader, 0):
        inputs, labels = data
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        print(f"Batch {i + 1} prediction: {predicted}")
```

You can also time these loops using magic commands like `%%time` in a Jupyter Notebook to compare performance.

---

## Evaluating Model Performance with TorchMetrics

[TorchMetrics](https://torchmetrics.readthedocs.io/) is an excellent library for tracking various performance metrics during model evaluation. In the example below, we compute the accuracy based on simulated predictions for a three-class classification setup.

```
import torchmetrics


# Simulated network outputs for a 3-class classification problem
num_classes = 3
inputs_simulated = torch.tensor([
    [2.0, 1.0, 0.1],
    [0.5, 2.5, 0.1],
    [0.1, 0.4, 3.0],
    [0.3, 1.5, 2.1],
    [0.0, 2.0, 3.0],
    [2.0, 1.5, 0.6],
    [1.0, 0.5, 2.0]
])


# Define true labels (with some intentional discrepancies for demonstration)
true_labels = torch.tensor([1, 1, 2, 0, 2, 1, 1, 0, 1, 0])


# Initialize the accuracy metric for a multi-class task
accuracy_metric = torchmetrics.Accuracy(task="multiclass", num_classes=num_classes)


# Simulate predictions from the model
_, predicted_simulated = torch.max(inputs_simulated.data, 1)


# Update and compute the accuracy metric
accuracy_metric.update(predicted_simulated, true_labels)
final_accuracy = accuracy_metric.compute()
print(f"Simulated Accuracy: {final_accuracy * 100}%")
```

---

## Evaluating on the Test Dataset with TorchMetrics

Integrate TorchMetrics directly into your test loop to evaluate the model on the entire test dataset. The code below sets the model to evaluation mode, disables gradient tracking, and then computes the overall accuracy.

```
import torchmetrics


# Initialize the accuracy metric for a binary classification task
accuracy_metric = torchmetrics.Accuracy(task="multiclass", num_classes=2)


# Set the model to evaluation mode and disable gradient tracking
model.eval()
with torch.no_grad():
    for i, data in enumerate(test_loader, 0):
        inputs, labels = data
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        accuracy_metric.update(predicted, labels)


# Compute and display the final test accuracy
final_accuracy = accuracy_metric.compute()
print(f"Test Accuracy: {final_accuracy * 100}%")
```

> [!important]
> **Tip**
>
> If you run multiple evaluations in succession, reset the metric using the `reset()` method before each new update to ensure accurate tracking.

---

## Custom Metric Calculation

In addition to TorchMetrics, you can implement a custom metric. The following example demonstrates how to calculate accuracy manually by comparing model predictions with true labels.

```
# Custom Accuracy Calculation
correct = 0
total = 0


with torch.no_grad():
    for i, data in enumerate(test_loader, 0):
        inputs, labels = data
        outputs = model(inputs)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()


# Print the custom computed accuracy percentage
print(f'Custom Accuracy: {100 * correct // total}%')
```

---

## Summary

In this guide, we demonstrated the comprehensive process of model evaluation:

- **Data Preparation:** Importing modules, setting up the transformation pipeline, and creating a custom dataset.
- **Model Loading:** Initializing the network architecture and loading pre-trained weights.
- **Inference Techniques:** Running both real-time single-image inference and batch inference.
- **Performance Metrics:** Computing accuracy using both TorchMetrics and custom metric implementations to assess model performance.

While the demonstration produced an accuracy of around 49%—likely due to limited data and training epochs—the evaluation process detailed here can be extended to larger, more diverse datasets to ensure robust model performance prior to production deployment.

Happy evaluating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/b8cb82ae-a284-41d1-8469-7e60705bbab8/lesson/89b22e08-20d4-4dfe-ac58-c224dde76741)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/b8cb82ae-a284-41d1-8469-7e60705bbab8/lesson/6eeceb16-b6d3-4172-993c-6ce4c60c0f7f)**
>
> Practice lab

# Building Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Working-with-Data/Building-Data)

---

## Table of Contents

- Building Data
  - Data Splitting
  - Dataset Versioning
  - Data Cleaning and Preprocessing
  - Creating a PyTorch Dataset
  - Data Versioning and Tracking Approaches
  - Data Transformations
  - Creating DataLoaders
  - Summary
  - Watch Video
    - Training Transformation
    - Validation Transformation

---

## Content

PyTorch

Working with Data

# Building Data

In this lesson, we explain how to build custom data for training a model using PyTorch. We cover data splitting, cleaning, versioning, and creating data transforms and loaders in a clear, step-by-step manner.

## Data Splitting

Data splitting divides your dataset into training, validation, and testing subsets. This is essential for ensuring that your model generalizes well and that performance metrics are reliable. For instance, you might use a 70/15/15 ratio for training, validation, and testing respectively, although you can adjust these percentages to meet your project requirements.

![The image illustrates data splitting for machine learning, showing percentages for training (70%), validation (15%), and testing (15%) datasets. Each section is described with its purpose: teaching the model, fine-tuning, and measuring final performance.](https://kodekloud.com/kk-media/image/upload/v1752883269/notes-assets/images/PyTorch-Building-Data/data-splitting-machine-learning-diagram.jpg)

PyTorch's `RandomSplit` utility from the `torch.utils.data` module can help automate this process by randomly dividing the dataset into the desired sizes. Here’s an example:

```
from torch.utils.data import random_split


# Calculate sizes for training, validation, and testing sets
train_size = int(0.7 * len(dataset))
val_size = int(0.15 * len(dataset))
test_size = len(dataset) - train_size - val_size


# Randomly split the dataset
train_dataset, val_dataset, test_dataset = random_split(dataset, [train_size, val_size, test_size])
```

> [!important]
> **Note**
>
> Keep in mind that `RandomSplit` produces different splits every time it is executed. For reproducible results, manage data tracking and versioning separately.

## Dataset Versioning

Versioning is vital for ensuring reproducibility in model training. By recording the exact data used (for example, via a CSV annotations file), you can easily reproduce and verify your experiments—even if the underlying dataset changes. Tools like [DVC](https://dvc.org/) or [Git](https://git-scm.com/) are commonly used for this purpose.

![The image outlines the benefits of tracking and versioning data, highlighting consistency, change tracking, collaboration, model performance impact, and experiment flexibility.](https://kodekloud.com/kk-media/image/upload/v1752883270/notes-assets/images/PyTorch-Building-Data/data-tracking-versioning-benefits.jpg)

## Data Cleaning and Preprocessing

Before training your image classification model, cleaning and preprocessing the data is key. Data cleaning removes duplicate, blurry, or irrelevant images that could confuse the model, while preprocessing standardizes the data by resizing images and normalizing pixel values.

Important transformations for image classification include:

- **Conversion to tensor** using `ToTensor()`
- **Normalization** for consistent pixel value ranges

Additional augmentations such as random cropping, horizontal flipping, and rotations can help increase data diversity. However, choose augmentations that suit the real-world images your model is expected to process.

![The image illustrates various image transformation functions, such as ToTensor() and RandomCrop(), used to process an original image into a processed image.](https://kodekloud.com/kk-media/image/upload/v1752883272/notes-assets/images/PyTorch-Building-Data/image-transformation-functions-diagram.jpg)

## Creating a PyTorch Dataset

PyTorch supports both preloaded and custom datasets. For example, if you’re using a preloaded dataset like CIFAR10, make sure to review its documentation for details on subset flags. Here’s how you can set up CIFAR10 with basic transformations:

```
import torchvision
import torchvision.transforms as transforms


# Define transformation: convert image to tensor and normalize pixel values
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])


# CIFAR10 Training set
trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)


# CIFAR10 Testing set
testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=True, transform=transform)
```

Once your dataset is cleaned and prepared, you can apply the previously described data splitting technique using `RandomSplit`.

## Data Versioning and Tracking Approaches

Documenting your data is crucial. You have a couple of approaches:

1.  **Annotations File**  
    Use an annotations file to record each image's path along with its corresponding label:

    ```
    image, label
    img1.jpg, class1
    img2.jpg, class1
    ...
    img3.jpg, class2
    ```

2.  **Folder Organization**  
    Organize your dataset into folders for training, validation, and testing, with subfolders for each class label:

    ```
    dataset/
    ├── train/
    │   ├── class1/
    │   │   ├── img1.jpg
    │   │   └── ...
    │   └── class2/
    │       ├── img1.jpg
    │       └── ...
    ├── valid/
    │   ├── class1/
    │   │   ├── img1.jpg
    │   │   └── ...
    │   └── class2/
    │       ├── img1.jpg
    │       └── ...
    └── test/
        ├── class1/
        │   ├── img1.jpg
        │   └── ...
        └── class2/
            ├── img1.jpg
            └── ...
    ```

> [!important]
> **Note**
>
> Using an annotations file offers flexibility, as it allows managing datasets without loading all images into memory at once.

## Data Transformations

Different subsets of your dataset may require unique transformations. Training transforms often include data augmentations, while validation and testing transforms remain minimal for consistency.

### Training Transformation

```
from torchvision import transforms


train_transform = transforms.Compose([
    transforms.Resize((128, 128)),          # Resize to a fixed size
    transforms.RandomHorizontalFlip(),      # Randomly flip images horizontally
    transforms.ToTensor(),                  # Convert image to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])  # Normalize pixel values
])
```

### Validation Transformation

```
from torchvision import transforms


val_transform = transforms.Compose([
    transforms.Resize((128, 128)),          # Resize to a fixed size
    transforms.ToTensor(),                  # Convert image to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])  # Normalize pixel values
])
```

After defining these transformations, you can create custom datasets that apply them as needed:

```
# Training Dataset
train_dataset = CustomDataset(
    annotations_file='train_labels.csv',
    transform=train_transform
)


# Validation Dataset
val_dataset = CustomDataset(
    annotations_file='val_labels.csv',
    transform=val_transform
)
```

## Creating DataLoaders

DataLoaders are essential for batching and efficiently feeding data into your model during training and evaluation. Below is an example of how to create DataLoaders for your custom datasets:

```
import torch


# Training DataLoader
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=64,
                                           shuffle=True, num_workers=2)


# Validation DataLoader
val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=32,
                                         shuffle=True, num_workers=1)
```

## Summary

This lesson covered essential topics for effective data preparation in PyTorch:

- **Data Splitting**: Using `RandomSplit` to create balanced training, validation, and testing subsets.
- **Data Cleaning and Preprocessing**: Ensuring image quality and consistency through cleaning, resizing, and normalization.
- **Dataset Versioning**: Tracking data with annotations files or organized folder structures for reproducibility.
- **Data Transformations**: Customizing training and validation pipelines to include the necessary augmentations.
- **Creating DataLoaders**: Efficiently batching and feeding data during model training.

![The image outlines a seven-step process for preparing data in PyTorch, including cleaning, creating datasets, splitting data, tracking, defining transformations, and creating DataLoaders.](https://kodekloud.com/kk-media/image/upload/v1752883273/notes-assets/images/PyTorch-Building-Data/pytorch-data-preparation-process.jpg)

Additionally, documenting your data—using either annotations files or a structured folder layout—ensures transparent and reproducible experiments.

![The image outlines steps for creating an initial PyTorch dataset, including creating a dataset with all data, using preloaded or custom datasets, and checking documentation for flags defining subsets.](https://kodekloud.com/kk-media/image/upload/v1752883275/notes-assets/images/PyTorch-Building-Data/pytorch-dataset-creation-steps.jpg)

Finally, tracking and versioning are emphasized so that you can reliably reproduce your experiments:

![The image outlines three methods for tracking and versioning data: using DVC or Git for datasets, an annotations file for documenting images, and the ImageFolder method for organizing images into subsets.](https://kodekloud.com/kk-media/image/upload/v1752883276/notes-assets/images/PyTorch-Building-Data/data-versioning-tracking-methods.jpg)

In the next demonstration, we will integrate these data preparation techniques into a complete workflow for PyTorch model training.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/f9d4b50b-328e-4cf7-a22a-3b236bf0abcd/lesson/38c436af-6837-416e-8195-f4a5342ef66f)**
>
> Watch video content

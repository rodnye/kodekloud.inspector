# Demo Building Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Working-with-Data/Demo-Building-Data)

---

## Table of Contents

- Demo Building Data
  - 1. Loading and Displaying the Dataset
  - 2. Cleaning the Dataset and Creating Annotations
  - 3. Creating an Initial PyTorch Dataset
  - 4. Splitting the Dataset
  - 5. Data Versioning and Annotation for Subsets
  - 6. Defining Data Transformations
  - 7. Constructing a Custom Image Dataset and DataLoaders
  - Conclusion
  - Watch Video
  - Practice Lab
    - Training Transformations
    - Validation Transformations
    - Creating DataLoaders

---

## Content

PyTorch

Working with Data

# Demo Building Data

In this lesson, we will guide you through building and preprocessing a custom dataset to train a machine learning model. Whether you are working with images, text, audio, or any other data modality, this step-by-step tutorial covers data cleaning, annotation creation, dataset splitting, versioning, applying transformations, and ultimately preparing PyTorch datasets along with DataLoaders.

---

## 1\. Loading and Displaying the Dataset

First, we load the dataset and visualize the images to verify that they meet the training requirements.

> [!important]
> **Tip**
>
> Viewing your dataset before training helps identify any images that do not belong to your target classes.

```
# View all images in our dataset
import glob
import matplotlib.pyplot as plt
from PIL import Image

# Get a list of images with jpg extension in any subdirectory
images_list = glob.glob("images/**/*jpg")
```

Next, we display each image along with its file name. This step assists in detecting any out-of-scope images.

```
# Display each image in our dataset
import glob
import matplotlib.pyplot as plt
from PIL import Image

# Get a list of images with jpg extension from the subdirectories
images_list = glob.glob("images/*/*.jpg")

for image in images_list:
    plt.title(image)
    img = Image.open(image)
    plt.imshow(img)
    plt.axis("on")
    plt.show()
```

In our dataset, the expected images are of cats and dogs. However, the initial exploration might reveal images of a frog or horse, which are irrelevant for a cat-versus-dog classification task.

---

## 2\. Cleaning the Dataset and Creating Annotations

After examining the images, it's crucial to remove any that do not match the target classes. In this example, we remove the horse and frog images from the dataset and then generate an annotations CSV file.

```
# Print the image list before cleaning
print(images_list)

# Remove images that shouldn't be in our dataset
images_list.remove('images/cat/horse-1.jpg')  # Remove the horse image
images_list.remove('images/cat/frog-1.jpg')   # Remove the frog image

# Verify the cleaned list
print(images_list)
```

Now, create the annotations CSV file where each record maps the image file path to its class label (extracted from the directory structure).

```
# Write the cleaned image list to a CSV file for annotations
import os
import pandas as pd

data = []

for file_path in images_list:
    # Extract the class label from the path (e.g., 'dog' or 'cat')
    label = os.path.basename(os.path.dirname(file_path))
    data.append({"file_path": file_path, "label": label})

# Save the annotations as CSV
df = pd.DataFrame(data)
df.to_csv("image_data.csv", index=False)
```

The resulting CSV (image_data.csv) should look similar to:

file_path,label  
images/cat/cat-4.jpg,cat  
images/cat/cat-5.jpg,cat  
images/cat/cat-2.jpg,cat  
images/cat/cat-3.jpg,cat  
images/dog/dog-4.jpg,dog  
images/dog/dog-1.jpg,dog  
images/dog/dog-3.jpg,dog  
images/dog/dog-5.jpg,dog

---

## 3\. Creating an Initial PyTorch Dataset

Next, we create an initial PyTorch dataset class that reads our annotations CSV file and returns the image path along with its label. This forms the basis for our training pipeline.

```
import pandas as pd
from torch.utils.data import Dataset

class InitialDataset(Dataset):
    def __init__(self, annotations_file):
        self.img_labels = pd.read_csv(annotations_file)

    def __len__(self):
        return len(self.img_labels)

    def __getitem__(self, idx):
        img_path = self.img_labels.iloc[idx, 0]
        label = self.img_labels.iloc[idx, 1]
        return img_path, label

# Create a PyTorch Dataset instance from our annotations file
dataset = InitialDataset(annotations_file='image_data.csv')
```

---

## 4\. Splitting the Dataset

It is important to split the dataset into training, validation, and testing subsets. Here, we randomly partition the data into 70% for training, 15% for validation, and 15% for testing.

```
from torch.utils.data import random_split

# Define the sizes of each split
train_size = int(0.7 * len(dataset))
val_size   = int(0.15 * len(dataset))
test_size  = len(dataset) - train_size - val_size

# Split the dataset
train_dataset, val_dataset, test_dataset = random_split(dataset, [train_size, val_size, test_size])
print(train_dataset.indices, val_dataset.indices, test_dataset.indices)
```

The indices printed represent the positions of images in the original dataset. You can further verify the allocation by printing rows from `dataset.img_labels`:

```
# Check the annotation of an image from the training set using its index
print(dataset.img_labels.loc[train_dataset.indices[0]])
```

---

## 5\. Data Versioning and Annotation for Subsets

Versioning your data annotations is a best practice for reproducibility. By saving separate CSV files for each subset (training, validation, and testing), you can easily track and reproduce your training experiments.

For example, to generate annotations for the training set:

```
import pandas as pd

data = []

# Create annotations for the training set
for idx in train_dataset.indices:
    img_path = dataset.img_labels['file_path'].loc[idx]
    label = dataset.img_labels['label'].loc[idx]
    data.append({"file_path": img_path, "label": label})

df = pd.DataFrame(data)
df.to_csv("training_data.csv", index=False)
```

Similarly, create annotation files for the validation and testing sets:

```
# Annotations for the validation set
data = []
for idx in val_dataset.indices:
    img_path = dataset.img_labels['file_path'].loc[idx]
    label = dataset.img_labels['label'].loc[idx]
    data.append({"file_path": img_path, "label": label})

df = pd.DataFrame(data)
df.to_csv("validation_data.csv", index=False)

# Annotations for the test set
data = []
for idx in test_dataset.indices:
    img_path = dataset.img_labels['file_path'].loc[idx]
    label = dataset.img_labels['label'].loc[idx]
    data.append({"file_path": img_path, "label": label})

df = pd.DataFrame(data)
df.to_csv("testing_data.csv", index=False)
```

This separation helps maintain clear records of which images are used during each phase of training.

---

## 6\. Defining Data Transformations

Data transformations and augmentations are key to preparing your images for model training. Typically, training data benefits from a variety of augmentations, while validation data should remain consistent.

### Training Transformations

In this example, we use TorchVision's v2 transforms to resize images, perform random cropping and horizontal flipping, convert to tensors, and apply normalization.

```
import torch
from torchvision.transforms import v2

train_transform = v2.Compose([
    v2.Resize((128, 128)),                 # Resize the image
    v2.RandomCrop(size=(75, 75)),            # Perform a random crop
    v2.RandomHorizontalFlip(p=0.7),          # Apply horizontal flip with 70% probability
    v2.ToImage(),                          # Convert to image (if required)
    v2.ToDtype(torch.float32, scale=True),   # Convert image to tensor and scale the values
    v2.Normalize(mean=[0.485, 0.456, 0.406],  std=[0.229, 0.224, 0.225])  # Normalize
])
```

### Validation Transformations

For validation, we avoid random augmentations to ensure consistent inputs.

```
val_transform = v2.Compose([
    v2.Resize((128, 128)),                 # Resize to a fixed size
    v2.ToImage(),                          # Convert to image (if required)
    v2.ToDtype(torch.float32, scale=True),   # Convert image to tensor and scale the values
    v2.Normalize(mean=[0.485, 0.456, 0.406],  std=[0.229, 0.224, 0.225])  # Normalize
])
```

---

## 7\. Constructing a Custom Image Dataset and DataLoaders

We now build a custom dataset class that incorporates our annotations, image directory, and transformation pipelines. Additionally, we use a label encoding strategy to convert categorical labels into numerical format.

```
import os
import pandas as pd
from torch.utils.data import Dataset
from PIL import Image

class CustomImageDataset(Dataset):
    def __init__(self, annotations_file, img_dir, transform, target_transform):
        self.img_labels = pd.read_csv(annotations_file)
        self.img_dir = img_dir
        self.transform = transform
        # Convert label strings to numerical values using the mapping provided
        self.target_transform = lambda y: target_transform[y]

    def __len__(self):
        return len(self.img_labels)

    def __getitem__(self, idx):
        # Construct the full image path
        img_path = os.path.join(self.img_dir, self.img_labels.iloc[idx, 0])
        image = Image.open(img_path)
        label = self.img_labels.iloc[idx, 1]

        # Apply the transformation and encode the label
        image = self.transform(image)
        label = self.target_transform(label)

        return image, label

# Define label encoding mapping
label_encoding = {"cat": 0, "dog": 1}

# Create the training dataset using the custom dataset class
train_dataset = CustomImageDataset(
    annotations_file='training_data.csv',
    img_dir='./',
    transform=train_transform,
    target_transform=label_encoding
)

print("Encoded label for 'dog':", train_dataset.target_transform('dog'))
```

Create the validation dataset similarly:

```
# Create the validation dataset
val_dataset = CustomImageDataset(
    annotations_file='validation_data.csv',
    img_dir='./',
    transform=val_transform,
    target_transform=label_encoding
)
```

### Creating DataLoaders

DataLoaders help batch and shuffle data during training and evaluation.

```
from torch.utils.data import DataLoader

# DataLoader for the training dataset
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Inspect the batch size for training data
features, labels = next(iter(train_loader))
print(f"Training features shape: {features.size()}")

# DataLoader for the validation dataset (no shuffling)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

# Inspect the batch size for validation data
features, labels = next(iter(val_loader))
print(f"Validation features shape: {features.size()}")
```

> [!important]
> **Observation**
>
> Due to the use of random cropping in the training transformations, the spatial dimensions of training images (e.g., 75×75) might differ from the fixed dimensions of the validation images (128×128).

---

## Conclusion

Congratulations! You have now learned how to:

- Load and visualize image data.
- Clean the dataset and create annotation CSVs.
- Build an initial PyTorch dataset and split it into training, validation, and testing subsets.
- Implement data versioning for reproducibility.
- Define and apply transformation pipelines for data augmentation.
- Develop custom PyTorch datasets and DataLoaders.

With these foundational steps, you are well-equipped to proceed with model training using your custom data. For further guidance, consider reviewing resources like [PyTorch Documentation](https://pytorch.org/docs/stable/index.html) and [TorchVision Transforms](https://pytorch.org/vision/stable/transforms.html). Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/f9d4b50b-328e-4cf7-a22a-3b236bf0abcd/lesson/8c9ae3d2-aba2-49a0-808e-3b13de5783bc)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/f9d4b50b-328e-4cf7-a22a-3b236bf0abcd/lesson/f2803cbe-4ce9-431a-9ab1-ca1eed46e8af)**
>
> Practice lab

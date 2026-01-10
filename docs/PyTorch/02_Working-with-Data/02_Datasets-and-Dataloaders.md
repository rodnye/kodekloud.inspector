# Datasets and Dataloaders - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Working-with-Data/Datasets-and-Dataloaders)

---

## Table of Contents

- Datasets and Dataloaders
  - Overview
  - PyTorch Datasets
  - Preloaded Datasets in PyTorch
  - Dataloaders in PyTorch
  - Summary
  - Watch Video
    - Creating a Custom Dataset
    - Example: Loading the MNIST Dataset
      - Loading Image Data
      - Loading Text Data
      - Loading Audio Data

---

## Content

PyTorch

Working with Data

# Datasets and Dataloaders

Data is the cornerstone of any machine learning or AI project. The quality and organization of your data have a direct impact on model performance. High-quality, well-organized data enables your model to learn meaningful patterns rather than noise, thereby enhancing its ability to generalize to new, unseen data.

In this lesson, we explore how PyTorch’s Datasets and Dataloaders provide powerful tools for efficient data handling and loading.

![The image contains three icons with text emphasizing the importance of data in machine learning and AI: data is crucial for success, quality data improves performance, and clean data helps identify patterns.](https://kodekloud.com/kk-media/image/upload/v1752883290/notes-assets/images/PyTorch-Datasets-and-Dataloaders/data-importance-machine-learning-icons.jpg)

## Overview

In PyTorch, a **Dataset** represents your data (whether images, text, or any other forms), while a **Dataloader** wraps an iterable around the dataset, enabling efficient access to data samples. Together, they simplify tasks like batching, shuffling, and parallel data loading, thereby streamlining the training process.

![The image illustrates the concept of datasets and dataloaders, showing how datasets represent data and dataloaders wrap datasets for easy access, leading to model input.](https://kodekloud.com/kk-media/image/upload/v1752883291/notes-assets/images/PyTorch-Datasets-and-Dataloaders/datasets-dataloaders-concept-illustration.jpg)

Efficient data access and processing patterns are key to improving training performance. Datasets and dataloaders not only abstract the data-handling process but also optimize the training loops.

![The image illustrates the concept of datasets and data loaders, showing a large dataset being divided into smaller batches for data loading.](https://kodekloud.com/kk-media/image/upload/v1752883292/notes-assets/images/PyTorch-Datasets-and-Dataloaders/datasets-data-loaders-batches.jpg)

## PyTorch Datasets

Datasets in PyTorch are typically implemented using a Python class that serves as a blueprint for accessing and processing data samples. This approach allows you to customize data handling for various types of inputs.

![The image is a slide titled "PyTorch Datasets," explaining that PyTorch datasets are defined using a Python class, which handles data access and processing. It includes an icon representing datasets.](https://kodekloud.com/kk-media/image/upload/v1752883293/notes-assets/images/PyTorch-Datasets-and-Dataloaders/pytorch-datasets-python-class-slide.jpg)

The **Dataset** class is built around three key methods:

- **`__init__`**: Initializes the dataset object. Here you define the dataset source (e.g., a local directory, annotation file) and specify any transformations to be applied.
- **`__len__`**: Returns the total number of samples in your dataset.
- **`__getitem__`**: Retrieves a specific data sample based on the index, supporting indexed access similar to Python lists or arrays.

![The image describes key methods of a dataset class: `__init__` for initialization, `__len__` for returning the number of samples, and `__getitem__` for retrieving a data sample by index.](https://kodekloud.com/kk-media/image/upload/v1752883294/notes-assets/images/PyTorch-Datasets-and-Dataloaders/dataset-class-methods-init-len-getitem.jpg)

Below is an example showcasing a custom PyTorch dataset class called `CustomImageDataset`:

```
import os
import pandas as pd
from torchvision.io import read_image
from torch.utils.data import Dataset

class CustomImageDataset(Dataset):
    def __init__(self, annotations_file, img_dir, transform=None, target_transform=None):
        self.img_labels = pd.read_csv(annotations_file)
        self.img_dir = img_dir
        self.transform = transform
        self.target_transform = target_transform

    def __len__(self):
        return len(self.img_labels)

    def __getitem__(self, idx):
        img_path = os.path.join(self.img_dir, self.img_labels.iloc[idx, 0])
        image = read_image(img_path)
        label = self.img_labels.iloc[idx, 1]
        if self.transform:
            image = self.transform(image)
        if self.target_transform:
            label = self.target_transform(label)
        return image, label
```

In this example, the `__init__` method reads an annotation CSV file containing image filenames and labels. The image directory and optional transformations are stored for later use. The `__len__` method returns the number of samples, while `__getitem__` constructs the image path, reads the image into a tensor, applies the necessary transformations, and returns both image and label as a tuple.

There are two main categories of datasets in PyTorch:

1.  **Preloaded Datasets:** Ready-to-use datasets provided by PyTorch for popular data sources.
2.  **Custom Datasets:** Custom-built datasets tailored to your unique data requirements.

![The image describes two types of datasets in PyTorch: preloaded datasets, which are ready-to-use, and custom datasets, which are created by users for specific needs.](https://kodekloud.com/kk-media/image/upload/v1752883295/notes-assets/images/PyTorch-Datasets-and-Dataloaders/pytorch-datasets-preloaded-custom.jpg)

Understanding how to implement and utilize the Dataset class allows you to manage various data types while customizing data access and preprocessing techniques.

### Creating a Custom Dataset

Creating a custom dataset in PyTorch is straightforward. The flexibility offered by custom datasets lets you tailor data handling to your specific project requirements. Consider the following minimal example:

```
import torch
from torch.utils.data import Dataset

class CustomDataset(Dataset):
    def __init__(self):
        # Initialize data
        self.data = []  # Replace with your data loading logic

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        sample = self.data[idx]
        return sample  # Return a data sample
```

In this simplified example, `__init__` loads your data, `__len__` returns the total number of samples, and `__getitem__` retrieves a sample based on its index.

Depending on your project, you might need to load different data types. Here are examples for images, text, and audio:

#### Loading Image Data

```
from PIL import Image
from torch.utils.data import Dataset

class ImageDataset(Dataset):
    def __init__(self, image_paths):
        self.image_paths = image_paths  # List of image file paths

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image = Image.open(self.image_paths[idx])  # Open image file
        return image  # Return the image
```

#### Loading Text Data

```
from torch.utils.data import Dataset

class TextDataset(Dataset):
    def __init__(self, text_files):
        self.text_files = text_files  # List of text file paths

    def __len__(self):
        return len(self.text_files)

    def __getitem__(self, idx):
        with open(self.text_files[idx], 'r') as file:
            text = file.read()  # Read text file content
        return text  # Return the text data
```

#### Loading Audio Data

```
import torchaudio
from torch.utils.data import Dataset

class AudioDataset(Dataset):
    def __init__(self, audio_files):
        self.audio_files = audio_files  # List of audio file paths

    def __len__(self):
        return len(self.audio_files)

    def __getitem__(self, idx):
        waveform, sample_rate = torchaudio.load(self.audio_files[idx])  # Load audio file
        return waveform  # Return the audio data
```

## Preloaded Datasets in PyTorch

PyTorch includes a variety of preloaded datasets that are widely used in machine learning and AI tasks. These datasets are preprocessed and ready to use, saving you valuable time during experimentation. For instance, vision datasets are accessible via the TorchVision library, offering popular datasets like MNIST, CIFAR-10, and ImageNet.

![The image describes preloaded PyTorch datasets, specifically vision datasets available in `torchvision`, including MNIST, CIFAR10, and ImageNet.](https://kodekloud.com/kk-media/image/upload/v1752883298/notes-assets/images/PyTorch-Datasets-and-Dataloaders/pytorch-vision-datasets-mnist-cifar-imagenet.jpg)

Text tasks benefit from the TorchText library, and audio processing tasks often leverage TorchAudio, both of which include several preloaded datasets.

### Example: Loading the MNIST Dataset

The MNIST dataset is a classic example in the machine learning community, containing 70,000 images of handwritten digits. Using TorchVision, loading MNIST is straightforward:

```
from torchvision import datasets

train_dataset = datasets.MNIST(root='data/', train=True, download=True)
print(train_dataset)
# Output:
# Dataset MNIST
#     Number of datapoints: 60000
#     Root location: data/
#     Split: Train
```

By setting `train=True`, you load the training set; similarly, switching to `train=False` provides the test set. Each sample in the dataset is a tuple consisting of a 28x28 grayscale image and its corresponding label (a digit between 0 and 9).

Accessing individual samples is as simple as:

```
image, label = train_dataset[0]
print(f'Label: {label}')
print(f'Image size: {image.size}')
```

This method of accessing data is consistent with both preloaded and custom datasets.

## Dataloaders in PyTorch

Dataloaders serve as an iterable wrapper around a dataset, making it easier to loop through data samples during training. They are especially useful for handling batching, shuffling, and parallel data loading using multiple workers.

![The image explains the concept of DataLoaders, highlighting that they wrap a dataset to provide an iterable, allow looping over elements one by one, and manage batching, shuffling, and parallel loading with multiprocessing.](https://kodekloud.com/kk-media/image/upload/v1752883299/notes-assets/images/PyTorch-Datasets-and-Dataloaders/dataloaders-iterable-batching-shuffling.jpg)

When importing a Dataloader from `torch.utils.data`, you can configure key parameters:

- **batch_size**: Specifies how many samples are loaded in each batch. Larger batches speed up training but require more memory.
- **shuffle**: If set to `True`, randomizes the order of data samples each epoch, which can improve model generalization.
- **num_workers**: Determines the number of subprocesses to use for data loading. Increasing this number can boost data loading speed but consumes more CPU resources.

For example, creating a dataloader for the MNIST training dataset looks like this:

```
from torch.utils.data import DataLoader

train_loader = DataLoader(dataset=train_dataset,
                          batch_size=64,
                          shuffle=True,
                          num_workers=2)
```

> [!important]
> **Tip**
>
> Remember to adjust the `batch_size` and `num_workers` parameters according to your hardware capabilities for optimal performance.

## Summary

Datasets and Dataloaders are fundamental building blocks in PyTorch that simplify data management for model training. Preloaded datasets provide a quick starting point for many applications, while custom datasets offer the flexibility needed for specialized data sources. By fine-tuning settings such as batch size, shuffling, and the number of worker processes, you can significantly optimize both data loading and the overall training process.

![The image is a summary slide outlining key points about PyTorch, including the importance of datasets and DataLoaders, the benefits of preloaded datasets, creating custom datasets, and optimizing DataLoader settings.](https://kodekloud.com/kk-media/image/upload/v1752883300/notes-assets/images/PyTorch-Datasets-and-Dataloaders/pytorch-summary-datasets-dataloaders.jpg)

Now that you have a clear understanding of PyTorch's Datasets and Dataloaders, let's proceed to a demo to see these concepts in action.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/f9d4b50b-328e-4cf7-a22a-3b236bf0abcd/lesson/62df45f3-d356-4293-8462-2a7ec4878292)**
>
> Watch video content

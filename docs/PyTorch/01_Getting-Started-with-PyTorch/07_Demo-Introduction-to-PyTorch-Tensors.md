# Demo Introduction to PyTorch Tensors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Getting-Started-with-PyTorch/Demo-Introduction-to-PyTorch-Tensors)

---

## Table of Contents

- Demo Introduction to PyTorch Tensors
  - Creating and Initializing Tensors
  - Tensors Filled with Zeros and Ones
  - Tensor Indexing and Concatenation
  - Transforming Images into Tensors
  - Working with GPUs in PyTorch
  - Conclusion
  - Watch Video
  - Practice Lab
    - Simple and Multi-Dimensional Tensors
    - Indexing
    - Concatenation

---

## Content

PyTorch

Getting Started with PyTorch

# Demo Introduction to PyTorch Tensors

Hey everyone,

In this lesson, we'll dive into PyTorch Tensors—one of the core components for deep learning and model training. Tensors help you transform data into a format that is optimal for model training and inference. Throughout this guide, you will learn how to create, initialize, and manipulate tensors using various techniques.

Below is some helper code that imports PyTorch and matplotlib, and defines a function to visualize tensor layers. This visualization function displays each layer along with its corresponding index, which is particularly useful for understanding multi-dimensional tensor structures.

```
import torch
import matplotlib.pyplot as plt

def visualize_tensor(tensor):
    num_layers = tensor.size(0)  # Number of layers (e.g., 4 channels)
    height, width = tensor.size(1), tensor.size(2)  # Height and width (e.g., 82, 290)

    fig, axes = plt.subplots(1, num_layers, figsize=(15, 5))

    # If there is only one layer, ensure axes is iterable
    if num_layers == 1:
        axes = [axes]

    for i in range(num_layers):
        axes[i].imshow(tensor[i], cmap='gray', aspect='auto')
        axes[i].set_title(f'Layer {i+1}')

    plt.show()
```

---

## Creating and Initializing Tensors

In this section, we demonstrate how to create different types of tensors including simple one-dimensional, multi-dimensional, and random tensors.

### Simple and Multi-Dimensional Tensors

Let's start by creating a one-dimensional tensor from a list, then a two-dimensional tensor, followed by a tensor filled with random values.

```
# Create a simple 1D tensor from a list and print it
simple_tensor = torch.tensor([1, 2, 3])
print(simple_tensor)
print(simple_tensor.shape)

# Create a 2D tensor from two lists and print its shape
two_dim_simple_tensor = torch.tensor([[1, 2, 3], [4, 5, 6]])
print(two_dim_simple_tensor.shape)

# Create a 1D tensor with random values and print its contents and shape
random_tensor = torch.rand(3)
print(random_tensor)
print(random_tensor.shape)
```

For a more advanced example, here is how to create a three-dimensional tensor with dimensions 3 x 4 x 5 filled with random values:

```
# Create a 3D tensor with random values (dimensions: 3 x 4 x 5)
another_random_tensor = torch.rand(3, 4, 5)
print(another_random_tensor)
print(another_random_tensor.shape)
```

> [!important]
> **Tip**
>
> If you're unsure about the structure of your tensor, use the visualize_tensor() helper function to better understand its layers, rows, and columns.

---

## Tensors Filled with Zeros and Ones

PyTorch provides convenient functions to generate tensors pre-filled with zeros or ones, which can be extremely useful when initializing models or setting up placeholders.

```
# Create a tensor filled with zeros (dimensions: 2 x 4) and print it
zero_tensor = torch.zeros((2, 4))
print(zero_tensor)

# Create a tensor filled with ones (dimensions: 2 x 4) and print it
ones_tensor = torch.ones((2, 4))
print(ones_tensor)
```

---

## Tensor Indexing and Concatenation

This section covers how to access individual elements within a tensor using indexing, as well as how to concatenate tensors along specific dimensions.

### Indexing

Consider the following 3x3 tensor and learn how to access its rows and individual elements.

```
# Create a 3x3 tensor
tensor_a = torch.tensor([[10, 20, 30],
                         [40, 50, 60],
                         [70, 80, 90]])
print(tensor_a)

# Access the first row (index 0)
first_row = tensor_a[0]
print(first_row)

# Access the second row (index 1)
second_row = tensor_a[1]
print(second_row)

# Access the first value of the second row using two different methods
second_row_first_value = tensor_a[1, 0]
print(second_row_first_value)
```

### Concatenation

You can join tensors along an axis using PyTorch’s concatenation function. Note that concatenating tensors requires matching dimensions in the other axes.

```
# Create a new 2D tensor
tensor_b = torch.tensor([[1, 2, 3],
                         [4, 5, 6]])
print(tensor_b)

# Concatenate tensor_a and tensor_b along the first dimension (rows)
concat_tensor = torch.cat((tensor_a, tensor_b), dim=0)
print(concat_tensor)

# Attempting concatenation along dimension 1 (columns) when dimensions do not match will raise an error
# Uncommenting the following lines will throw a RuntimeError:
# concat_tensor = torch.cat((tensor_a, tensor_b), dim=1)
# print(concat_tensor)
```

> [!important]
> **Warning**
>
> Ensure that when concatenating tensors, all dimensions except the one being concatenated must match. Otherwise, PyTorch will raise a RuntimeError.

---

## Transforming Images into Tensors

In real-world applications, such as building an image classifier, transforming images into tensors is essential. The PyTorch torchvision library simplifies this process by providing image transforms.

Below is an example that uses the Pillow library (PIL) to open an image file and convert it into a tensor using torchvision.transforms. Replace "path_to_image.jpg" with the actual path to your image file.

```
from PIL import Image
import torchvision.transforms as transforms

# Load an image from the file system (replace 'path_to_image.jpg' with the actual image path)
image = Image.open("path_to_image.jpg")

# Define a transform to convert the image to a tensor
transform = transforms.ToTensor()

# Apply the transform to the image
image_tensor = transform(image)

# Print the tensor and its attributes (size, data type, and device)
print(image_tensor)
print(image_tensor.size(), image_tensor.dtype, image_tensor.device)
```

When you convert an image to a tensor, the first dimension typically represents the number of channels (for example, 3 channels for an RGB image), the second dimension represents the height, and the third dimension represents the width.

---

## Working with GPUs in PyTorch

PyTorch supports GPU acceleration, enabling faster computation for deep learning tasks. This section demonstrates how to check for GPU availability and move tensors to a GPU if one is available.

```
# Check if GPU is available
print(torch.cuda.is_available())

# Set the device to 'cuda' if GPU is available, otherwise 'cpu'
if torch.cuda.is_available():
    device = 'cuda'
else:
    device = 'cpu'

# Create a tensor on the selected device and print the device attribute
tensor_device = torch.tensor([1, 2, 3], device=device)
print(tensor_device.device)

# Attempt to move a tensor from CPU to GPU
try:
    tensor_cuda = tensor_device.to('cuda')
    print("Tensor moved to GPU:", tensor_cuda.device)
except RuntimeError as e:
    print(e)
```

> [!important]
> **Developer Note**
>
> On a machine without an NVIDIA GPU or proper drivers, attempting to move a tensor to 'cuda' will raise a runtime error. Always check for GPU availability before transferring data.

---

## Conclusion

This lesson provided a comprehensive introduction to working with PyTorch Tensors. We covered:

- Creating and initializing tensors of various dimensions and data types
- Generating tensors with zeros and ones
- Indexing and concatenating tensors
- Transforming images into tensors for computer vision tasks
- Leveraging GPU acceleration for tensor computations

By mastering these fundamental concepts, you will be well-equipped to build and train deep learning models.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/5a59db15-2490-4be0-a894-4b3d3cc78fac/lesson/9a291e1f-8cd2-49f0-a4bf-e0ca16e0f3f7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/5a59db15-2490-4be0-a894-4b3d3cc78fac/lesson/16e0587e-3aba-47cb-a4b2-8ef26befd39e)**
>
> Practice lab

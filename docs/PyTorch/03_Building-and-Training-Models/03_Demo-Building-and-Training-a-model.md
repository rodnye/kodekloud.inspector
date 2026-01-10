# Demo Building and Training a model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Building-and-Training-Models/Demo-Building-and-Training-a-model)

---

## Table of Contents

- Demo Building and Training a model
  - Building a Simple Neural Network in PyTorch
  - Passing Data Through Layers
  - Demonstrating the Effect of ReLU Activation
  - Mimicking a Full Forward Pass
  - Inspecting Model Parameters
  - Defining Loss Functions and Optimizers
  - Preparing the Dataset and DataLoader
  - Creating an Image Classification Neural Network
  - Training and Validation Loop
  - Final Thoughts on Training
  - Watch Video
  - Practice Lab

---

## Content

PyTorch

Building and Training Models

# Demo Building and Training a model

Congratulations on reaching this point! In this guide, we will explore how to build and train a machine learning model by constructing a simple neural network using PyTorch. We will cover the following topics:

- Building a neural network with PyTorch
- Passing data through network layers and observing changes in tensor dimensions
- Demonstrating the effect of ReLU activation
- Executing a full forward pass
- Inspecting model parameters
- Setting up loss functions and optimizers
- Preparing datasets and dataloaders
- Creating an image classification network
- Implementing training and validation loops

Let's dive in!

---

## Building a Simple Neural Network in PyTorch

In PyTorch, you can construct a neural network by defining a class that inherits from `nn.Module`. Typically, this class includes an `__init__` method to define the layers and a `forward` method that outlines how data flows through these layers.

Below is an example of a simple neural network class, `SimpleNeuralNetwork`. This model contains an input layer, a hidden layer, and an output layer, all implemented as linear layers. To introduce non-linearity, a ReLU activation is applied after the input and hidden layers.

```
import torch
import torch.nn as nn

# Create a simple neural network class
class SimpleNeuralNetwork(nn.Module):
    def __init__(self):
        super(SimpleNeuralNetwork, self).__init__()  # Initialize superclass to set up modules
        # Define the layers: input, hidden, and output layers
        self.input_layer = nn.Linear(10, 20)   # Input: 10 features -> 20 features
        self.hidden_layer = nn.Linear(20, 15)  # Hidden: 20 features -> 15 features
        self.output_layer = nn.Linear(15, 1)   # Output: 15 features -> 1 feature

        # Define the activation function to introduce non-linearity
        self.activation = nn.ReLU()

    def forward(self, x):
        x = self.activation(self.input_layer(x))  # Pass through input layer + activation
        x = self.activation(self.hidden_layer(x))   # Pass through hidden layer + activation
        x = self.output_layer(x)                    # Output layer (no activation)
        return x

# Demonstrate our model with an example tensor
example_tensor = torch.rand(5, 10)  # Batch of 5 samples, each with 10 features
print("Input Tensor Size:", example_tensor.size())
```

In this snippet, we create a random tensor and print its dimensions (\[5, 10\]), representing a batch of 5 samples with 10 features each.

---

## Passing Data Through Layers

It is helpful to mimic the forward pass through each layer individually to observe how the tensor dimensions transform through the network. The following code snippet demonstrates this process step-by-step:

```
# Pass example_tensor through the input layer
input_layer = nn.Linear(10, 20)
input_linear_example = input_layer(example_tensor)
print("After Input Layer:", input_linear_example.size())  # Expected output: [5, 20]

# Pass the result through the hidden layer
hidden_layer = nn.Linear(20, 15)
hidden_linear_example = hidden_layer(input_linear_example)
print("After Hidden Layer:", hidden_linear_example.size())  # Expected output: [5, 15]

# Pass the result through the output layer
output_layer = nn.Linear(15, 1)
output_linear_example = output_layer(hidden_linear_example)
print("After Output Layer:", output_linear_example.size())  # Expected output: [5, 1]
```

The transformation of features is as follows:

- 10 to 20 after the input layer.
- 20 to 15 after the hidden layer.
- 15 to 1 after the output layer, representing the model’s final prediction.

---

## Demonstrating the Effect of ReLU Activation

The ReLU activation function zeros out negative values, adding non-linearity to the model. Here’s how you can examine the effect of the ReLU activation:

```
# Display output before applying ReLU activation
print("Output before ReLU:", output_linear_example)
print("Output size before ReLU:", output_linear_example.size())

# Apply the ReLU activation function
activation_relu_example = nn.ReLU()(output_linear_example)
print("Output after ReLU:", activation_relu_example)
```

> [!important]
> **Note**
>
> The ReLU function is used to prevent the network from learning only linear relationships, which is essential for handling complex data patterns.

---

## Mimicking a Full Forward Pass

To observe how data flows from input to output in one full forward pass, we can simulate the process and print both the input and the final output:

```
# Here, we reuse the output from our previous output_layer demonstration
output = output_layer(hidden_linear_example)

print("Example Tensor:")
print(example_tensor)
print("\nOutput Tensor:")
print(output)
```

This example illustrates how data transitions from a batch of 5 samples with 10 features each to an output with a single predicted feature.

---

## Inspecting Model Parameters

Each layer of the neural network has associated weights and biases which are updated during training. You can inspect these parameters as shown below:

```
# Initialize the model instance
model = SimpleNeuralNetwork()

# Loop through the parameters in a human-readable format
for name, param in model.named_parameters():
    print(f"Layer: {name} | Size: {param.size()} | Values (first two elements): {param.flatten()[:2]}\n")
```

This loop prints the names, sizes, and the first two values of each parameter, allowing you to verify that the network's structure is as expected.

Alternatively, you can print all parameters without their names:

```
# Display parameters in a less descriptive format
for param in model.parameters():
    print(param)
```

---

## Defining Loss Functions and Optimizers

Loss functions measure the discrepancy between the model’s predictions and the true labels, and optimizers adjust model parameters to minimize this loss. PyTorch provides built-in support for various loss functions and optimizers.

```
import torch.optim as optim
import torch.nn as nn

# Create an instance of the loss function for classification tasks
criterion = nn.CrossEntropyLoss()  # Suitable for classification tasks

# Create an optimizer instance and pass in the model parameters
optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
```

The learning rate and momentum settings help tune the training process efficiently.

---

## Preparing the Dataset and DataLoader

For training, we will use the FashionMNIST dataset. We first define a set of transformations to normalize the image data, then create dataloaders for both training and validation.

```
import torch
import torchvision
from torchvision import datasets, transforms

# Define transforms: convert images to tensors and normalize them
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Training dataset and dataloader
train_dataset = datasets.FashionMNIST(root='./data', train=True, download=True, transform=transform)
train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=32, shuffle=True, num_workers=1)

# Validation dataset and dataloader
val_dataset = datasets.FashionMNIST(root='./data', train=False, download=True, transform=transform)
val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=32, shuffle=False, num_workers=1)
```

These dataloaders manage the batching of data and feed it to the model during both training and validation phases.

---

## Creating an Image Classification Neural Network

Below is an example that illustrates how to set up an image classification neural network. This example uses a simple structure similar to our previous model. In real scenarios, convolutional networks are more appropriate for image data.

> [!important]
> **Note**
>
> For demonstration, we will reuse our `SimpleNeuralNetwork` class. In practice, you would define a convolutional architecture for image classification tasks.

To set up your device (CPU or GPU) and instantiate the model:

```
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# For demonstration, we reuse the SimpleNeuralNetwork class
model = SimpleNeuralNetwork().to(device)
print(model)
```

Next, define your loss function and optimizer as before:

```
import torch.optim as optim

criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)
```

---

## Training and Validation Loop

Implementing a robust training loop is essential for model development. During each epoch, the loop performs the following steps:

1.  Sets the model to training mode.
2.  Executes a forward pass and computes the loss.
3.  Performs a backward pass to calculate gradients.
4.  Updates the model parameters using the optimizer.
5.  Evaluates performance on the validation dataset.

Here is an example training loop that runs for 3 epochs:

```
N_EPOCHS = 3

for epoch in range(N_EPOCHS):  # Loop over the dataset multiple times
    # ------------- TRAINING ----------------
    training_loss = 0.0  # Initialize the training loss for the epoch
    model.train()  # Set model to training mode

    # Loop over training data in batches
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        optimizer.zero_grad()  # Clear gradients

        outputs = model(inputs)  # Forward pass: compute predictions
        loss = criterion(outputs, labels)  # Calculate loss
        loss.backward()  # Backward pass: compute gradients
        optimizer.step()  # Update model parameters

        training_loss += loss.item()  # Accumulate training loss

    # ------------- VALIDATION ----------------
    val_loss = 0.0  # Initialize the validation loss for the epoch
    model.eval()  # Set model to evaluation mode
    with torch.no_grad():  # Disable gradient computation for validation
        for inputs, labels in val_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            val_loss += loss.item()

    # Print average loss for training and validation phases per epoch
    print(f"Epoch: {epoch} Train Loss: {training_loss/len(train_loader):.4f} Val Loss: {val_loss/len(val_loader):.4f}")
```

Key details to note:

- The model is set to training (`model.train()`) and evaluation (`model.eval()`) modes appropriately.
- Gradients are reset using `optimizer.zero_grad()` at the beginning of each batch.
- The validation phase is accelerated by disabling gradient computations with `torch.no_grad()`.
- Losses are accumulated and averaged per epoch to provide clear feedback during training.

---

## Final Thoughts on Training

During the training process, monitoring both the training and validation losses is essential. If both decrease, the model is likely learning well. However, a significant disparity—where training loss decreases while validation loss remains stagnant or increases—might indicate overfitting.

In this guide, we walked through constructing and analyzing a simple neural network and an image classification network, inspecting model parameters, setting up the necessary loss functions and optimizers, and implementing an effective training and validation loop.

Happy coding and enjoy building your models!

For more information on neural networks and model training, consider exploring the following resources:

- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
- [Deep Learning with PyTorch](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html)
- [FashionMNIST Dataset](https://github.com/zalandoresearch/fashion-mnist)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/b8cb82ae-a284-41d1-8469-7e60705bbab8/lesson/638a0372-15c1-4a36-a17e-8a29e4914f08)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/b8cb82ae-a284-41d1-8469-7e60705bbab8/lesson/8462ddce-ac18-4e06-b701-2d315b1bdc77)**
>
> Practice lab

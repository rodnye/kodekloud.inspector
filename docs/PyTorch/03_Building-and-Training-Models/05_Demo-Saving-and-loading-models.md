# Demo Saving and loading models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Building-and-Training-Models/Demo-Saving-and-loading-models)

---

## Table of Contents

- Demo Saving and loading models
  - Defining a Simple Model
  - Creating a Fake Dataset and Training the Model
  - Saving and Loading the Model Using state_dict
  - Saving and Loading the Entire Model
  - Creating and Using Checkpoints
  - Warm Starting (Transfer Learning)
  - Saving and Loading Across Different Devices
  - Summary
  - Watch Video
    - Saving a Checkpoint
    - Loading from a Checkpoint

---

## Content

PyTorch

Building and Training Models

# Demo Saving and loading models

In this lesson, we explore techniques for saving and loading models in PyTorch. Properly saving your model parameters ensures you can later deploy, share, or continue training models without starting from scratch. We will cover several essential methods, including using state dictionaries, storing the full model, implementing checkpoints, warm starting, and managing device-specific loading.

---

## Defining a Simple Model

First, we define a simple neural network called FakeNet. This network will serve as our working example throughout this guide.

```
import torch.nn as nn
import torch.nn.functional as F


class FakeNet(nn.Module):
    def __init__(self):
        super(FakeNet, self).__init__()
        self.fc1 = nn.Linear(10, 50)
        self.batch_norm = nn.BatchNorm1d(50)
        self.fc2 = nn.Linear(50, 1)


    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.batch_norm(x)
        x = self.fc2(x)
        return x
```

Create an instance of the model and inspect its structure:

```
# Create our model instance
model = FakeNet()
print(model)
```

---

## Creating a Fake Dataset and Training the Model

For demonstration purposes, we generate a synthetic dataset using random tensors and perform a simple training loop. We'll use the Mean Squared Error (MSE) loss function together with the SGD optimizer.

```
import torch
from torch.utils.data import Dataset, DataLoader


class FakeDataset(Dataset):
    def __init__(self, num_samples=1000):
        self.num_samples = num_samples


    def __len__(self):
        return self.num_samples


    def __getitem__(self, idx):
        # Generate random input data with 10 features and a random target value
        x = torch.randn(10)
        y = torch.randn(1)
        return x, y


# Create the dataset and data loader
dataset = FakeDataset(num_samples=1000)
data_loader = DataLoader(dataset, batch_size=32, shuffle=True)


# Define loss function and optimizer
criterion = torch.nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
```

Train the model for five epochs:

```
# Train the model for 5 epochs
N_EPOCHS = 5


for epoch in range(N_EPOCHS):
    running_loss = 0.0
    for i, (inputs, targets) in enumerate(data_loader):
        optimizer.zero_grad()  # Zero the parameter gradients
        outputs = model(inputs)  # Forward pass
        loss = criterion(outputs, targets)
        loss.backward()        # Backward pass and optimize
        optimizer.step()
        running_loss += loss.item()
```

---

## Saving and Loading the Model Using state_dict

PyTorch recommends saving only the model parameters with the state dictionary. This includes the model's weights, biases, and optimizer hyperparameters.

> [!important]
> **Saving Best Practices**
>
> It is generally recommended to save only the state_dict to allow flexibility when modifying the model architecture or optimizer in the future.

Print the state dictionaries for inspection and then save them:

```
# Print model state_dict and optimizer state_dict
print(model.state_dict())
for k, v in model.state_dict().items():
    print(f"Layer Name: {k} Parameters: {v.size()}")


print(optimizer.state_dict())


# Save the state_dicts (using .pt extension for the model)
import torch
torch.save(model.state_dict(), "model_state_dict.pt")
torch.save(optimizer.state_dict(), "optimizer")
```

Later, you can reload the parameters for inference by initializing a new model instance and loading the saved state dictionary:

```
# Initialize a new model instance for inference
new_model = FakeNet()


# Print initial state for comparison
for k, v in new_model.state_dict().items():
    print(f"Layer Name: {k} Parameters: {v}")


# Load the parameters into the new model
new_model.load_state_dict(torch.load("model_state_dict.pt"))


# Verify that the parameters have updated after loading
for k, v in new_model.state_dict().items():
    print(f"Layer Name: {k} Parameters: {v}")
```

Perform inference by setting the model to evaluation mode and passing an example input:

```
# Create a sample input: a batch of one sample with 10 features
sample_input = torch.randn(1, 10)
print(sample_input)


# Set model to evaluation mode and perform inference
new_model.eval()
output = new_model(sample_input)
print(output)
```

---

## Saving and Loading the Entire Model

Another approach is to save the full model object as a Python pickle. Although convenient, this method requires the same class definitions when reloading.

```
# Save the full model object
torch.save(model, "model_full.pt")


# Load the full model
new_modelL = torch.load("model_full.pt")
print(new_modelL)


# Verify inference using the loaded full model
new_modelL.eval()
output = new_modelL(sample_input)
print(output)
```

---

## Creating and Using Checkpoints

Checkpoints allow you to save the full training state, including the model, optimizer, current epoch, and loss. This is essential for resuming training with minimal disruption.

### Saving a Checkpoint

```
import torch


# Dummy epoch and loss for checkpoint demonstration
epoch = 5
loss = 0.05


# Save a checkpoint (using a .tar extension)
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}, f'{epoch}_checkpoint.tar')
```

### Loading from a Checkpoint

Reload the model, optimizer, and training state from a checkpoint:

```
# Re-initialize your model (using the same FakeNet definition)
model = FakeNet()
print(model)


# Load the checkpoint
checkpoint = torch.load('5_checkpoint.tar')
print(checkpoint)  # This displays the checkpoint dictionary contents


# Restore the model and optimizer states from the checkpoint
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])


# Optionally, retrieve the saved loss and epoch values
loss = checkpoint['loss']
epoch = checkpoint['epoch']
print(loss, epoch)
```

Integrate checkpointing into the training loop by saving at specified intervals. For example, save a checkpoint every two epochs:

```
N_EPOCHS = 10


for epoch in range(N_EPOCHS):
    running_loss = 0.0
    for i, (inputs, targets) in enumerate(data_loader):
        optimizer.zero_grad()   # Zero the parameter gradients
        outputs = model(inputs)   # Forward pass
        loss = criterion(outputs, targets)
        loss.backward()         # Backward pass and optimize
        optimizer.step()
        running_loss += loss.item()

    # Save a checkpoint every 2 epochs
    if epoch % 2 == 0:
        torch.save({
            'epoch': epoch,
            'model_state_dict': model.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'loss': loss,
        }, f'training_checkpoint_{epoch}.tar')


# Save the final checkpoint after the last epoch
torch.save({
    'epoch': N_EPOCHS,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss
}, 'training_checkpoint_final.tar')


# Example command to list all checkpoint files on Unix-like systems:
# ls -l training_checkpoint*
```

---

## Warm Starting (Transfer Learning)

Warm starting involves initializing a new model with parameters from a previously trained model. This is particularly useful for transfer learning, where you reuse learned features to speed up convergence on a new task.

```
# Load pre-trained model parameters into a new model instance
new_model.load_state_dict(torch.load('model_state_dict.pt'), strict=False)
print(new_model.state_dict())
```

The `strict=False` parameter ensures that only matching layers are loaded, allowing flexibility when the architectures differ slightly.

---

## Saving and Loading Across Different Devices

PyTorch makes it simple to load models trained on one device (e.g., GPU) onto another (e.g., CPU) by using the `map_location` argument.

```
# Load a model on CPU that was saved on GPU
import torch
model_cpu = torch.load('model_state_dict.pt', map_location='cpu')


# Alternatively, load directly to a GPU device (if available)
model_gpu = torch.load('model_state_dict.pt', map_location='cuda:0')
model_gpu.to('cuda')  # Ensure the model is moved to GPU
model_gpu.eval()


# During inference, both the model and inputs must be on the same device
sample_input = torch.randn(1, 10)
output_gpu = model_gpu(sample_input.to('cuda'))
print(output_gpu)


# Check which device is available
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(device)
```

> [!important]
> **Device Compatibility Reminder**
>
> When using the `map_location` argument, always confirm that both your model and input data reside on the same device to avoid runtime errors.

---

## Summary

This lesson demonstrated various methods for saving and loading PyTorch models, including best practices for using state dictionaries, saving full models, checkpointing, warm starting for transfer learning, and managing device-specific loading. These techniques are fundamental for successful model training, deployment, and reuse.

For further reading, consider exploring:

- [PyTorch Documentation](https://pytorch.org/docs/)
- [Model Persistence in PyTorch](https://pytorch.org/tutorials/beginner/saving_loading_models.html)

Enhance your model management workflows by integrating these saving and loading strategies into your projects. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/b8cb82ae-a284-41d1-8469-7e60705bbab8/lesson/34b3e0de-921b-4b2d-aad4-3467732ea1cf)**
>
> Watch video content

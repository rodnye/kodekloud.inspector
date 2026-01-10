# Project Manage Docker Containers using Docker Clients in Rust - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Building-Command-Line-Tools/Project-Manage-Docker-Containers-using-Docker-Clients-in-Rust)

---

## Table of Contents

- Project Manage Docker Containers using Docker Clients in Rust
  - Setting Up the Project
  - Organizing the Project Structure
  - Designing the CLI with Clap
  - Parsing and Handling CLI Commands
  - Integrating Docker with Bollard
  - Implementing Docker Operations
  - Updating the Main Function for Async Docker Calls
  - Testing the Application
  - Summary
  - Watch Video
    - Setting Up the Docker Client
    - List Containers
    - List Images
    - Start a Container
    - Stop a Container
    - Pull an Image
    - Listing Containers and Images
    - Starting and Stopping a Container
    - Pulling an Image

---

## Content

Rust Programming

Building Command Line Tools

# Project Manage Docker Containers using Docker Clients in Rust

In this guide, we demonstrate how to build a Rust CLI application to manage Docker containers using the Bollard library. We start by creating a new Rust project, adding the required dependencies, and then organizing the code into modular components for maintainability.

---

## Setting Up the Project

First, create a new Rust project with Cargo and name it "mydocker". Open the project directory with your preferred code editor (such as Visual Studio Code). Cargo will automatically create the default project structure.

Next, update your `Cargo.toml` file by adding the following dependencies:

```
[package]
name = "mydocker"
version = "0.1.0"
edition = "2021"


[dependencies]
bollard = "0.18.1"                               # For Docker API integration
clap = { version = "4.5.21", features = ["derive"] }  # For building the CLI
tokio = { version = "1.41.1", features = ["full"] }   # Asynchronous runtime
futures-util = "0.3"                               # Utilities for async programming
```

After saving the file, build the project to ensure everything is set up correctly:

```
cargo build --quiet
```

The build should complete without errors.

---

## Organizing the Project Structure

For a clean and maintainable codebase, we break our code into separate modules:

- **Main File:** The entry point of the application.
- **CLI Module:** Contains the command-line interface definitions.
- **Docker Module:** Handles Docker API interactions.
- **(Optional) Utils Module:** For helper functions (if needed).

Create the modules by executing the following commands:

```
touch src/cli.rs
touch src/docker.rs
```

Then, update `src/main.rs` to include these modules:

```
mod cli;
mod docker;


fn main() {
    println!("Hello, world!");
}
```

Build and run the project to verify the changes:

```
cargo run --quiet
```

---

## Designing the CLI with Clap

We use the Clap crate to define the structure and behavior of our CLI. The intended commands for our application are:

- **List Containers:**  
  `mydocker list containers`
- **List Images:**  
  `mydocker list images`
- **Start a Container:**  
  `mydocker start <container_id>`
- **Stop a Container:**  
  `mydocker stop <container_id>`
- **Pull an Image:**  
  `mydocker pull <image_name>`

Create the CLI module by adding the following code to `src/cli.rs`:

```
use clap::{Parser, Subcommand};


/// The top-level CLI structure for mydocker
#[derive(Parser)]
#[command(name = "mydocker")]
#[command(about = "A minimal Docker CLI built with Rust")]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
}


/// Primary commands for the application
#[derive(Subcommand)]
pub enum Command {
    /// List Docker resources
    List {
        /// Specify the subcommand for listing resources
        #[command(subcommand)]
        list_command: ListCommands,
    },
    /// Start a container
    Start {
        /// The container name or ID
        container_name: String,
    },
    /// Stop a container
    Stop {
        /// The container name or ID
        container_name: String,
    },
    /// Pull a Docker image from the registry
    Pull {
        /// The image name (e.g., nginx:latest)
        image_name: String,
    },
}


/// Subcommands for the list command
#[derive(Subcommand)]
pub enum ListCommands {
    /// List containers
    Containers {
        /// Include stopped containers (default is only running)
        #[arg(short, long)]
        all: bool,
    },
    /// List images
    Images,
}
```

This module defines a nested command structure where the main command "mydocker" branches into available subcommands.

---

## Parsing and Handling CLI Commands

In the main file, update the `main` function to parse the CLI input and handle each command. For now, we're adding temporary command responses which will later integrate asynchronous Docker calls. Replace the contents of `src/main.rs` with the following code:

```
use clap::Parser;
use cli::{Cli, Command, ListCommands};


fn main() {
    // Parse CLI arguments
    let args: Cli = Cli::parse();


    // Temporary command handling before integrating Docker functionality
    match args.command {
        Command::List { list_command } => match list_command {
            ListCommands::Containers { all } => {
                println!("Listing {} containers...", if all { "all" } else { "running" });
            },
            ListCommands::Images => {
                println!("Printing images...");
            },
        },
        Command::Start { container_name } => {
            println!("Starting container: {}", container_name);
        },
        Command::Stop { container_name } => {
            println!("Stopping container: {}", container_name);
        },
        Command::Pull { image_name } => {
            println!("Pulling image: {}", image_name);
        },
    }
}
```

Verify the CLI help message with:

```
cargo run --quiet --help
```

---

## Integrating Docker with Bollard

We now integrate the Bollard crate to interact with the Docker API. Create a Docker client wrapper in `src/docker.rs` that establishes a connection to the Docker daemon using a Unix socket. Note that you may need to adjust the socket path for your system.

### Setting Up the Docker Client

Add the following code to `src/docker.rs`:

```
use bollard::Docker;
use bollard::API_DEFAULT_VERSION;


pub struct DockerClient {
    docker: Docker,
}


impl DockerClient {
    pub fn new() -> Self {
        let docker = Docker::connect_with_unix(
            "/Users/priyadav/.docker/run/docker.sock", // Adjust this path as necessary
            120, // Timeout in seconds
            API_DEFAULT_VERSION,
        )
        .expect("Failed to connect to Docker");
        Self { docker }
    }
}
```

> [!important]
> **Note**
>
> Verify your Docker socket path by running:
>
> docker context inspect
>
> Then, check the "Host" field under "Endpoints".

---

## Implementing Docker Operations

We will now add asynchronous methods to handle various Docker operations. Each method interfaces with Bollard to perform Docker tasks.

### List Containers

Append the following method in the `impl DockerClient` block:

```
use bollard::container::{ListContainersOptions, ContainerSummary};
use std::default::Default;


impl DockerClient {
    pub async fn list_containers(&self, all: bool) -> Result<Vec<ContainerSummary>, bollard::errors::Error> {
        let options: Option<ListContainersOptions<String>> = Some(ListContainersOptions {
            all,
            ..Default::default()
        });
        let containers = self.docker.list_containers(options).await?;
        Ok(containers)
    }
}
```

### List Images

Similarly, add a method to list Docker images:

```
use bollard::image::{ListImagesOptions, ImageSummary};


impl DockerClient {
    pub async fn list_images(&self) -> Result<Vec<ImageSummary>, bollard::errors::Error> {
        let options: Option<ListImagesOptions<String>> = Some(ListImagesOptions {
            all: true,
            ..Default::default()
        });
        let images = self.docker.list_images(options).await?;
        Ok(images)
    }
}
```

### Start a Container

To start a container, include the following method:

```
use bollard::container::StartContainerOptions;


impl DockerClient {
    pub async fn start_container(&self, container_name: &str) -> Result<(), bollard::errors::Error> {
        self.docker
            .start_container(container_name, None::<StartContainerOptions<String>>)
            .await?;
        Ok(())
    }
}
```

### Stop a Container

To stop a running container, add this method:

```
use bollard::container::StopContainerOptions;


impl DockerClient {
    pub async fn stop_container(&self, container_name: &str) -> Result<(), bollard::errors::Error> {
        let options: Option<StopContainerOptions> = Some(StopContainerOptions { t: 30 });
        self.docker.stop_container(container_name, options).await?;
        Ok(())
    }
}
```

### Pull an Image

Finally, to pull a Docker image from a registry:

```
use bollard::image::{CreateImageOptions, CreateImageInfo};
use futures_util::stream::TryStreamExt;


impl DockerClient {
    pub async fn pull_image(&self, image_name: &str) -> Result<(), bollard::errors::Error> {
        let options: Option<CreateImageOptions<&str>> = Some(CreateImageOptions {
            from_image: image_name,
            ..Default::default()
        });
        let mut stream = self.docker.create_image(options, None, None);
        while let Some(msg) = stream.try_next().await? {
            if let Some(status) = msg.status {
                println!("{}", status);
            }
        }
        Ok(())
    }
}
```

---

## Updating the Main Function for Async Docker Calls

Since Docker operations are asynchronous, update the main function to utilize Tokio as the async runtime. Replace the contents of `src/main.rs` with the following code:

```
use clap::Parser;
use cli::{Cli, Command, ListCommands};
use docker::DockerClient;


#[tokio::main]
async fn main() {
    // Parse the CLI input
    let args: Cli = Cli::parse();
    let docker_client = DockerClient::new();


    // Route and handle commands with asynchronous Docker calls
    match args.command {
        Command::List { list_command } => match list_command {
            ListCommands::Containers { all } => {
                println!("Printing containers:");
                match docker_client.list_containers(all).await {
                    Ok(containers) => {
                        for container in containers {
                            println!(
                                "{}\t{}\t{}",
                                container.id.unwrap_or_default(),
                                container.names.unwrap_or_default().join(","),
                                container.status.unwrap_or_default()
                            );
                        }
                    },
                    Err(e) => eprintln!("Error listing containers: {}", e),
                }
            },
            ListCommands::Images => {
                println!("Printing images:");
                match docker_client.list_images().await {
                    Ok(images) => {
                        for image in images {
                            println!("{}\t{}", image.id, image.repo_tags.join(","));
                        }
                    },
                    Err(e) => eprintln!("Error listing images: {}", e),
                }
            },
        },
        Command::Start { container_name } => {
            println!("Starting container: {}", container_name);
            match docker_client.start_container(&container_name).await {
                Ok(_) => println!("Container started successfully"),
                Err(e) => eprintln!("Error starting container: {}", e),
            }
        },
        Command::Stop { container_name } => {
            println!("Stopping container: {}", container_name);
            match docker_client.stop_container(&container_name).await {
                Ok(_) => println!("Container stopped successfully"),
                Err(e) => eprintln!("Error stopping container: {}", e),
            }
        },
        Command::Pull { image_name } => {
            println!("Pulling image: {}", image_name);
            match docker_client.pull_image(&image_name).await {
                Ok(_) => println!("Image pulled successfully"),
                Err(e) => eprintln!("Error pulling image: {}", e),
            }
        },
    }
}
```

---

## Testing the Application

Below are some commands to test the functionality of your CLI tool:

### Listing Containers and Images

- **List Running Containers:**

  ```
  cargo run --quiet -- list containers
  ```

- **List All Containers (including stopped ones):**

  ```
  cargo run --quiet -- list containers --all
  ```

- **List Images:**

  ```
  cargo run --quiet -- list images
  ```

### Starting and Stopping a Container

- **Start a Container:**

  ```
  cargo run --quiet -- start <container_name>
  ```

  > [!important]
  > **Warning**
  >
  > If the container does not exist, you will receive an error similar to:
  >
  > Error starting container: Docker responded with status code 404: No such container: <container_name>

- **Stop a Container:**

  ```
  cargo run --quiet -- stop <container_name>
  ```

### Pulling an Image

- **Pull an Image (e.g., PostgreSQL):**

  ```
  cargo run --quiet -- pull postgres:latest
  ```

During the pull process, you will see real-time status messages from Docker (e.g., "Downloading...", "Download complete", etc.). After completion, the message "Image pulled successfully" confirms a successful operation.

---

## Summary

In this article, we built a Rust-based Docker CLI tool that:

- Lists Docker containers and images.
- Starts and stops containers.
- Pulls images from a Docker registry.

We leveraged Cargo for project management, Clap for CLI parsing, Tokio for asynchronous execution, and Bollard for Docker API integration. The modular design of this application makes it easy to extend the tool with additional functionalities in the future.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/bb7ae445-2739-4b78-a1f2-e30c0b7944e3/lesson/c5c8c607-696c-4114-b7db-33feef33b563)**
>
> Watch video content

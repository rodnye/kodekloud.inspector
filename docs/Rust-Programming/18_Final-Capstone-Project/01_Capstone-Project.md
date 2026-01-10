# Capstone Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Final-Capstone-Project/Capstone-Project)

---

## Table of Contents

- Capstone Project
  - Functional Requirements
  - Non-functional Requirements
  - High-Level Architecture
  - API Commands
  - Design Considerations
  - Setting Up the Project
  - Networking Layer Implementation
  - Command Parsing
  - Key-Value Store Implementation
  - Persistence Module
  - Testing the Application
  - Watch Video
    - Technology Stack
    - Main Function
    - Handle Client Function

---

## Content

Rust Programming

Final Capstone Project

# Capstone Project

In this article, we demonstrate how to build a lightweight key-value store database with persistent storage and a network interface for client-server communication. This server supports three core operations—GET, SET, and DELETE—while processing multiple client requests concurrently and ensuring that data is not lost during server restarts by persisting it to disk.

---

## Functional Requirements

The primary operations of the database include:

- **GET:** Retrieve the value associated with a specified key.
- **SET:** Store or update a key-value pair.
- **DELETE:** Remove a key-value pair.

Data persistence is achieved by writing to disk (using formats like JSON or a custom binary format), ensuring survival through server restarts. The server supports concurrent client connections, robust error handling for invalid commands, malformed requests, and I/O errors, and is designed with extensibility in mind.

![The image outlines functional requirements for a system, including core operations, persistence, concurrency, networking, and error handling. Each section provides specific tasks or features related to the system's functionality.](https://kodekloud.com/kk-media/image/upload/v1752883888/notes-assets/images/Rust-Programming-Capstone-Project/functional-requirements-system-outline.jpg)

---

## Non-functional Requirements

- **Performance:** Handle a moderate number of concurrent client connections.
- **Reliability:** Ensure data integrity through robust error handling and periodic snapshots.
- **Simplicity:** Utilize a minimal and easy-to-understand design.
- **Security:** Validate inputs to safely manage malicious or malformed requests.

---

## High-Level Architecture

The system is organized into several key components:

1.  **Networking Layer:** Manages incoming TCP connections using an asynchronous runtime (e.g., Tokio).
2.  **Command Parser:** Transforms raw client input into validated and structured commands.
3.  **Core Key-Value Store:** Maintains an in-memory data structure with thread-safe access.
4.  **Persistence Module:** Persists snapshots of the in-memory data to disk and reloads them on startup.
5.  **Command Execution Engine:** Processes the commands by interfacing with both the key-value store and the persistence module.

![The image outlines the high-level architecture of a system, detailing key components such as the Networking Layer, Command Parser, Core Key-Value Store, Persistence Module, and Command Execution Engine, along with their functions.](https://kodekloud.com/kk-media/image/upload/v1752883889/notes-assets/images/Rust-Programming-Capstone-Project/system-architecture-key-components-diagram.jpg)

Error handling spans across network, file, I/O, and command-related errors for graceful operation. The typical data flow in the system is as follows:

1.  A client sends a command (e.g., GET, SET, DELETE) over TCP.
2.  The networking layer reads the incoming request asynchronously.
3.  The command parser converts the raw input into a structured command.
4.  The command execution engine processes the command against the key-value store.
    - For **SET** and **DELETE**, changes are applied in-memory and immediately persisted to disk.
5.  A response such as "OK", "ERROR", or the retrieved value is sent back to the client.

---

## API Commands

The server supports the following commands:

- **GET key**  
  Retrieves the value associated with the specified key.
- **SET key value**  
  Stores the provided key-value pair. The server responds with "OK" upon success.
- **DELETE key**  
  Removes the key-value pair, returning "OK" on successful deletion.

For unrecognized commands, the server replies with an error message.

Example interaction:

```
Request:
SET myKey myValue
Response:
OK
```

---

## Design Considerations

Key design aspects of this project include:

- **Thread Safety:** Utilize mutexes to manage concurrent read/write operations securely.
- **Data Durability:** Persist updates immediately to disk and perform periodic snapshots.
- **Error Handling:** Provide descriptive errors for invalid or malformed inputs.
- **Scalability:** Process multiple client requests concurrently using asynchronous programming.

![The image outlines four key design considerations: Thread Safety, Data Durability, Error Handling, and Scalability, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752883890/notes-assets/images/Rust-Programming-Capstone-Project/design-considerations-thread-safety-durability.jpg)

### Technology Stack

| Component     | Use Case                                    | Example           |
| ------------- | ------------------------------------------- | ----------------- |
| Async Runtime | Asynchronous I/O for handling connections   | Tokio             |
| Networking    | TCP networking for client-server connection | tokio::net        |
| Serialization | Data serialization to persist data          | Serde, Serde JSON |

![The image lists a technology stack including "Async Runtime" with "tokio," "TCP Networking" with "tokio::net," and "Serialization" with "serde and serde_json."](https://kodekloud.com/kk-media/image/upload/v1752883890/notes-assets/images/Rust-Programming-Capstone-Project/async-runtime-tcp-networking-serialization.jpg)

For more details on these technologies, refer to [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

---

## Setting Up the Project

Begin by creating a new Rust project using Cargo. Update your `Cargo.toml` file with the necessary dependencies:

```
[package]
name = "kv_store"
version = "0.1.0"
edition = "2021"


[dependencies]
tokio = { version = "1.28.0", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
anyhow = "1.0.94"
```

The `anyhow` crate simplifies error handling using trait object–based error types.

---

## Networking Layer Implementation

The networking layer handles incoming TCP connections concurrently. The code below shows the main server logic along with the client-handling function.

### Main Function

```
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::net::{TcpListener, TcpStream};
use std::net::SocketAddr;
use std::sync::Arc;
use anyhow::Result;
mod command;
mod store;
mod persistence;
use store::KeyValueStore;
use command::Command;


#[tokio::main]
async fn main() -> Result<()> {
    let listener = TcpListener::bind("127.0.0.1:6379").await?;
    println!("Server listening on port 6379");


    // Initialize the key-value store wrapped in an Arc for shared ownership.
    let store = Arc::new(KeyValueStore::new());
    // Load persisted data (if any) from disk.
    store.load("data.json").await?;


    // Spawn a background task to handle graceful shutdown on Ctrl+C.
    {
        let store_clone = store.clone();
        tokio::spawn(async move {
            tokio::signal::ctrl_c().await.unwrap();
            store_clone.save("data.json").await.unwrap();
            std::process::exit(0);
        });
    }


    // Accept incoming connections.
    loop {
        let (socket, addr): (TcpStream, SocketAddr) = listener.accept().await?;
        println!("New client: {:?}", addr);
        let store_clone = store.clone();


        tokio::spawn(async move {
            if let Err(e) = handle_client(socket, store_clone).await {
                eprintln!("Error handling client ({:?}): {:?}", addr, e);
            }
        });
    }
}
```

### Handle Client Function

```
async fn handle_client(socket: TcpStream, store: Arc<KeyValueStore>) -> Result<()> {
    let (reader, mut writer) = socket.into_split();
    let mut reader = BufReader::new(reader);
    let mut line = String::new();


    loop {
        line.clear();
        let bytes_read = reader.read_line(&mut line).await?;
        if bytes_read == 0 {
            // Connection closed
            break;
        }


        println!("Received: {}", line.trim());
        let command = Command::parse(&line);


        match command {
            Command::Get(key) => {
                if let Some(value) = store.get(&key).await {
                    writer.write_all(format!("VALUE {}\n", value).as_bytes()).await?;
                } else {
                    writer.write_all(b"ERROR Key not found\n").await?;
                }
            }
            Command::Set(key, value) => {
                store.set(key, value).await?;
                writer.write_all(b"OK\n").await?;
            }
            Command::Delete(key) => match store.delete(&key).await {
                Ok(true) => writer.write_all(b"OK\n").await?,
                Ok(false) => writer.write_all(b"ERROR Key not found\n").await?,
                Err(e) => writer.write_all(format!("ERROR {}\n", e).as_bytes()).await?,
            },
            Command::Unknown => {
                writer.write_all(b"ERROR Unknown Command\n").await?;
            }
        }
    }


    Ok(())
}
```

In this implementation, each accepted TCP connection is processed asynchronously by spawning a new task. The server reads incoming data line by line using a buffered reader, parses the commands, executes them against the key-value store, and sends back the response.

---

## Command Parsing

The command parser converts raw string inputs into structured commands for the system to process. Create a file named `command.rs` with the following content:

```
#[derive(Debug)]
pub enum Command {
    Get(String),
    Set(String, String),
    Delete(String),
    Unknown,
}


impl Command {
    pub fn parse(input: &str) -> Command {
        let parts: Vec<&str> = input.trim().splitn(3, ' ').collect();
        match parts.as_slice() {
            ["GET", key] => Command::Get(key.to_string()),
            ["SET", key, value] => Command::Set(key.to_string(), value.to_string()),
            ["DELETE", key] => Command::Delete(key.to_string()),
            _ => Command::Unknown,
        }
    }
}
```

This parser splits the input into at most three parts (command, key, and value) and then maps them to the corresponding command variant.

---

## Key-Value Store Implementation

The in-memory key-value store is implemented using Rust’s asynchronous mutex for safe concurrency. Create a file named `store.rs` with the following code:

```
use std::collections::HashMap;
use tokio::sync::Mutex;
use anyhow::Result;


#[derive(Debug, Default)]
pub struct KeyValueStore {
    // The map is wrapped in a Mutex to allow safe concurrent access.
    pub map: Mutex<HashMap<String, String>>,
}


impl KeyValueStore {
    pub fn new() -> Self {
        Self {
            map: Mutex::new(HashMap::new()),
        }
    }


    pub async fn get(&self, key: &str) -> Option<String> {
        let map = self.map.lock().await;
        map.get(key).cloned()
    }


    // The set method takes ownership of both key and value.
    // It uses a separate scope to release the lock before saving the updated state.
    pub async fn set(&self, key: String, value: String) -> Result<()> {
        {
            let mut map = self.map.lock().await;
            map.insert(key, value);
        }
        self.save("data.json").await?;
        Ok(())
    }


    // The delete method performs removal and saves the state if the key existed.
    pub async fn delete(&self, key: &str) -> Result<bool> {
        let removed = {
            let mut map = self.map.lock().await;
            map.remove(key).is_some()
        };


        if removed {
            self.save("data.json").await?;
        }
        Ok(removed)
    }

    // The load and save methods are extended in the persistence module.
}
```

---

## Persistence Module

To ensure data durability between server restarts, create a file named `persistence.rs`. This module extends `KeyValueStore` with methods to load from and save data to disk using JSON serialization with asynchronous file I/O provided by Tokio.

```
use crate::store::KeyValueStore;
use serde::{Deserialize, Serialize};
use tokio::fs;
use std::path::Path;
use anyhow::Result;


#[derive(Serialize, Deserialize)]
struct PersistentData {
    data: Vec<(String, String)>,
}


impl KeyValueStore {
    pub async fn load(&self, path: &str) -> Result<()> {
        if Path::new(path).exists() {
            let content = fs::read_to_string(path).await?;
            let persistent_data: PersistentData = serde_json::from_str(&content)?;
            let mut map = self.map.lock().await;
            map.extend(persistent_data.data);
        }
        Ok(())
    }


    pub async fn save(&self, path: &str) -> Result<()> {
        // Create a snapshot without holding the lock across await points.
        let data = {
            let map = self.map.lock().await;
            PersistentData {
                data: map.iter().map(|(k, v)| (k.clone(), v.clone())).collect(),
            }
        };
        let content = serde_json::to_string(&data)?;
        fs::write(path, content).await?;
        Ok(())
    }
}
```

The load method checks if the target file exists. If it does, the file is read and the JSON content is parsed to populate the in-memory store. In contrast, the save method creates a snapshot of the current state and writes it to disk without holding any locks across asynchronous calls.

---

## Testing the Application

After running the application with:

```
cargo run --quiet
```

you can test the server using Telnet:

1.  Connect to the server:

    ```
    telnet localhost 6379
    ```

2.  Use these commands to interact with the server:
    - `GET x` → Expected response: `ERROR Key not found`
    - `SET x 100` → Expected response: `OK`
    - `GET x` → Expected response: `VALUE 100`
    - `DELETE x` → Expected response: `OK`
    - For an unknown command like `FOO`, the server replies with `ERROR Unknown Command`

Data persistence is verified by checking that a `data.json` file is created and properly populated. Restarting the server will reload the stored keys automatically.

Example content of `data.json` after some operations:

```
{"data":[["y","500"],["x","900"]]}
```

A sample Telnet session might look like this:

```
Connected to localhost.
Escape character is '^]'.
GET y
VALUE 500
GET x
VALUE 900
DELETE z
ERROR Key not found
DELETE x
OK
DELETE y
```

When you terminate the program with Ctrl+C, the server saves the current state to disk, allowing for a seamless restart.

---

> [!important]
> **Note**
>
> Congratulations! You have successfully implemented a robust key-value store with comprehensive networking, command parsing, thread-safe in-memory storage, and persistence. This project demonstrates key Rust programming principles and asynchronous programming using Tokio.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/fcc41d3c-3eb4-41f5-bd8d-501517eac874/lesson/7ac32daf-a528-4e6f-8f22-4995e4888e71)**
>
> Watch video content

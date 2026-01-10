# Project Networked File Transfer Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Rust-Programming/Network-Programming-and-File-Handling/Project-Networked-File-Transfer-Application)

---

## Table of Contents

- Project Networked File Transfer Application
  - Application Features
  - Core Components
  - Client Execution Flow
  - Server Execution Flow
  - File Transfer Details
  - Libraries and Tools
  - Code Walkthrough
  - Running the Application
  - Summary
  - Watch Video
    - Server
    - Client
    - Project Setup
    - Server Code
    - Client Code

---

## Content

Rust Programming

Network Programming and File Handling

# Project Networked File Transfer Application

In this article, we explain how to build a simple networked file transfer tool—a basic client-server application using Rust. The client reads a file in chunks and sends it to the server over a TCP connection. The server reassembles these chunks, writes them to disk, and acknowledges the successful file transfer.

![The image is a flowchart illustrating the interaction between a user, client, and server, detailing steps like providing a file path, connecting to the server, and sending file chunks.](https://kodekloud.com/kk-media/image/upload/v1752883937/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/user-client-server-flowchart.jpg)

## Application Features

- **TCP Communication**: Uses TCP sockets to establish reliable client-server communication.
- **File Transfer**: Transfers a single file from the client to the server.
- **File Path Input**: The client prompts the user to input the absolute file path of the file to send.
- **Error Handling**: Implements basic error handling during connection setup and file transfer.

![The image outlines four features: TCP Communication, File Transfer, File Path Input, and Error Handling, each with a brief description.](https://kodekloud.com/kk-media/image/upload/v1752883938/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/tcp-communication-file-transfer-features.jpg)

## Core Components

### Server

The server component consists of a TCP listener that binds to a specified port, accepts client connections, reads file chunks, and writes them to disk. Once the entire file is received, the server sends an acknowledgment back to the client.

![The image outlines the core components of a server, including a TCP listener, accepting connections, and file saving. Each component is briefly described in terms of its function.](https://kodekloud.com/kk-media/image/upload/v1752883939/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/server-core-components-tcp-listener.jpg)

### Client

The client takes user input for the file path, connects to the server via TCP, reads the file in manageable chunks, and sends these chunks to the server. It includes error handling and waits for the server's acknowledgment before closing the connection.

![The image outlines the core components of a client system, detailing user input, TCP connection, and file reading processes.](https://kodekloud.com/kk-media/image/upload/v1752883940/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/client-system-core-components-diagram.jpg)

## Client Execution Flow

1.  Prompt the user for the absolute file path.
2.  Establish a TCP connection to the server.
3.  Open the file and read it in fixed-size chunks (e.g., 1024 bytes).
4.  Send each file chunk to the server.
5.  Wait for the server's acknowledgment after transmitting all chunks.
6.  Close the TCP connection.

![The image is a flowchart titled "Client Execution Flow," detailing steps for a client application to transfer a file, including prompting for a file path, connecting to a server, reading and sending file chunks, and acknowledging completion.](https://kodekloud.com/kk-media/image/upload/v1752883941/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/client-execution-flowchart-file-transfer.jpg)

## Server Execution Flow

1.  The server listens on a predefined TCP port.
2.  It accepts incoming connections from clients.
3.  It reads the file chunks sent by the client and writes them to disk.
4.  After receiving the complete file, the server sends an acknowledgment back to the client.
5.  The connection is then closed.

![The image illustrates a server execution flow, detailing steps such as listening for connections, accepting client connections, receiving files in chunks, and sending acknowledgments.](https://kodekloud.com/kk-media/image/upload/v1752883943/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/server-execution-flow-diagram.jpg)

## File Transfer Details

The file transfer is optimized for large files by reading and sending data in chunks. If a file with the same name already exists on the server, it will be overwritten.

![The image explains file transfer details, highlighting chunk size for efficient file handling and file overwrite behavior when a file with the same name exists.](https://kodekloud.com/kk-media/image/upload/v1752883944/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/file-transfer-chunk-size-overwrite.jpg)

## Libraries and Tools

This project leverages several Rust standard libraries and tools:

- **std::net::TcpListener and TcpStream**: For establishing and managing TCP connections.
- **std::fs::File**: For file operations such as reading and writing.
- **std::io::{Read, Write}**: For handling data input/output.
- **std::io::stdin**: For managing standard input.

![The image lists libraries and tools related to networking and file operations, alongside an illustration of connected devices.](https://kodekloud.com/kk-media/image/upload/v1752883945/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/networking-file-operations-tools.jpg)

## Code Walkthrough

Below is a step-by-step walkthrough of the server and client code for our file transfer application.

### Project Setup

1.  Create a new Rust project by executing the following command in your project directory:

    ```
    cargo new tcp_file_transfer
    ```

2.  Inside the `src` directory, create a new folder named `bin` and add two files: `client.rs` and `server.rs`. This separation keeps the server and client logic distinct.

### Server Code

The following code demonstrates the server functionality, including error handling and proper chunked file writing:

```
use std::fs::File;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;


fn handle_client(mut stream: TcpStream) -> std::io::Result<()> {
    // Create a new file to store the incoming data
    let mut file = File::create("received_file.txt")?;
    let mut buffer = [0u8; 1024]; // 1 KB buffer


    loop {
        // Read data from the stream into the buffer
        match stream.read(&mut buffer) {
            Ok(0) => {
                // End-of-file reached; client closed the connection
                println!("End of file reached, client closed the connection.");
                break;
            }
            Ok(bytes_read) => {
                println!("Received {} bytes", bytes_read);
                file.write_all(&buffer[..bytes_read])?;
            }
            Err(e) => {
                eprintln!("Error reading from stream: {}", e);
                break;
            }
        }
    }


    // Send an acknowledgment back to the client
    println!("File received successfully.");
    match stream.write_all(b"Transfer complete") {
        Ok(_) => println!("Sent acknowledgment to the client."),
        Err(e) => eprintln!("Error sending acknowledgment: {}", e),
    }
    Ok(())
}


fn start_server() -> std::io::Result<()> {
    // Bind the server to localhost on port 8080
    let listener = TcpListener::bind("127.0.0.1:8080")?;
    println!("Server listening on port 8080...");


    // Accept and handle incoming client connections
    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(move || {
                    if let Err(e) = handle_client(stream) {
                        eprintln!("Error handling client: {}", e);
                    }
                });
            }
            Err(e) => {
                eprintln!("Error accepting connection: {}", e);
            }
        }
    }
    Ok(())
}


fn main() -> std::io::Result<()> {
    start_server()
}
```

### Client Code

The client code prompts the user for the file path, reads the file in chunks, sends each chunk to the server, and waits for an acknowledgment upon completion.

```
use std::fs::File;
use std::io::{self, Read, Write};
use std::net::{TcpStream, Shutdown};
use std::process;


fn get_file_path_from_user() -> String {
    println!("Please enter the absolute path of the file to send:");
    let mut file_path = String::new();
    io::stdin()
        .read_line(&mut file_path)
        .expect("Failed to read line");
    file_path.trim().to_string()
}


fn send_file(file_path: &str) -> io::Result<()> {
    // Open the specified file
    let mut file = File::open(file_path)?;
    // Connect to the server at localhost:8080
    let mut stream = TcpStream::connect("127.0.0.1:8080")?;
    println!("Connected to server at 127.0.0.1:8080");


    let mut buffer = [0u8; 1024]; // 1 KB buffer for file data
    loop {
        let bytes_read = match file.read(&mut buffer) {
            Ok(0) => break, // End-of-file reached
            Ok(n) => n,
            Err(e) => {
                eprintln!("Error reading file: {}", e);
                return Err(e);
            }
        };


        stream.write_all(&buffer[..bytes_read])?;
    }


    // Signal to the server that no more data will be sent
    stream.shutdown(Shutdown::Write)?;


    // Read and display the server's acknowledgment
    let mut response = [0u8; 1024];
    match stream.read(&mut response) {
        Ok(bytes_read) => {
            println!("{}", String::from_utf8_lossy(&response[..bytes_read]));
        }
        Err(e) => {
            eprintln!("Error reading acknowledgment: {}", e);
        }
    }
    Ok(())
}


fn main() {
    let file_path = get_file_path_from_user();
    if let Err(e) = send_file(&file_path) {
        eprintln!("File transfer failed: {}", e);
        process::exit(1);
    }
}
```

## Running the Application

1.  **Build the Project**

    Run the following command to build the project:

    ```
    cargo build
    ```

2.  **Run the Server**

    Open a terminal and run the server with:

    ```
    cargo run --quiet --bin server
    ```

    You should see output like:

    ```
    Server listening on port 8080...
    ```

3.  **Run the Client**

    Open another terminal and run the client with:

    ```
    cargo run --quiet --bin client
    ```

    When prompted, enter the absolute file path of the file to send. An example interaction is shown below:

    ```
    Please enter the absolute path of the file to send:
    /Users/yourname/projects/tcp_file_transfer/temp.txt
    Connected to server at 127.0.0.1:8080
    Transfer complete
    ```

On the server terminal, you will see logs detailing each received chunk, the end-of-file notification, and the acknowledgment status.

```
cargo run --quiet --bin server
Server listening on port 8080...
Received 1024 bytes
Received 1024 bytes
Received 1024 bytes
Received 960 bytes
End of file reached, client closed the connection.
File received successfully.
Sent acknowledgment to the client.
```

## Summary

In this article, we built a networked file transfer application using Rust and TCP sockets. The client reads a file in chunks and sends it to the server, which writes the chunks to disk and sends back an acknowledgment upon successful completion.

> [!important]
> **Extend the Project**
>
> This basic application can be extended with features such as file compression, encryption, or support for transferring multiple files concurrently.

![The image is a summary slide outlining the creation of a network file transfer app using TCP sockets, detailing the process of file transfer in chunks, and learning file handling and networking with Rust.](https://kodekloud.com/kk-media/image/upload/v1752883946/notes-assets/images/Rust-Programming-Project-Networked-File-Transfer-Application/network-file-transfer-app-rust.jpg)

We hope you enjoyed building this project and learning about networked file transfers with Rust!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/rust/module/5b50abd7-c86a-4458-a1a3-90a7ebb3d776/lesson/a515805e-584d-4275-9fbb-709273aae979)**
>
> Watch video content

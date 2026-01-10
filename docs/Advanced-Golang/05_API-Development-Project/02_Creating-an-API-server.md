# Creating an API server - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Creating-an-API-server)

---

## Table of Contents

- Creating an API server
  - Step 1: Setting Up the Project
  - Step 2: Exploring the HTTP Package
  - Step 3: Registering Handlers
  - Step 4: Starting the HTTP Server
  - Step 5: Creating the Homepage Endpoint
  - Complete Example
  - Conclusion
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Creating an API server

In this guide, we will build a RESTful API server using Go. Follow along as we create a simple server, register endpoints, and serve HTTP requests using Go's built-in "net/http" package.

## Step 1: Setting Up the Project

Start by creating a file named `main.go`. Define your package and main function as shown below:

```
package main

func main() {
}
```

A quick terminal prompt may look like:

```
Desktop/kodekloud/learn via 🐹 v1.19.3
```

## Step 2: Exploring the HTTP Package

To familiarize yourself with the HTTP package, you can use a command-line utility (in our case, "KodeKloud http") to locate relevant documentation:

```
Desktop/codeccloud/learn via 🐱 v1.19.3
> go doc
```

The HTTP package provides both client and server implementations. For example, it includes helper functions:

```
resp, err := http.Get("http://example.com/")
...
resp, err := http.Post("http://example.com/upload", "image/jpeg", &buf)
```

The `ListenAndServe` method initializes an HTTP server. It listens on a specified TCP address and uses a handler to process incoming requests.

## Step 3: Registering Handlers

Below is a sample code snippet that demonstrates how to register handlers for different URL patterns:

```
package main

import (
    "fmt"
    "html"
    "net/http"
)

func main() {
    // Register a handler for the /foo endpoint
    http.Handle("/foo", fooHandler)

    // Register a handler inline for the /bar endpoint
    http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })
}
```

You can see detailed documentation for the `ListenAndServe` function by running:

```
go doc http ListenAndServe
```

This shows that `ListenAndServe` listens on the specified TCP network address and invokes the given handler to serve incoming requests. In cases where the handler is `nil`, the `DefaultServeMux` is used:

```
go doc http DefaultServeMux
```

> [!important]
> **Note**
>
> The `DefaultServeMux` is an HTTP request multiplexer that matches incoming request URLs against registered patterns and invokes the appropriate handler.

## Step 4: Starting the HTTP Server

Initially, set up your HTTP server with a default address (using `localhost` on port `10000`) and a nil handler. Later, you will register your custom endpoints. The basic server code looks like this:

```
import "net/http"

func main() {
    http.ListenAndServe("localhost:10000", nil)
}
```

## Step 5: Creating the Homepage Endpoint

To serve a homepage, register a function via `HandleFunc` that handles requests to the root URL. According to the documentation, `HandleFunc` registers the handler function within the `DefaultServeMux`.

```
import "net/http"

func main() {
    http.HandleFunc("/", homepage)
    http.ListenAndServe("localhost:10000", nil)
}
```

Now, define the `homepage` function. This function accepts an `http.ResponseWriter` and an `*http.Request`. It uses `fmt.Fprintf` to write a formatted response back to the client:

```
func homepage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to homepage")
    fmt.Println("Endpoint hit: homepage")
}

func main() {
    http.HandleFunc("/", homepage)
    http.ListenAndServe("localhost:10000", nil)
}
```

> [!important]
> **How Fprintf Works**
>
> The `fmt.Fprintf` function writes formatted output to a given writer (`w` in this case). It returns the number of bytes written along with any error encountered.

When you run the program using:

```
go run main.go
```

The HTTP server will start on `localhost:10000`. Accessing the homepage in a web browser will display "Welcome to homepage", and the server console logs:

```
Endpoint hit: homepage
```

If you later change the endpoint registration from `/` to `/foo`, only the `/foo` endpoint will be active, demonstrating that only registered endpoints produce an output.

## Complete Example

Below is the full example of a simple API server with a registered homepage endpoint:

```
package main

import (
    "fmt"
    "net/http"
)

func homepage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome to homepage")
    fmt.Println("Endpoint hit: homepage")
}

func main() {
    // Register the homepage handler at the "/foo" endpoint
    http.HandleFunc("/foo", homepage)
    http.ListenAndServe("localhost:10000", nil)
}
```

Run the server with:

```
go run main.go
```

Expected console output upon hitting the endpoint:

```
Endpoint hit: homepage
```

## Conclusion

You have successfully set up a basic RESTful API server in Go. You now know how to register handlers, serve endpoints, and use Go's HTTP package effectively.

In future lessons, we will add more functionalities and expand our API by introducing additional endpoints and middleware.

![The image shows a web browser displaying a page with the text "Welcome to homepage" on a black background. The URL in the address bar is "localhost:10000/foo".](https://kodekloud.com/kk-media/image/upload/v1752868676/notes-assets/images/Advanced-Golang-Creating-an-API-server/welcome-homepage-black-background.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/9b33b9fd-f321-4bc2-bcfe-89921a91ee98)**
>
> Watch video content

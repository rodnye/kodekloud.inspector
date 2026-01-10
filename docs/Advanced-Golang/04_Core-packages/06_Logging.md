# Logging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/Core-packages/Logging)

---

## Table of Contents

- Logging
  - Why Logging Matters
  - What Should Be Logged?
  - The Built-in Log Package
  - Using the Built-in Log Package
  - Logging to a File
  - Using Logrus
  - Watch Video

---

## Content

Advanced Golang

Core packages

# Logging

[Golang](https://learn.kodekloud.com/user/courses/golang) offers built-in logging capabilities along with support for third-party frameworks, allowing developers to implement robust logging solutions efficiently. In this article, we review the built-in log package and then explore a popular third-party logging framework: Logrus.

## Why Logging Matters

Logging is a critical aspect of application development and maintenance. It helps to:

- Identify and debug issues.
- Uncover performance bottlenecks.
- Conduct post-mortem analyses after outages or security incidents.

## What Should Be Logged?

At a minimum, every log entry should include:

- A timestamp indicating when the event took place.
- The log level (such as debug, error, or info).
- Contextual information to facilitate issue diagnosis.

## The Built-in Log Package

The Go standard library includes a basic log package. While it does not offer multiple log levels (like debug, warn, or error), it provides the essentials needed for a simple logging strategy—especially useful during local development when quick feedback is preferred over complex, structured logging.

![The image is a slide discussing the Go programming language's built-in log package, highlighting its basic logging features and suitability for local development.](https://kodekloud.com/kk-media/image/upload/v1752868728/notes-assets/images/Advanced-Golang-Logging/go-log-package-features-slide.jpg)

For advanced logging requirements, consider adopting a framework that standardizes log data. This approach simplifies reading, aggregating, and analyzing logs, especially when consolidating data from multiple sources.

![The image is a slide discussing logging frameworks, highlighting their role in standardizing log data and making it easier to read and understand.](https://kodekloud.com/kk-media/image/upload/v1752868729/notes-assets/images/Advanced-Golang-Logging/logging-frameworks-standardizing-log-data.jpg)

Two popular logging frameworks used in [Golang](https://learn.kodekloud.com/user/courses/golang) are GLog and Logrus. This article focuses on Logrus, a well-maintained package used in projects like Docker.

## Using the Built-in Log Package

Below is a basic example that demonstrates how to use Go's built-in log package to produce a simple log statement:

```
package main


import "log"


func main() {
	log.Println("Hello world")
}
```

When you execute this program with:

```
go run main.go
```

You will receive an output similar to:

```
2022/11/27 21:54:11 Hello world
```

> [!important]
> **Note**
>
> For quick local testing and simple applications, the built-in log package is often sufficient. However, for more complex applications, a dedicated logging framework may be more appropriate.

## Logging to a File

To store log messages in a file, you can leverage the OS package to open or create a file and then set it as the logging output destination. The file pointer returned by os.OpenFile satisfies the io.Writer interface, making it a suitable target for log output.

Below is a complete example demonstrating how to log to a file:

```
package main


import (
	"fmt"
	"log"
	"os"
)


func main() {
	file, err := os.OpenFile("/Users/priyanka/app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0600)
	if err != nil {
		fmt.Println(err)
		return
	}
	log.SetOutput(file)
	log.Println("Hello world")
}
```

When executed, this program appends a log entry, complete with the current date, time, and message, to the specified file.

## Using Logrus

Logrus is a flexible logging framework that extends the functionality of the built-in log package by supporting multiple log levels and additional features. Installing Logrus is straightforward. Use the following command to download the package:

```
go get github.com/sirupsen/logrus
```

Once installed, here's an example that logs a message into a file using Logrus:

```
package main


import (
	"fmt"
	"os"


	"github.com/sirupsen/logrus"
)


func main() {
	file, err := os.OpenFile("/Users/priyanka/app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println(err)
		return
	}
	logrus.SetOutput(file)
	logrus.Info("Hello world")
}
```

Logrus supports multiple log levels, including:

- Trace
- Debug
- Info
- Warn
- Error
- Fatal
- Panic

The severity increases from Trace to Panic. For instance, using `logrus.Fatal("...")` prints a fatal message and terminates the program, while `logrus.Panic("...")` logs the message and then panics. To log warning messages, use `logrus.Warn("...")`.

Below is an example showing how to configure Logrus to capture debug and trace logs:

```
package main


import "github.com/sirupsen/logrus"


func main() {
	// Set the logging level to DebugLevel to ensure debug messages are captured.
	logrus.SetLevel(logrus.DebugLevel)
	logrus.Debug("This is a debug message")


	// To log a trace message, ensure that the level is set appropriately.
	logrus.Trace("This is a trace message")
}
```

> [!important]
> **Warning**
>
> Remember that while the built-in log package is ideal for quick prototyping and trivial applications, production environments benefit greatly from the enhanced flexibility and features provided by frameworks such as Logrus.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/c29202d1-1463-42eb-806b-0d6e38042661/lesson/b36ab33c-e8c2-4940-9f60-ef3de98042be)**
>
> Watch video content

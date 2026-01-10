# Execution Context and tmp - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Execution-Context-and-tmp)

---

## Table of Contents

- Execution Context and tmp
  - Benefits of Reusing the Execution Context
  - Utilizing the /tmp Directory
  - Watch Video
    - Initializing Inside the Handler
    - Initializing Outside the Handler

---

## Content

AWS Certified Developer - Associate

Serverless

# Execution Context and tmp

AWS Lambda leverages an isolated runtime environment known as the execution context. This environment manages all the resources required for your function to operate, and it remains active for a period even after the function completes. The benefit is clear: reusing the execution context across subsequent invocations can help avoid the overhead associated with reinitializing expensive resources.

![The image explains the concept of "Execution Context" in Lambda functions, highlighting the creation and reuse of the execution environment and its components like function code and temporary storage.](https://kodekloud.com/kk-media/image/upload/v1752859475/notes-assets/images/AWS-Certified-Developer-Associate-Execution-Context-and-tmp/execution-context-lambda-functions.jpg)

## Benefits of Reusing the Execution Context

When a Lambda function is invoked for the first time, AWS sets up a fresh execution context. This context includes resources such as function code, libraries, and temporary storage. Because the context stays alive for a period after the function completes, it can be utilized for future invocations. This reuse is particularly beneficial when initializing resource-intensive components like database connections, Software Development Kits (SDKs), or HTTP clients.

> [!important]
> **Note**
>
> By defining expensive resources outside the main handler function, you can significantly reduce the latency that comes with repeated initialization, leading to improved performance.

Consider the following two approaches for handling a MongoDB connection in a Lambda function.

### Initializing Inside the Handler

In this example, the MongoDB client is created within the handler. While functional, this approach establishes a new database connection on every invocation, which can cause performance bottlenecks.

```
export const handler = async (event) => {
  const uri = "mongodb+srv://user1:mongo123@cluster0.net/";
  const client = new MongoClient(uri);
  const databases = await client.db("admin").command({ listDatabases: 1 });
  const response = {
    statusCode: 200,
    body: JSON.stringify("Example"),
  };
  return response;
};
```

### Initializing Outside the Handler

A more efficient method involves initializing the MongoDB client outside the Lambda handler. This way, the client is created only once and reused across invocations, reducing connection overhead and enhancing performance.

```
const uri = "mongodb+srv://user1:mongo123@cluster0.net/";
const client = new MongoClient(uri);


export const handler = async (event) => {
  const databases = await client.db("admin").command({ listDatabases: 1 });
  const response = {
    statusCode: 200,
    body: JSON.stringify("example"),
  };
  return response;
};
```

## Utilizing the /tmp Directory

In addition to the execution context, AWS Lambda provides access to the /tmp directory. This temporary storage area is available for the entire lifetime of the execution context and can be used to perform tasks such as downloading or processing large files. You can configure the /tmp directory to store up to 10 gigabytes of data, making it an invaluable resource for operations that require temporary file storage between invocations.

> [!important]
> **Tip**
>
> When dealing with file-based operations, leverage the /tmp directory to minimize the need for external storage solutions and ensure high-speed access to temporary files during execution.

By understanding and effectively managing the Lambda execution context and the /tmp directory, you can create more efficient and performant serverless applications. For further reading on AWS Lambda best practices, consider exploring the official [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/3fc26a6e-5e5c-4607-b9c3-29b23ba3d0f4)**
>
> Watch video content

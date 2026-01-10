# Execution Context and tmp Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Execution-Context-and-tmp-Demo)

---

## Table of Contents

- Execution Context and tmp Demo
  - Example: Lambda Function with In-Handler Initialization
  - Repetitive Initialization Scenario
  - Optimized Approach: Utilizing the Execution Context
  - Sample JSON Response
  - Lambda Function Logs
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Execution Context and tmp Demo

In this lesson, we explain the Lambda execution context concept and how to optimize your functions for better performance. The Lambda execution context is a temporary runtime environment that initializes any external dependencies required by your Lambda code. One key benefit is that it can be reused across multiple invocations. This reuse offloads initialization tasks (such as configuring a database client) so that they do not repeat with every function execution.

## Example: Lambda Function with In-Handler Initialization

The following example demonstrates a simple Lambda function that connects to a MongoDB database, retrieves the list of databases, and returns the result. In this initial version, the database client is initialized within the function body:

```
export const handler = async (event) => {
    // TODO implement
    const uri = "mongodb+srv://user:mongo123@cluster0.eqag3xi.mongodb.net/?retryWrites=true&w=majority&appName=cluster0";
    const client = new MongoClient(uri);

    const databases = await client.db("admin").command({ listDatabases: 1 });

    console.log(databases);
    const response = {
        statusCode: 200,
        body: databases,
    };
    return response;
};
```

In this approach, each invocation of the Lambda function creates a new MongoDB client instance. If the initialization process is resource-intensive (like establishing a connection to a remote database), this repetitive initialization can become inefficient.

## Repetitive Initialization Scenario

Consider this scenario where similar code blocks repeatedly reinitialize the client with the same connection string and client creation process:

```
export const handler = async (event) => {
    // TODO implement
    const uri = "mongodb+srv://user1:mongo123@cluster0.eqag3xi.mongodb.net/?retryWrites=true&w=majority&appName=cluster0";
    const client = new MongoClient(uri);

    const databases = await client.db("admin").command({ listDatabases: 1 });

    console.log(databases);
    const response = {
        statusCode: 200,
        body: databases,
    };
    return response;
};
```

> [!important]
> **Warning**
>
> Avoid repetitive initialization of external resources in your Lambda functions. It increases latency and resource consumption.

## Optimized Approach: Utilizing the Execution Context

By moving the client initialization outside of the handler, you leverage the Lambda execution context. This means the client is instantiated only once per container. Subsequent invocations can reuse the already established connection, which improves performance.

Below is the optimized version:

```
const uri = "mongodb+srv://user:mongo123@cluster0.eqag3xi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);


export const handler = async (event) => {
    // TODO implement
    const databases = await client.db("admin").command({ listDatabases: 1 });

    console.log(databases);
    const response = {
        statusCode: 200,
        body: databases,
    };
    return response;
};
```

In this version, the database client is created in the outer scope (the execution context). The first invocation might experience a slightly longer initialization time (approximately 1.7 seconds), but subsequent calls will execute much faster (around 400 milliseconds).

## Sample JSON Response

Here is an example of the JSON response returned by the function upon execution:

```
{
  "statusCode": 200,
  "body": {
    "databases": [
      {
        "name": "sample_mflix",
        "sizeOnDisk": 1179197144,
        "empty": false
      },
      {
        "name": "admin",
        "sizeOnDisk": 335872,
        "empty": false
      },
      {
        "name": "local",
        "sizeOnDisk": 1417965668,
        "empty": false
      }
    ],
    "totalSize": 14297821184,
    "totalSizeMB": 13635,
    "clusterTime": {
      "clusterTime": "753465731241300087",
      "timestamp": "1689750697.530241"
    },
    "signature": {
      "hash": "eeplwHPuHfZ25frnG3hzMR84="
    }
  }
}
```

## Lambda Function Logs

When executed, your Lambda function might log similar entries as shown below:

```
START RequestId: 2abdec90-bc16-45eb-b549-50c6fd1cf76 Version: $LATEST
2024-04-06T10:58:24.259Z 2abdec90-bc16-45eb-b549-50c6fd1cf76 INFO {
    databases: [
        { name: 'sample_mflix', sizeOnDisk: 117919714, empty: false },
        { name: 'admin', sizeOnDisk: 335872, empty: false },
        { name: 'local', sizeOnDisk: 141795656568, empty: false }
    ],
    totalSize: 142197281184,
    totalSizeMb: 13635,
    ok: 1,
    "*clusterTime*": {
        clusterTime: new Timestamp({ t: 1712368204, i: 1113 })
    },
    signature: {
        // Signature details...
    }
}
```

> [!important]
> **Note**
>
> By moving the initialization of external resources outside the handler, your Lambda function will benefit from reduced execution times during subsequent invocations. This is particularly useful for high-traffic applications where performance gains are critical.

## Conclusion

Utilizing the Lambda execution context wisely by initializing expensive resources (such as database clients) outside the function handler can significantly enhance performance. The initial request might take longer, but the benefits of reusing the execution context result in faster subsequent invocations. This method is especially useful when handling intensive initialization tasks in serverless applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/b85b184d-536a-4368-b545-c16889499b67)**
>
> Watch video content

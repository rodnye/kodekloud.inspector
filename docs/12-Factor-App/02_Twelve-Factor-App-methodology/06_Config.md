# Config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Config)

---

## Table of Contents

- Config
  - Hard-Coded Configuration: The Problem
  - Using Environment Variables for Configuration
  - Watch Video
    - Example .env File

---

## Content

12 Factor App

Twelve Factor App methodology

# Config

In this article, we explore how to externalize your application's configuration to support different environments such as production, staging, and development. In our initial Python example, configuration values like the Redis host and port are hard-coded. This approach leads to issues, as each environment may require distinct settings, making it error-prone and inflexible.

> [!important]
> **Tip**
>
> By moving configuration values out of the application code, you can manage settings dynamically and securely across different environments.

## Hard-Coded Configuration: The Problem

Consider the following Python snippet, which uses fixed values for connecting to a Redis instance:

```
from flask import Flask
from redis import Redis

app = Flask(__name__)
redisDb = Redis(host='redis-db', port=6380)

@app.route('/')
def welcomeToKodeKLOUD():
    redisDb.incr('visitorCount')
    visitCount = str(redisDb.get('visitorCount'), 'utf-8')
    return "Welcome to KODEKLOUD! Visitor Count: " + visitCount

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

Hard-coding configuration values like the Redis host and port can introduce discrepancies when deploying your application to multiple environments. Each environment might use a different Redis instance, and updating these values in the code increases the risk of running into inconsistencies and deployment errors.

## Using Environment Variables for Configuration

To separate configuration from core application logic and secure sensitive details, store your environment-specific settings in a dedicated file, typically named `.env`. With the ".env" file, Python libraries can automatically load environment variables that can be accessed directly in your code.

This approach aligns with the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology, which emphasizes storing configuration in the environment. As a result, you can seamlessly transition between testing, staging, and production setups without making changes to the core code.

### Example .env File

Below is an example of how your `.env` file might look:

```
HOST=redis_db
PORT=6379
```

Depending on your deployment environment, the configuration might vary as follows:

- **Development Environment:**

  ```
  HOST=redis_db_dev
  PORT=6379
  ```

- **Staging Environment:**

  ```
  HOST=redis_db_staging
  PORT=6379
  ```

- **Production Environment:**

  ```
  HOST=redis_db_prod
  PORT=6379
  ```

> [!important]
> **Best Practice**
>
> Using environment variables to manage configuration ensures that you can safely open source your project without exposing sensitive details. This setup also facilitates smoother deployments across various environments.

By adopting this method, you reduce the risk of configuration-related errors and enhance the security and scalability of your application. For more insights into environment configuration best practices, visit our [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/65d5a6e7-dda4-456e-86a1-3b25e60ed5c7)**
>
> Watch video content

# Build Release and Run - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Build-Release-and-Run)

---

## Table of Contents

- Build Release and Run
  - Phases of the Deployment Cycle
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Build Release and Run

In this article, we explore the key phases in our deployment process: Build, Release, and Run. A recent typo in the browser message highlighted the importance of separating these stages. While minor typos can be fixed with a simple commit, using a strict separation between build and run phases minimizes downtime in more complex environments.

For example, here is the corrected version of our Flask application that fixes the typo:

```
import os
from flask import Flask
from redis import Redis


app = Flask(__name__)
redisDb = Redis(host=os.getenv('HOST'), port=os.getenv('PORT'))


@app.route('/')
def welcomeToKodeKloud():
    redisDb.incr('visitorCount')
    visitCount = str(redisDb.get('visitorCount'), 'utf-8')
    return "Welcome to KODEKLOUD! Visitor Count: " + visitCount


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

After pushing this commit, visiting the application displays:

```
Welcome to KODEKLOUD! Visitor Count: 9
```

> [!important]
> **Note**
>
> For minor fixes, a direct commit may suffice. However, in complex environments where rapid deployment is critical, separating the build, release, and run phases is essential to maintain uptime.

Adhering to the principles of the [12 Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology, our deployment process strictly separates these stages. The diagram below illustrates the separation between build, release, and run phases:

![The image describes the twelve-factor app's strict separation between build, release, and run stages, labeled as "V Build, release, run."](https://kodekloud.com/kk-media/image/upload/v1752856825/notes-assets/images/12-Factor-App-Build-Release-and-Run/frame_50.jpg)

## Phases of the Deployment Cycle

1.  **Build Phase**  
    In the build phase, developers write code using their favorite editors (such as VS Code or PyCharm). The source code is then transformed into an executable artifact—like a binary or a Docker image. Our process uses a Dockerfile along with the Docker build command to create the image for our application:

    ```
    $ docker build -t myapp:latest .
    ```

2.  **Release Phase**  
    Once the build is ready, the executable artifact is bundled with environment-specific configuration files to form the release object. Each release is uniquely identifiable (using versions like v1, v2, v3, or even timestamps), ensuring that even a minor change, such as a typo fix, generates a new release. Consider this sample configuration:

    | Configuration Variable | Value                | Description                  |
    | ---------------------- | -------------------- | ---------------------------- |
    | HOST                   | "redis\\\_db\\\_dev" | Hostname of the Redis server |
    | PORT                   | "6379"               | Port for connecting to Redis |

    ```
    HOST = "redis_db_dev"
    PORT = "6379"
    ```

3.  **Run Phase**  
    In the run phase, the same build artifact is deployed across various environments (development, testing, production) to ensure consistency. This uniformity makes it easier to roll back to previous releases or redeploy specific versions when necessary. The final running version of our application remains identical to the artifact built earlier:

    ```
    import os
    from flask import Flask
    from redis import Redis


    app = Flask(__name__)
    redisDb = Redis(host=os.getenv('HOST'), port=os.getenv('PORT'))


    @app.route('/')
    def welcomeToKodeKloud():
        redisDb.incr('visitorCount')
        visitCount = str(redisDb.get('visitorCount'), 'utf-8')
        return "Welcome to KODEKLOUD! Visitor Count: " + visitCount


    if __name__ == "__main__":
        app.run(host="0.0.0.0", debug=True)
    ```

    Deploy the application using the same Docker build process:

    ```
    $ docker build -t myapp:latest .
    ```

    With the corresponding configuration:

    ```
    HOST = "redis_db_dev"
    PORT = "6379"
    ```

> [!important]
> **Warning**
>
> Ensure that environment configurations are correctly managed during the release phase to avoid deployment issues. Misconfiguration at this stage can lead to unexpected application behavior.

By delineating the build, release, and run phases, we can store build artifacts in a dedicated repository, allowing seamless rollback or redeployment of specific versions. This methodology not only streamlines software management but also significantly enhances deployment consistency and reliability.

For further reading on this methodology, refer to the [12 Factor App documentation](https://learn.kodekloud.com/user/courses/12-factor-app).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/c96c5db9-ff23-406a-8073-8d39dd37c78c)**
>
> Watch video content

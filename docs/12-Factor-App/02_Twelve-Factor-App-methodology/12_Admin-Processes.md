# Admin Processes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/12-Factor-App/Twelve-Factor-App-methodology/Admin-Processes)

---

## Table of Contents

- Admin Processes
  - Watch Video

---

## Content

12 Factor App

Twelve Factor App methodology

# Admin Processes

In this lesson, we delve into the final principle of the [12-Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) methodology—admin processes. This principle emphasizes the importance of isolating one-off or periodic administrative tasks from the main application processes to ensure that these tasks run on an identical setup as the production environment.

Currently, our application leverages a Redis database to store the count of total visitors. However, there may be instances where the counter becomes inaccurate or requires a reset. In such cases, it is crucial to execute a one-time administrative task without disrupting the running application.

> [!important]
> **Key Principle**
>
> Administrative tasks—such as resetting visitor counts, executing database migrations, or correcting specific user records—must be performed as isolated, one-off processes. This approach enables automation, scalability, and reproducibility while maintaining a production-like environment.

For example, to reset the visitor count stored in Redis, you can execute an admin script. In our setup, this might involve launching an additional Docker container that connects to the same Redis database and runs the reset script:

```
import os
from redis import Redis


# Establish a connection to the Redis database using environment variables for host and port.
redis_db = Redis(host=os.getenv('HOST'), port=os.getenv('PORT'))
redis_db.set('visitorCount', 0)
```

The code above demonstrates how to connect to the Redis database and reset the `visitorCount` to 0. Running tasks like this as isolated, one-off processes ensures that they are automated, scalable, and reproducible, in alignment with the [12-Factor App](https://learn.kodekloud.com/user/courses/12-factor-app) principle of keeping admin tasks separate from long-running application processes.

> [!important]
> **Summary**
>
> The admin processes principle advocates for executing any administrative task—whether it is a one-time operation or a periodic task—in isolation. This guarantees that these operations remain automated, scalable, and reproducible, while mirroring the configuration of the primary application environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/12-factor-app/module/086a3d2d-be7f-4b05-92ae-1b2e4ab90f6a/lesson/1f1dcebc-971d-4af7-a084-f4fb2712bb06)**
>
> Watch video content
